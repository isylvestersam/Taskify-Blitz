import { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { AppContext } from "../../Contexts/AppContext";
import PasswordSetter from "../../ui/PasswordSetter";
import { useDailyEntriesContext } from "../../Contexts/DailyEntriesContext";


const NoteModal = ({}) => {
  const { isNoteModalOpen, closeNoteModal, currentNoteEntry } = useContext(AppContext);
  const { updateNote } = useDailyEntriesContext()

  const [noteContent, setNoteContent] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (currentNoteEntry?.day) {
      setNoteContent(currentNoteEntry.day.note || "");
      setIsProtected(!!currentNoteEntry.day.is_protected);
    }
  }, [currentNoteEntry])

  function submitFunc() {
    if (currentNoteEntry?.day) {
      updateNote(
        currentNoteEntry.day_id,
        noteContent,
        isProtected);
    }
    closeNoteModal();
  }

  async function handleUnlock() {
    // Placeholder for password verification logic
    const correctPassword = "password123"; 
    if (passwordInput === correctPassword) {
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  const isNoteProtected = currentNoteEntry?.day?.is_protected;


  return (<Modal
    open={isNoteModalOpen}
    onClose={closeNoteModal}
    confirmBtn="Save Note"
    onConfirm={submitFunc}
  >
    {
      !currentNoteEntry?.day?.is_protected || isUnlocked ? (
        // Editable Note View
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
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          className="w-full mt-2 p-3 bg-slate-800 text-slate-200 rounded-md border border-slate-700 focus:border-amber-400/50 focus:outline-none resize-none h-40"
          placeholder="Write your note here..."
        ></textarea>
      </div>

      <PasswordSetter 
        isProtected={!!isProtected}
        onChange={setIsProtected}
      />
    </div> 
    // Protected Note View
      ) : <div className="px-5">
        <span className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-amber-400 stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        <h3 className="text-amber-400 text-xl font-medium">Protected Note</h3>
        </span>
        <div className="mt-4 mb-2">
          <label className="text-slate-300 flex flex-col gap-2 text-sm">
            Enter Password
            <input type="password" className="bg-slate-700 h-12 rounded-lg border border-slate-600 px-4 py-0.5 text-xl text-white" />
          </label>
        </div>

        <span className="flex items-center mb-2 gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-4 stroke-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-red-400 text-sm">Incorrect Password</p>
        </span>

        <span>
          <p className="text-slate-400 text-sm py-1">This note is password protected. Please enter your account password to view or edit the note.</p>
        </span>

        
      </div>
    }
  </Modal>);
}

export default NoteModal;