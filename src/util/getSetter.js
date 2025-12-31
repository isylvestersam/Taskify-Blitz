import { AppContext } from "../Context/AppContext";

const getSetter = (context, key) => {
  switch (key) {
    case 'month': return AppContext.setMonth;
    case 'year': return AppContext.setYear;
    case 'week': return AppContext.setWeek;
    default: return null
  }
}
export default getSetter

