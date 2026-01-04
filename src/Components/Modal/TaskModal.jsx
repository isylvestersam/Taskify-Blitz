import { useContext, useState } from "react";
import Modal from "./Modal";
import ColorSelector from "../../ui/ColorSelector/ColorSelector";
import Dropdown from "../../ui/Dropdown/Dropdown";
import { AppContext } from "../../Contexts/AppContext";
import DayChecker from "../../ui/DayChecker";
import { useTaskFormContext } from "../../Contexts/TaskFormContext";
import { useTasks } from "../../Contexts/TaskContext";


const TaskModal = () => {
    const { occurrence, closeTaskModal, isTaskModalOpen } = useContext(AppContext);
    const { createTask } = useTasks()
    const { name, setName, category, setCategory, maxPoints, setMaxPoints, color, setColor, occurrenceType, setOccurrenceType, occurrenceDays, setOccurrenceDays, error, setError, resetForm } = useTaskFormContext()

    const submitFunc = async () => {
      console.log("Submit triggered!", { name, category, maxPoints, color, occurrenceType, occurrenceDays })
      console.log(error);
      
      const taskData = {
        name,
        category,
        maxPoints: Number(maxPoints),
        color,
        occurrence: {
          type: occurrenceType,
          days: occurrenceDays
        }
      }

      const result = await createTask(taskData); //From TaskContext
      if (result.success) {
        resetForm();
        closeTaskModal()
      } else {
        setError(result.error)
      }
    }

  return ( <Modal
    open={isTaskModalOpen}
    onClose={closeTaskModal}
    confirmBtn="Create Task"
    onConfirm={submitFunc}
  >
    <div className="py-4 px-5">
      <h3 className="text-amber-400 mb-7 text-xl font-medium">Add New Task</h3>

      <div className="w-full flex flex-col gap-5 text-gray-200">
        <label >
          <p className="text-gray-200 mb-1 text-sm">Task Name</p>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" 
            className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" placeholder="e.g Morning Workout" />
        </label>
        <label >
          <p className="text-gray-200 mb-1 text-sm">Category</p>
          <input 
            value={category}
            onChange={(e) => setCategory(e.target.value) }
            type="text" 
            className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" 
            placeholder="General" />
        </label>
        <label >
          <p className="text-gray-200 mb-1 text-sm">Max Points</p>
          <input
            value={maxPoints}
            onChange={(e) => setMaxPoints(e.target.value)}
            type="text" 
            className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" />
        </label>
        
        <div>
          <h3 className="mb-1 text-sm">Color</h3>
          <ColorSelector
            setColor={setColor}
            color={color}
          />
        </div>

        <div>
          <p className="mb-1 text-sm">Occurrence Type</p>
          <Dropdown 
            field={'occurrence'} 
            width='full'
            value={occurrenceType}
            onChange={setOccurrenceType}
            />
        </div>

        {
          occurrenceType === 'Weekly'  && (
            <div>
              <Dropdown 
                field={'day'} 
                width='full'
                value={occurrenceDays[0]}
                onChange={(val) => setOccurrenceDays([val])}
                />
            </div>
          )
        }
        {
          occurrenceType === 'Specific Days' && (
            <div>
              <p className="mb-1 text-sm">Occurrence Days</p>
              <DayChecker
                value={occurrenceDays}
                onChange={setOccurrenceDays}
              />
            </div>
          )
        }
      </div>
      {
        error && (
          <p className="mt-3 -mb-5 text-red-500 italic text-sm">{error}!</p>
        )
      }
    </div>
  </Modal> );
}
 
export default TaskModal;