import { createContext, useContext, useReducer, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { validateCreateTask, validateEditTask } from '../Validators/taskvalidator';


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

  const createTask = async (task) => {
    const validation = validateCreateTask(task);
    console.log('Validation result:', validateCreateTask(task))

    if (!validation.success) return validation

    // Insert into Supabase
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task }])
      .select()
      .single();

      if (error) {
        console.error('Supabase insert error:', error)
        return { success: false, error: error.message }
      }

    dispatch({ type: ACTIONS.CREATE_TASK, payload: data })
    console.log('Task Created');
    
    return { success: true }
  }

  


  // Edit Task
  const editTask = async (id, updates) => {
    const validation = validateEditTask(updates);
    if (!validation.success) return validation;

    // Update Supabase data
    const { data, error } = await supabase
    .from('tasks')
    .update({ ...validation.updates })
    .eq('id', id)
    .select()
    .single()

    if (error) return { success: false, error: error.message }


    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, updates: data } })
    return { success: true }
  }

  // Delete Task
  const deleteTask = async (id) => {
    if (!id) return { success: false, error: 'Task ID is required' }

    // Delete from Supabase
    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

    if (error) return { success: false, error: error.message }

    // Update Local
    dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } })
    return { success: true }
  }

  return ( 
    <TaskContext.Provider
      value={ {tasks, createTask, editTask, deleteTask} }
      >
        { children }
    </TaskContext.Provider>
    );

}




export default TaskProvider;

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context
}


