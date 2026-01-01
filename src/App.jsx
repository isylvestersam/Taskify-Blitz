import { useState, React } from 'react'
import './index.css'
import Dashboard from './Pages/Dashboard'
import { AppProvider } from './Contexts/AppContext'


function App() {

  return (
    
      <AppProvider>
        <Dashboard />
      </AppProvider>

  )
}

export default App
