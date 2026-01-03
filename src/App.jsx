import { useState, React } from 'react'
import './index.css'
import Dashboard from './Pages/Dashboard'
import { AppProvider } from './Contexts/AppContext'
import TaskFormContextProvider from './Contexts/TaskFormContext'
import TaskProvider from './Contexts/TaskContext'
import { DailyEntriesProvider } from './Contexts/DailyEntriesContext.jsx'
import { UserProvider } from './Contexts/UserContext.jsx'


function App() {

  return (
    
      <AppProvider>
  <UserProvider>
    <TaskFormContextProvider>
      <TaskProvider>
        <DailyEntriesProvider>
          <Dashboard />
        </DailyEntriesProvider>
      </TaskProvider>
    </TaskFormContextProvider>
  </UserProvider>
</AppProvider>


  )
}

export default App
