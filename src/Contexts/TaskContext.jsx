import { createContext, useContext, useReducer, useState } from 'react';


const TaskContext = createContext(null);


  // Action Types
  const ACTIONS = {
    CREATE_TASK: 'CREATE_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE_TASK: 'DELETE_TASK'
  }

  // Reducer Function
  const taskReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.CREATE_TASK:
        return [
          ...state,
          {
            ...action.payload,
            id: crypto.randomUUID() 
          }
        ]
      case ACTIONS.EDIT_TASK: 
        return state.map((task) =>
          task.id === action.payload.id 
          ? { ...task, ...action.payload.updates }
          : task
        )
        case ACTIONS.DELETE_TASK:
          return state.filter((task) => task.id !== action.payload.id)
        default: 
          return state;
      }
  }

  // Provider
  const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, [])

  // Action Helpers
  const createTask = (task) => {
    if (!task.name || task.name.trim() === '') {
      return { success: false, error: 'Task must have a name' }
    }
    if (!task.category || task.category.trim() === '' ){
      return { success: false, error: 'Task must have a Category' }
    }
    if (!task.maxPoints || typeof task.maxPoints !== 'number' || task.maxPoints <= 0 ){
      return { success: false, error: 'Task must have a valid occurrence type' }
    }
    if (task.occurrence.type === 'specificDays') {
      if (!Array.isArray(task.occurrence.days) || task.occurrence.days.some(d => d < 0 || d > 6)) { 
        return { success: false, error: "specificDays must have an array of weekdays (0-6)" }
      }
    }
     // Defaults
    if (!task.color) task.color = "#5C6AC4";

    dispatch({ type: ACTIONS.CREATE_TASK, payload: task })

    return { success: true }
  }
  }

  const editTask = (id, updates) => {
      // Validation for provided fields
    if (updates.name !== undefined && updates.name.trim() === "") {
      return { success: false, error: "Task name cannot be empty" }
    }
    
    if (updates.category !== undefined && updates.category.trim() === "") {
      return { success: false, error: "Task category cannot be empty" }
    }
    if (updates.maxPoints !== undefined && (typeof updates.maxPoints !== "number" || updates.maxPoints <= 0)) {
      return { success: false, error: "maxPoints must be a number greater than 0" }
    }
    if (updates.occurrence !== undefined) {
      if (!["daily","weekly","specificDays"].includes(updates.occurrence.type)) {
        return { success: false, error: "Invalid occurrence type" }
      }
      if (updates.occurrence.type === "specificDays" && (!Array.isArray(updates.occurrence.days) || updates.occurrence.days.some(d => d < 0 || d > 6))) {
        updates.occurrence.days = [] // default empty array for safety
      }
    }

    // Set defaults if fields are missing
    if (updates.color === undefined) updates.color = "#5C6AC4";
    if (updates.occurrence?.type === "specificDays" && updates.occurrence.days === undefined) updates.occurrence.days = [];

    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, updates } })
    return { success: true }
    
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, updates } })}

  const deleteTask = (id) => dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } })


    return ( 
      <TaskContext.Provider
        value={ {tasks, createTask, editTask, deleteTask} }
        >
        { children }
      </TaskContext.Provider>
    );


export default TaskProvider;

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context
}


