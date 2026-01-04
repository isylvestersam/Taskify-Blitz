import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import getSetter from "../../util/getSetter";
import { dropdownMenus, months, getWeeksForMonth } from "./config";
import { useFloatingPosition } from "../../hooks/useFloatingPosition";

const Dropdown = ({ field, width, value, onChange }) => {
  const context = useContext(AppContext);
  const selected = value ?? context[field];
  const setSelected = onChange ?? getSetter(context, field);
  const isOpen = context.openDropdown === field;

  // Refs for the floating logic
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Get floating position
  const { style, openUp } = useFloatingPosition(isOpen, triggerRef, menuRef);

  const menu = field === "week"
    ? getWeeksForMonth(context.monthIndex, context.year)
    : dropdownMenus[field] || [];

  const handleSelectMenu = (option) => {
    setSelected?.(option);
    context.setOpenDropdown(null);
  };

  const handleToggleDropdown = () => {
    context.setOpenDropdown((prev) => (prev === field ? null : field));
  };

  // Close dropdown if click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        context.setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`${width === "full" ? "w-full" : "w-fit"} relative`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleDropdown();
        }}
        className={`flex text-gray-200 gap-6 bg-[#1D293D] py-1 px-3 rounded-md border border-gray-700 hover:bg-[#2d3a50] ${
          width === "full" ? "w-full justify-between" : ""
        }`}
      >
        <p>{field === "monthIndex" ? months[selected] : selected}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-gray-500 w-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          style={{
            ...style,
            position: "fixed", // Use fixed so it escapes modal boundaries
            maxHeight: "50vh", // Prevent overflow on small screens
            overflowY: "auto",
          }}
          className={`z-50 flex flex-col gap-1 items-start text-gray-200 bg-[#1D293D] py-1 px-1 text-sm rounded-md border border-gray-700`}
        >
          {menu.map((option) => (
            <button
              key={option}
              onClick={() => handleSelectMenu(option)}
              className={`w-full flex items-center rounded-md pr-1 ${
                selected === option
                  ? "bg-white text-gray-800"
                  : "hover:bg-white hover:text-gray-800"
              }`}
            >
              <span className="py-1 text-left w-full pl-2">
                {field === "monthIndex" ? months[option] : option}
              </span>
              {selected === option && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
