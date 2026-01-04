import PointsInput from "../ui/PointsInput";
import TaskHeader from "./TaskHeader";
import { useDailyEntriesContext } from "../Contexts/DailyEntriesContext";
import { useTasks } from "../Contexts/TaskContext";
import { useAppContext } from "../Contexts/AppContext";
import TimelineTag from "../ui/TimelineTag";
import DateShowcase from "../ui/DateShowcase";
import SumTotalShowcase from "../ui/SumTotalShowcase";
import NotesInput from "../ui/NotesInput";

const DailyEntriesTable = () => {
  const { dailyEntries, updatePoints } = useDailyEntriesContext();
  const { openNoteModal } = useAppContext();
  const { tasks } = useTasks();
  

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
      <table className="w-full table-auto rounded-3xl border-collapse text-slate-200 rounded-tl-3xl">
        <thead className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-600/50 text-left text-slate-200 rounded-tl-3xl">
          <tr className="rounded-tl-3xl">
            <th className=" px-3 py-3 min-w-40 max-w-40 text-center  rounded-tl-3xl">
              <TimelineTag
                image='/images/calendar.png'
                title='TIMELINE'
                subtitle='Date & Day'
                />
            </th>
            {tasks.map(task => (
              <th key={task.id} className="border border-slate-600/40 min-w-55 overflow-auto custom-scrollbar max-w-none px-4 py-5 text-center">
                <TaskHeader task={task}  />
              </th>
            ))}
            <th className="border border-slate-600/40 px-3 py-2 text-center min-w-40 ">
              <TimelineTag 
                image='/images/award.svg'
                title='WEEKLY'
                subtitle='Total Points'
              />
            </th>
          </tr>
        </thead>

        <tbody className="rounded-3xl">
        {Object.entries(entriesByDay).map(([dayId, entries], index) => {
          const rawDate = new Date(entries[0].day.date);
          const weekday = rawDate.toLocaleDateString('en-US', { weekday: 'short' });
          const fullDate = rawDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const day = entries[0].day;
          if (!day) return null; // Safety check

          return (
            <tr key={dayId}>
              <td className="border px-3 py-2 border-slate-600/40">
                <DateShowcase weekday={weekday} fullDate={fullDate} />
              </td>

              {tasks.map(task => {
                const entry = entries.find(e => e.task_id === task.id);
                return (
                  <td key={task.id} className="border border-slate-400/10 px-2 py-1 text-center">
                    {entry ? (
                      <PointsInput
                        value={ entry.points ?? '' }
                        disabled={!entry.is_editable}
                        onChange={val => updatePoints(entry.day_id, entry.task_id, val)}
                        className={`w-16 text-center bg-slate-700 rounded-md ${entry.is_editable ? 'hover:bg-slate-600 focus:bg-slate-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                );
              })}

      <td className=" border flex flex-col gap-2 border-slate-600/40 px-3 py-2 text-center font-semibold">
        <SumTotalShowcase
          weekly={false}
          value={getDayTotal(entries)}
        />
        <NotesInput 
          isContainNote={!!day.note}
          isNoteProtected={day.is_protected}
          noteContent={day.note}
          onOpen={() => openNoteModal(entries[0])}
        />
      </td>
    </tr>
  );
})}


          {/* Weekly Total Row */}
          <tr className="bg-slate-900 font-bold">
            <td className=" px-5 py-2 h-25 text-transparent">Weekly Total</td>
            {weeklyTotals.map((total, idx) => (
              <td key={idx} className=" px-3 py-2 text-center text-transparent">
                {total}
              </td>
            ))}
            <td className="border border-slate-600/40 px-3 py-2 text-center">
              <SumTotalShowcase
                weekly={true}
                value={weeklyTotals.reduce((sum, val) => sum + val, 0)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyEntriesTable;
