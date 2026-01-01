import { useState, React } from 'react'
import './index.css'
import Dashboard from './Pages/Dashboard'
import { AppProvider } from './Contexts/AppContext'
import TaskFormContextProvider from './Contexts/TaskFormContext'
import TaskProvider from './Contexts/TaskContext'


function App() {

  return (
    
      <AppProvider>
        <TaskFormContextProvider>
          <TaskProvider>
            <Dashboard />
          </TaskProvider>
        </TaskFormContextProvider>
      </AppProvider>

  )
}

export default App
