import { useState } from "react";

const PasswordSetter = () => {
  const [isProtected, setIsProtected] = useState(false);

  return ( <div className="flex flex-col gap-1 mt-5 bg-slate-800 py-3 px-4 rounded-md border border-slate-700">
    <label className="flex items-center gap-2 hover:cursor-pointer ">
      <input 
        type="checkbox"
        checked={isProtected}
        onChange={(e) => setIsProtected(e.target.checked)}
        className="w-4 h-4 accent-amber-500 hover:cursor-pointer"
      />
      <span className="flex items-center gap-1 text-sm text-slate-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <p className={
          isProtected ? 'text-amber-400 font-semibold' : 'text-slate-400'
        }>
          {
            isProtected ? 'Password Protection Enabled' : 'Enable Password Protection'
          }
        </p>
      </span>
    </label>

    {
      isProtected && ( 
        <div className="flex gap-1 text-slate-400 text-xs translate-x-7 mt-1 items-center flex-wrap">
          {/* <img src='/images/padlock.png' alt="Padlock" className="w-3 shrink-0" /> */}
          <p className="text-pretty ">This note will require your account password to access</p>
        </div>
      )
    }

  </div> );
}
 
export default PasswordSetter;