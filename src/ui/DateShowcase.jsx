

const DateShowcase = ( { date } ) => {
  return ( <div className="flex gap-3 items-center">
    <div className="bg-linear-to-br from-slate-700 shadow-lg to-slate-800 text-amber-400 font-medium h-9 w-9 flex items-center justify-center rounded-lg" >
      T
    </div>
    <div>
      <p className="text-slate-600 text-sm font-medium">THU</p>
      <p className="text-white font-semibold whitespace-pre-wrap">Sep 5, 2026</p>
    </div>
  </div> );
}
 
export default DateShowcase