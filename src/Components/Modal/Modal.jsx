import { createPortal } from "react-dom"

const Modal = ({ open, onClose, children, confirmBtn = "Save" }) => {
  if (!open) return null

  return createPortal(
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose() // click outside modal closes
      }}
    >
      {/* Modal content */}
      <div className="bg-slate-900 w-[70%] lg:w-[40%] rounded-xl shadow-xl p-5 flex flex-col">
        {/* Body */}
        <div className="flex-1 mb-4">{children}</div>

        {/* Footer */}
        <div className="flex w-full gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-red-500 px-3 py-2 rounded-md hover:bg-slate-300 w-full"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-amber-500 text-slate-900 px-3 py-2 rounded-md hover:bg-amber-500/70 w-full"
          >
            {confirmBtn}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
