import PointsInput from "../ui/PointsInput";
import TaskHeader from "./TaskHeader";
import { useDailyEntriesContext } from "../Contexts/DailyEntriesContext";
import { useTasks } from "../Contexts/TaskContext";
import { useAppContext } from "../Contexts/AppContext";

const DailyEntriesTable = () => {
  const { dailyEntries, updatePoints } = useDailyEntriesContext();
  const { openNoteModal } = useAppContext();
  const { tasks } = useTasks();
  console.log(tasks);
  

  // Group entries by day
  const entriesByDay = dailyEntries.reduce((acc, entry) => {
    if (!acc[entry.day_id]) acc[entry.day_id] = [];
    acc[entry.day_id].push(entry);
    return acc;
  }, {});

  // Calculate weekly total per task
  const weeklyTotals = tasks.map(task => {
    return dailyEntries
      .filter(e => e.task_id === task.id)
      .reduce((sum, e) => sum + (e.points || 0), 0);
  });

  // Calculate total per day
  const getDayTotal = entries =>
    tasks.reduce((sum, task) => {
      const entry = entries.find(e => e.task_id === task.id);
      return sum + (entry?.points || 0);
    }, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-slate-200">
        <thead className="bg-slate-900 text-left text-slate-200">
          <tr>
            <th className="border px-3 py-3">Day / Date</th>
            {tasks.map(task => (
              <th key={task.id} className="border min-w-65 max-w-70 px-4 py-5 text-center">
                <TaskHeader task={task} />
              </th>
            ))}
            <th className="border px-3 py-2 text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(entriesByDay).map(([dayId, entries], index) => (
            <tr
              key={dayId}
              className={index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}
            >
              {/* Day / Date */}
              <td className="border px-3 py-2">{new Date(entries[0].day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>

              {/* Task Points */}
              {tasks.map(task => {
                const entry = entries.find(e => e.task_id === task.id);
                return (
                  <td key={task.id} className="border px-2 py-1 text-center">
                    {entry ? (
                      <PointsInput
                        value={entry.points}
                        disabled={!entry.is_editable}
                        onChange={val =>
                          updatePoints(entry.day_id, entry.task_id, val)
                        }
                        className="w-16 text-center bg-slate-700 border border-slate-600 rounded-md"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                );
              })}

              {/* Total per day */}
              <td className="border px-3 py-2 text-center font-semibold">
                {getDayTotal(entries)}
              </td>
            </tr>
          ))}

          {/* Weekly Total Row */}
          <tr className="bg-slate-900 font-bold">
            <td className="border px-3 py-2">Weekly Total</td>
            {weeklyTotals.map((total, idx) => (
              <td key={idx} className="border px-3 py-2 text-center">
                {total}
              </td>
            ))}
            <td className="border px-3 py-2 text-center">
              {weeklyTotals.reduce((sum, val) => sum + val, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyEntriesTable;
