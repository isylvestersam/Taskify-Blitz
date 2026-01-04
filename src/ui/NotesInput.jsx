import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";


const NotesInput = ({ isContainNote, isNoteProtected, noteContent, onOpen }) => {

  const { openNoteModal } = useContext(AppContext)


  return ( <button 
    onClick={() => onOpen() }
    className={`relative flex w-full items-center justify-center gap-1 p-1 border  rounded-md group hover:shadow-md cursor-pointer animate
      ${
        isContainNote ? (isNoteProtected ? 'border-amber-400/20 bg-amber-400/20 hover:bg-amber-900/20' : 'border-blue-400/90 bg-blue-500/20 hover:bg-blue-500/30')
        : 'border-slate-600/40 hover:bg-slate-800' 

      }
    `}>
    {
      isNoteProtected ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="size-4 stroke-2 stroke-amber-400/90 animate">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`size-4 stroke-2 animate
      ${
        isContainNote ? 'stroke-blue-400/90' : 'stroke-slate-500 hover:stroke-slate-400'
      }
      `}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>)
    }
    <p className={` text-xs  animate py-px ${
      isContainNote ? (isNoteProtected ? 'text-amber-400/90' : 'text-blue-300/90') : 'text-slate-500 group-hover:text-slate-400'
    }`}>
      Edit
    </p>

    {
      isContainNote && !isNoteProtected && (
        <div className={`h-2 w-2 rounded-full bg-blue-500 absolute -top-1 -right-1`} ></div>
      )
    }
    {
      isNoteProtected && (
        <div className={`h-2 w-2 rounded-full bg-amber-400 absolute -top-1 -right-1 flex items-center justify-center`}></div>
      )
    }

  </button>
  );
}
export default NotesInput;