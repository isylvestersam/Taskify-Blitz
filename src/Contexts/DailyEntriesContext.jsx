import { createContext, useState, useEffect, useContext } from "react";
import { getWeekRange } from "../util/getWeekRange";
import { useUserContext } from "./UserContext";
import { useTasksContext } from "./TaskContext";
import { supabase } from "../../supabaseClient";

const DailyEntriesContext = createContext();

export const DailyEntriesProvider = ({ children }) => {
  const { user } = useUserContext();
  const { tasks } = useTasksContext();
  const [dailyEntries, setDailyEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && tasks) generateWeeklyEntries();
  }, [user, tasks]);

  // Generate weekly entries
  const generateWeeklyEntries = async () => {
    if (!tasks || tasks.length === 0) return;

    setLoading(true);
    const { monday, sunday } = getWeekRange();
    const mondayStr = monday.toISOString().split("T")[0];
    const sundayStr = sunday.toISOString().split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];

    let allDays = [];

    try {
      // 1️⃣ Fetch existing days
      const { data: days, error } = await supabase
        .from("days")
        .select("*")
        .gte("date", mondayStr)
        .lte("date", sundayStr)
        .eq("user_id", user.id);

      if (error) throw error;

      // 2️⃣ Create missing days
      for (let d = new Date(monday); d <= sunday; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().split("T")[0];
        let dayObj = days?.find((day) => day.date === iso);
        if (!dayObj) {
          const { data: newDay, error: insertError } = await supabase
            .from("days")
            .insert({ user_id: user.id, date: iso })
            .select()
            .single();
          if (insertError) throw insertError;
          dayObj = newDay;
        }
        allDays.push(dayObj);
      }

      // 3️⃣ Generate daily_entries for each day x task
      const entriesToInsert = [];
      allDays.forEach((day) => {
        tasks.forEach((task) => {
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

      // 4️⃣ Insert entries (on conflict do nothing)
      const { error: insertError } = await supabase
        .from("daily_entries")
        .insert(entriesToInsert, { onConflict: ["day_id", "task_id"] });
      if (insertError) throw insertError;

      // 5️⃣ Fetch all entries for the week
      const { data: weekEntries, error: fetchError } = await supabase
        .from("daily_entries")
        .select("*")
        .in("day_id", allDays.map((d) => d.id))
        .eq("user_id", user.id);
      if (fetchError) throw fetchError;

      setDailyEntries(weekEntries);
    } catch (err) {
      console.error("Error generating weekly entries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update points (only today)
  const updatePoints = async (day_id, task_id, points) => {
    const entry = dailyEntries.find(
      (e) => e.day_id === day_id && e.task_id === task_id
    );
    if (!entry?.is_editable) return;

    // Optimistic UI update
    setDailyEntries((prev) =>
      prev.map((e) =>
        e.day_id === day_id && e.task_id === task_id ? { ...e, points } : e
      )
    );

    const { error } = await supabase
      .from("daily_entries")
      .update({ points })
      .eq("day_id", day_id)
      .eq("task_id", task_id);

    if (error) console.error("Failed to update points:", error);
  };

  // Update notes (can be past days)
  const updateNote = async (day_id, note, isProtected = false) => {
    setDailyEntries((prev) =>
      prev.map((e) =>
        e.day_id === day_id ? { ...e, note, is_protected: isProtected } : e
      )
    );

    const { error } = await supabase
      .from("daily_entries")
      .update({ note, is_protected: isProtected })
      .eq("day_id", day_id)
      .eq("user_id", user.id);

    if (error) console.error("Failed to update note:", error);
  };

  // Auto-zero points for past days
  const autoZeroMissedDays = () => {
    const todayStr = new Date().toISOString().split("T")[0];

    setDailyEntries((prev) =>
      prev.map((e) => {
        const dayDate = e.day?.date || null; // if day object is joined
        if (!e.is_editable && (e.points === null || e.points === undefined))
          return { ...e, points: 0 };
        if (dayDate && dayDate < todayStr) return { ...e, is_editable: false };
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
