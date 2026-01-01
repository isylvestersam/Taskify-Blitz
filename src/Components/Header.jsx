import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const Header = () => {
  const { openTaskModal } = useContext(AppContext)

  return ( <div className="w-full flex flex-col justify-start gap-3 items-start md:flex-row md:justify-between md:items-center" >
    <div className="flex flex-col gap-1 lg:gap-2">
      <span className="flex items-center gap-3 ">
        <img src="/images/logo.svg" alt="Logo" className="w-9 lg:w-10" />
        <h3 className="text-yellow text-xl lg:text-2xl">Taskify Blitz</h3>
      </span>
      <h3 className="text-gray-400 text-sm">Track your tasks, earn points, and achieve your goals</h3>
    </div>
    <button 
      onClick={openTaskModal}
      className="bg-yellow py-1 px-3 rounded-lg text-sm">
      <span className="flex items-center gap-3 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <p>
          Add Task
        </p>
      </span>

    </button>
  </div> );
}
 
export default Header;