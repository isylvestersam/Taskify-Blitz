import { createContext, useState, useEffect, useContext } from "react";
import { getWeekRange } from "../util/getWeekRange";
import { useUserContext } from "./UserContext.jsx";
import { useTasks } from "./TaskContext";
import { supabase } from "../../supabaseClient";

const DailyEntriesContext = createContext();

export const DailyEntriesProvider = ({ children }) => {
  const { user } = useUserContext();
  const { tasks } = useTasks();

  const [dailyEntries, setDailyEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 SINGLE entry point
  useEffect(() => {
    if (!user || !tasks || tasks.length === 0) return;
    generateWeeklyEntries();
  }, [user, tasks]);

  const generateWeeklyEntries = async () => {
    setLoading(true);

    try {
      const { monday, sunday } = getWeekRange();
      const mondayStr = monday.toISOString().split("T")[0];
      const todayStr = new Date().toISOString().split("T")[0];

      /* =========================
         1️⃣ Fetch existing days
      ========================= */
      const { data: existingDays, error: fetchDaysError } = await supabase
        .from("days")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", mondayStr)
        .lte("date", sunday.toISOString().split("T")[0]);

      if (fetchDaysError) throw fetchDaysError;

      const allDays = [];

      /* =========================
         2️⃣ UPSERT days safely
      ========================= */
      for (let d = new Date(monday); d <= sunday; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().split("T")[0];
        const month = d.getMonth() + 1;
        const year = d.getFullYear();

        let dayObj = existingDays.find(day => day.date === iso);

        if (!dayObj) {
          const { data, error } = await supabase
            .from("days")
            .upsert(
              {
                user_id: user.id,
                date: iso,
                week_start_date: mondayStr,
                month,
                year,
              },
              { onConflict: "user_id,date" }
            )
            .select()
            .single();

          if (error) throw error;
          dayObj = data;
        }

        allDays.push(dayObj);
      }

      const { data: existingEntries, error } = await supabase
        .from("daily_entries")
        .select("day_id, task_id")
        .eq("user_id", user.id);

      if (error) throw error;

      const existingSet = new Set(
        existingEntries.map(e => `${e.day_id}-${e.task_id}`)
      );


      /* =========================
         3️⃣ Create daily entries
      ========================= */
      const entriesToInsert = [];

      allDays.forEach(day => {
        tasks.forEach(task => {
          const key = `${day.id}-${task.id}`;

          if (existingSet.has(key)) return;

          entriesToInsert.push({
            day_id: day.id,
            task_id: task.id,
            user_id: user.id,
            points: 0,
            is_editable: day.date === todayStr,
            note: "",
            is_protected: false,
          });
        });
      });


      if (entriesToInsert.length > 0) {
        const { error } = await supabase
          .from("daily_entries")
          .insert(entriesToInsert, {
            onConflict: "day_id,task_id",
            ignoreDuplicates: true,
          });

        if (error) throw error;
      }

      /* =========================
         4️⃣ Fetch final weekly data
      ========================= */
      const { data: weekEntries, error: fetchEntriesError } = await supabase
        .from("daily_entries")
        .select(`*, day:days(*)`)
        .eq("user_id", user.id)
        .in("day_id", allDays.map(d => d.id));

      if (fetchEntriesError) throw fetchEntriesError;

      setDailyEntries(weekEntries);
    } catch (err) {
      console.error("Error generating weekly entries:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Update points (today only)
  ========================= */
  const updatePoints = async (day_id, task_id, points) => {
    const entry = dailyEntries.find(
      e => e.day_id === day_id && e.task_id === task_id
    );

    if (!entry?.is_editable) return;

    setDailyEntries(prev =>
      prev.map(e =>
        e.day_id === day_id && e.task_id === task_id
          ? { ...e, points }
          : e
      )
    );

    const { error } = await supabase
      .from("daily_entries")
      .update({ points })
      .eq("day_id", day_id)
      .eq("task_id", task_id);

    if (error) console.error("Failed to update points:", error);
  };

  /* =========================
     Update notes
  ========================= */
  const updateNote = async (day_id, note, isProtected = false) => {
    setDailyEntries(prev =>
      prev.map(e =>
        e.day_id === day_id
          ? { ...e, note, is_protected: isProtected }
          : e
      )
    );

    const { error } = await supabase
      .from("daily_entries")
      .update({ note, is_protected: isProtected })
      .eq("day_id", day_id)
      .eq("user_id", user.id);

    if (error) console.error("Failed to update note:", error);
  };

  /* =========================
     Auto-zero past days
  ========================= */
  const autoZeroMissedDays = () => {
    const todayStr = new Date().toISOString().split("T")[0];

    setDailyEntries(prev =>
      prev.map(e => {
        const dayDate = e.day?.date;
        if (dayDate && dayDate < todayStr) {
          return { ...e, is_editable: false, points: e.points ?? 0 };
        }
        return e;
      })
    );
  };

  return (
    <DailyEntriesContext.Provider
      value={{
        dailyEntries,
        loading,
        generateWeeklyEntries,
        updatePoints,
        updateNote,
        autoZeroMissedDays,
      }}
    >
      {children}
    </DailyEntriesContext.Provider>
  );
};

export const useDailyEntriesContext = () => {
  const context = useContext(DailyEntriesContext);
  if (!context) {
    throw new Error(
      "useDailyEntriesContext must be used within a DailyEntriesProvider"
    );
  }
  return context;
};
