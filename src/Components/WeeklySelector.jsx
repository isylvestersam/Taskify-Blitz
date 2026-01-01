import Dropdown from "../ui/Dropdown/Dropdown";
import Tag from "../ui/Tag/Tag";
import { AppContext } from "../Contexts/AppContext";
import { useContext } from "react";
import { months } from "../ui/Dropdown/config";


const WeeklySelector = () => {
  const { monthIndex, week, year } = useContext(AppContext)

  return ( <div className="flex flex-wrap jusitfy-between items-center gap-2   -center custom-scrollbar">
    <Dropdown field={'monthIndex'} />
    <Dropdown field={'week'} />
    <Dropdown field={'year'} />
    <Tag 
      label={`${months[monthIndex]} ${week}, ${year}`}
      textColor={'text-amber-300'} 
      bgColor={'bg-amber-500/10'}
      borderColor={'border-amber-500/20'}
      hoverColor={'hover:bg-amber-500/20'}
    />

  </div> );
}
 
export default WeeklySelector;