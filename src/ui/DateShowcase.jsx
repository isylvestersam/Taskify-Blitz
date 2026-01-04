

const DateShowcase = ( { weekday, fullDate } ) => {
  return ( <div className="flex gap-3 items-center py-3">
    <div className="bg-linear-to-br from-slate-700 shadow-lg to-slate-800 text-amber-400 font-medium h-9 w-9 flex items-center justify-center rounded-lg" >
      {weekday.charAt(0)}
    </div>
    <div>
      <p className="text-slate-500 font-medium"> {weekday} </p>
      <p className="text-white text-sm font-semibold whitespace-pre-wrap">{fullDate}</p>
    </div>
  </div> );
}
 
export default DateShowcase