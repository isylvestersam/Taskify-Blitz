import { AppContext } from "../Contexts/AppContext";

const getSetter = (context, key) => {
  switch (key) {
    case 'monthIndex': return context.setMonthIndex;
    case 'year': return context.setYear;
    case 'week': return context.setWeek;
    case 'occurence': return context.setOccurence;
    case 'day': return context.setDay;
    case 'specificDays': return context.setSpecificDays
    default: return null
  }
}
export default getSetter
