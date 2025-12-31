import Dropdown from "../ui/Dropdown/Dropdown";
import Tag from "../ui/Tag/Tag";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import { months } from "../ui/Dropdown/config";


const WeeklySelector = () => {
  const { monthIndex, week, year } = useContext(AppContext)

  return ( <div className="flex gap-3 items-center">
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