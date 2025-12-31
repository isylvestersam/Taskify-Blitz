import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import getSetter from "../util/getSetter";


const Dropdown = ( { menu, valueKey } ) => {
  const context = useContext(AppContext)
  const selected = context[valueKey];
  const setSelected = getSetter(context, valueKey)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleSelectMenu(option) {
    if (setSelected) setSelected(option);
    setIsOpen(false)
  }

  function handleToggleDropdown() {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ){
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return ( <div 
    ref={dropdownRef}
    className=" relative w-fit" >
    <button
      onClick={ (e) => {
        e.stopPropagation()
        handleToggleDropdown()
      }
      }
      className="flex text-gray-200 gap-6 bg-[#1D293D] py-1 px-3 rounded-md border border-gray-700"
      >
      <p> { selected } </p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    {
      isOpen && (
        <div className="absolute flex min-w-36 flex-col gap-1 items-start text-gray-200 bg-[#1D293D] py-1 px-1 text-sm rounded-md border border-gray-700 top-9 left-0">
          {
            menu.map((option) => (
              <button 
                key={option}
                onClick={() => handleSelectMenu(option)}
                className={`w-full flex items-center rounded-md pr-1 ${
                  selected === option ? 'bg-white text-gray-800'
                  : 'hover:bg-white hover:text-gray-800'
                }`}>
                <span className=" py-1 text-left w-full pl-2  ">
                  {option}
                </span>
                {
                  selected === option ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : null
                }
              </button>
            ))
          }
        </div>
      )
    }

  </div> );
}
 
export default Dropdown;