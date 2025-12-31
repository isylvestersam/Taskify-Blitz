import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Timeframe Selection
  const [timeframe, setTimeframe] = useState('Daily'); // Daily, Weekly, Monthly, Yearly
  const [week, setWeek] = useState('W1') //Only for Weekly
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [openDropdown, setOpenDropdown] = useState(null);

  // Task Creation
  const [occurrence, setOccurrence] = useState('Daily');
  const [day, setDay] = useState('Mon');
  const [specificDays, setSpecificDays]= useState([]);

  return (
  <AppContext.Provider
      value={{
        timeframe, setTimeframe,
        week, setWeek,
        monthIndex, setMonthIndex,
        year, setYear,
        occurrence, setOccurrence,
        day, setDay,
        specificDays, setSpecificDays,
        openDropdown, setOpenDropdown
        }}
      >
      { children }
    </AppContext.Provider>
)
}




