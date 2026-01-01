import { AppContext } from "../Contexts/AppContext";

const getSetter = (context, key) => {
  switch (key) {
    case 'monthIndex': return context.setMonthIndex;
    case 'year': return context.setYear;
    case 'week': return context.setWeek;
    case 'occurrence': return context.setoccurrence;
    case 'day': return context.setDay;
    case 'Specific Days': return context.setSpecificDays
    default: return null
  }
}
export default getSetter
