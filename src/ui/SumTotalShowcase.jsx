

const SumTotalShowcase = ( { weekly, value } ) => {


  return ( <div className={`bg-amber-400/10 border border-amber-400/20 w-full rounded-md flex-center p-1 ${ weekly ? 'bg-amber-400/40' : 'bg-amber-400/10' } `}>
    {
      weekly ? <p className="text-amber-300 text-sm font-semibold"> Weekly Total </p> : <p className="text-amber-300 text-xs font-semibold"> Day Total </p>
    }
    <p className="text-amber-400 text-lg font-medium">{value}</p>
  </div> );
}
 
export default SumTotalShowcase;