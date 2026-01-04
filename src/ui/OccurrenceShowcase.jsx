import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { useTasks } from "../Contexts/TaskContext";


const OccurrenceShowcase = ({ task }) => {
  let days = task.occurrence.days
  if (!Array.isArray(days) || days.length === 0) 
    days = ['Daily'];

  return ( <span className="flex items-center gap-1 overflow-auto shrink-0">
    <div className="w-1 h-1 rounded-full bg-blue-400 "></div>
    {
      days.map((a, index) => (
        <p className="text-blue-400 text-xs font-semibold"> { `${a} ${index === days.length - 1 ? '' : ','}` }  </p>
      ))
    }
  </span> );
}
 
export default OccurrenceShowcase;