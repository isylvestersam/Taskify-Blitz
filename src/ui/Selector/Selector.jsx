import { useContext, useState } from "react";
import Button from "../Button";
import { timeframeData } from "./config";
import { AppContext } from "../../Contexts/AppContext";


const Selector = () => {
  const {timeframe, setTimeframe, week, year, month} = useContext(AppContext)
  

  return ( <div>
    <div className="flex gap-5">
    {
      timeframeData.map((TD) => (
          <button
          key={TD}
            onClick={() => setTimeframe(TD)}
            className={
            `${timeframe === TD ? 'bg-yellow text-[#081023] animate '
            : 'bg-transparent text-gray-300 hover:text-amber-300 hover:bg-gray-300/20'}
            py-0.5 px-3 rounded-lg text-sm 
            `
          }>
            <p className="py-1">
              {TD}
            </p> 
          </button>
      ))
    }
    </div>
  </div> );
}
 
export default Selector;