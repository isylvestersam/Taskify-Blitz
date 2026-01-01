import { useContext, useState } from "react";
import { dropdownMenus } from "./Dropdown/config";
import { AppContext } from "../Contexts/AppContext";



const DayChecker = () => {
  const { specificDays, setSpecificDays } = useContext(AppContext)
  

  const toggleDay = (day) => {
    setSpecificDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day) // remove if already selected
        : [...prev, day] // add if not selected
    );
  };

  return ( <div className="flex flex-wrap gap-2 ">
    {
      dropdownMenus.day.map((day) => (
        <button 
          key={day}
          type="button"
          onClick={ () => toggleDay(day) }
          className={`py-0.5 px-2 rounded-md text-sm ${
            specificDays.includes(day)  ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-200'
          }`}>
          { day }
        </button>
      ))
    }
  </div> );
}
 
export default DayChecker;