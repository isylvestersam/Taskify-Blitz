import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import getSetter from "../../util/getSetter";
import { dropdownMenus, months, getWeeksForMonth } from "./config";


const Dropdown = ( { field, width, value, onChange } ) => {
  const context = useContext(AppContext)
  const selected = value ?? context[field];
  const setSelected = onChange?? getSetter(context, field)
  const isOpen = context.openDropdown === field
  const dropdownRef = useRef(null);
  const menu = field === 'week'
    ? getWeeksForMonth(context.monthIndex, context.year)
    : dropdownMenus[field] || [];



  function handleSelectMenu(option) {
    if (setSelected) setSelected(option);
    context.setOpenDropdown(null);
  }

  function handleToggleDropdown() {
    context.setOpenDropdown(prev => prev === field ? null : field)
  }

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ){
        context.setOpenDropdown(null);
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return ( <div 
    ref={dropdownRef}
    className={`${
      width === 'full' 
      ? 'w-full'
      : 'w-fit'

    } relative`} >
    <button
    type="button"
      onClick={ (e) => {
        e.stopPropagation()
        handleToggleDropdown()
      }
      }
      className={`flex text-gray-200 gap-6 bg-[#1D293D] py-1 px-3 rounded-md border border-gray-700 hover:bg-[#2d3a50] animate 
        ${width === 'full' ? 'w-full justify-between'
          : ''
        }
        `}
      >
      <p>
        {field === 'monthIndex' ? months[selected] : selected}
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    {
      isOpen && (
        <div className={`absolute z-50 flex min-w-36 flex-col gap-1 items-start text-gray-200 bg-[#1D293D] py-1 px-1 text-sm rounded-md border border-gray-700 top-10 left-0 
          ${width === 'full' ? 'w-full justify-between'
          : ''
        }
        `}>
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
                  {field === 'monthIndex' ? months[option] : option}
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