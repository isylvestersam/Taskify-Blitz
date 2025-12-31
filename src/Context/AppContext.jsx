import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Timeframe Selection
  const [timeframe, setTimeframe] = useState('Daily'); // Daily, Weekly, Monthly, Yearly
  const [week, setWeek] = useState('W1') //Only for Weekly
  const [month, setMonth] = useState('Jan');
  const [year, setYear] = useState(new Date().getFullYear())

  // Task Creation
  const [occurrence, setOccurrence] = useState('Daily');
  const [day, setDay] = useState('Mon');
  const [specificDays, setSpecificDays]= useState([]);

  return (
  <AppContext.Provider
      value={{
        timeframe, setTimeframe,
        week, setWeek,
        month, setMonth,
        year, setYear,
        occurrence, setOccurrence,
        day, setDay,
        specificDays, setSpecificDays
        }}
      >
      { children }
    </AppContext.Provider>
)
}




