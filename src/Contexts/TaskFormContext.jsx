import { Children, createContext, useContext } from "react";
import { useState } from "react";


const TaskFormContext = createContext(null);

const TaskFormContextProvider = ( { children } ) => {
  // Form State 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [maxPoints, setMaxPoints] = useState(10);
  const [color, setColor] = useState('#5C6AC4');
  const [occurrenceType, setOccurrenceType] = useState('Daily');
  const [occurrenceDays, setOccurrenceDays] = useState([]);
  const [error, setError] = useState('');

  // Reset Form Helper Func
  const resetForm = () => {
    setName('');
    setCategory('');
    setMaxPoints(10);
    setColor('#5C6AC4');
    setOccurrenceType('Daily');
    setOccurrenceDays([]);
    setError('');
  };

  return ( 
    <TaskFormContext.Provider
      value={{
        name, setName,
        category, setCategory,
        maxPoints,
        setMaxPoints: (value) => setMaxPoints(value ?? 10),
        color, setColor,
        occurrenceType, setOccurrenceType,
        occurrenceDays, setOccurrenceDays,
        error, setError,
        resetForm
      }}
      >
      {children}
    </TaskFormContext.Provider>
   );
}

  export const useTaskFormContext = () => {
    const context = useContext(TaskFormContext);
    if (!context) throw new Error('useTaskFormContext must be used within TFCProvider')
    return context
  }
 
export default TaskFormContextProvider;