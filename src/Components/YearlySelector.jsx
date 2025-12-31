
import Dropdown from "../ui/Dropdown/Dropdown";
import Tag from "../ui/Tag/Tag";
import { months } from "../ui/Dropdown/config";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";


const YearlySelector = () => {
  const { year} = useContext(AppContext) 
  return ( <div className="flex items-center gap-3">
    <Tag 
      label={`${year}`}
      textColor={'text-amber-300'} 
      bgColor={'bg-amber-500/10'}
      borderColor={'border-amber-500/20'}
      hoverColor={'hover:bg-amber-500/20'}
    />
  </div> );
}
 
export default YearlySelector;