import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Timeframe Selection
  const [timeframe, setTimeframe] = useState('Daily'); // Daily, Weekly, Monthly, Yearly
  const [week, setWeek] = useState('W1') //Only for Weekly
  const [year, setYear] = useState(new Date().getFullYear())
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [openDropdown, setOpenDropdown] = useState(null);

  // Task Creation
  const [occurrence, setoccurrence] = useState('Daily');
  const [day, setDay] = useState('Mon');
  const [specificDays, setSpecificDays]= useState([]);

  // Modals
const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
const [currentNoteEntry, setCurrentNoteEntry] = useState(null)

const openTaskModal = () => setIsTaskModalOpen(true)
const closeTaskModal = () => setIsTaskModalOpen(false)

const openNoteModal = (entry) => {
  setCurrentNoteEntry(entry)
  setIsNoteModalOpen(true)
}
const closeNoteModal = () => {
  setIsNoteModalOpen(false)
  setCurrentNoteEntry(null)
}


  return (
  <AppContext.Provider
      value={{
        timeframe, setTimeframe,
        week, setWeek,
        monthIndex, setMonthIndex,
        year, setYear,
        occurrence, setoccurrence,
        day, setDay,
        specificDays, setSpecificDays,
        openDropdown, setOpenDropdown,
        isNoteModalOpen, openNoteModal, closeNoteModal, setCurrentNoteEntry, currentNoteEntry,
        isTaskModalOpen, openTaskModal, closeTaskModal
        }}
      >
      { children }
    </AppContext.Provider>
)
}

// Custom hook for using the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}




