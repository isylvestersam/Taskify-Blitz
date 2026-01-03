import { useContext } from "react";
import Modal from "./Modal";
import { AppContext } from "../../Contexts/AppContext";
import PasswordSetter from "../../ui/PasswordSetter";


const NoteModal = () => {
  const { isNoteModalOpen, closeNoteModal } = useContext(AppContext)

  function submitFunc() {
    // Handle note saving logic here
    closeNoteModal();
  }

  return ( <Modal
    open={isNoteModalOpen}
    onClose={closeNoteModal}
    confirmBtn="Save Note"
    onConfirm={submitFunc}
    >
    <div className="py-0 px-5">

      {/* Header */}
      <span className="flex gap-2 items-center mb-7">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-amber-400 stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <h3 className="text-amber-400 text-xl font-medium">Add Note</h3>
      </span>

      {/* Body */}
    <div>
      <p className="text-slate-400">Note</p>
      <textarea
        className="w-full mt-2 p-3 bg-slate-800 text-slate-200 rounded-md border border-slate-700 focus:border-amber-400/50 focus:outline-none resize-none h-40"
        placeholder="Write your note here..."
      ></textarea>
    </div>

    <PasswordSetter />

    </div>
  </Modal> );
}
 
export default NoteModal;