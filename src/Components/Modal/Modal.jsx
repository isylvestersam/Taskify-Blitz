import { use, useEffect } from "react"
import { createPortal } from "react-dom"

const Modal = ({ open, onClose, children, confirmBtn = "Save", onConfirm }) => {

  
  
  // Disable Scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])  
  
  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm?.(e)
  }

  return createPortal(
    // Backdrop
    <div
      className="fixed inset-0  bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose() // click outside modal closes
      }}
    >
      {/* Modal content */}
      <form 
        onSubmit={handleSubmit}
        className="relative bg-slate-900 w-[80%] max-h-[90vh] lg:w-[40%] rounded-xl shadow-xl px-3 py-7 flex flex-col ">
        {/* Body */}
        <div className="flex-1 overflow-auto mb-4 scrollbar-auto">{children}</div>

        {/* Footer */}
        <div className="flex right-0 px-7  w-full gap-3 mt-1">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-slate-400 hover:text-red-500 px-3 py-2 rounded-md hover:bg-slate-300 w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-500 text-slate-900 px-3 rounded-md hover:bg-amber-500/70 w-full"
          >
            {confirmBtn}
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}

export default Modal
