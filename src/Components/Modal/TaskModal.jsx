import { useContext, useState } from "react";
import Modal from "./Modal";
import ColorSelector from "../../ui/ColorSelector/ColorSelector";
import Dropdown from "../../ui/Dropdown/Dropdown";
import { AppContext } from "../../Contexts/AppContext";
import DayChecker from "../../ui/DayChecker";


const TaskModal = () => {
    const { occurence, closeTaskModal, isTaskModalOpen } = useContext(AppContext)

  return ( <Modal
    open={isTaskModalOpen}
    onClose={closeTaskModal}
    confirmBtn="Create Task"
  >
    <div className="py-4 px-7">
      <h3 className="text-amber-400 mb-7 text-xl font-medium">Add New Task</h3>

      <form action="" className="w-full flex flex-col gap-5 text-gray-200">
        <label >
          <p className="text-gray-200 mb-1 text-sm">Task Name</p>
          <input type="text" className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" placeholder="e.g Morning Workout" />
        </label>
        <label >
          <p className="text-gray-200 mb-1 text-sm">Category</p>
          <input type="text" className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" placeholder="e.g Fitness" />
        </label>
        <label >
          <p className="text-gray-200 mb-1 text-sm">Task Name</p>
          <input type="text" className="border placeholder:text-gray-400/40 placeholder:text-sm py-1 px-3 w-full border-slate-500 rounded-md" defaultValue={10} />
        </label>
        
        <div>
          <h3 className="mb-1 text-sm">Color</h3>
          <ColorSelector />
        </div>

        <div>
          <p className="mb-1 text-sm">Occurrence Type</p>
          <Dropdown field={'occurence'} width='full' />
        </div>

        {
          occurence === 'Weekly' && (
            <div>
              <Dropdown field={'day'} width='full' />
            </div>
          )
        }
        {
          occurence === 'Specific Days' && (
            <div>
              <p className="mb-1 text-sm">Occurrence Days</p>
              <DayChecker />
            </div>
          )
        }
      </form>
    </div>
  </Modal> );
}
 
export default TaskModal;