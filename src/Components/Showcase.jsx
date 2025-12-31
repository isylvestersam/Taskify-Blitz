import { useContext } from "react";
import Tag from "../ui/Tag/Tag";
import { AppContext } from "../Context/AppContext";
import WeeklySelector from "./WeeklySelector";
import MonthlySelector from "./MonthlySelector";
import YearlySelector from "./YearlySelector";


const Showcase = () => {
  const { timeframe } = useContext(AppContext)


  return ( <div>
    {
      timeframe === 'Daily' && (
        <Tag 
          label={'Today'}
          textColor={'text-yellow'} 
          bgColor={'bg-amber-500/10'}
          borderColor={'border-amber-500/20'}
          hoverColor={'hover:bg-amber-500/20'}
        />
      )
    }{
      timeframe === 'Weekly' && (
        <WeeklySelector /> 
      )
    }{
      timeframe === 'Monthly' && (
        <MonthlySelector /> 
      )
    }{
      timeframe === 'Yearly' && (
        <YearlySelector /> 
      )
    }
  </div> );
}
 
export default Showcase;