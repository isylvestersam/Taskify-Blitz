

const SumTotalShowcase = ( { weekly } ) => {


  return ( <div className={`bg-amber-400/10 border border-amber-400/20 w-30 rounded-md flex-center p-1 ${ weekly ? 'bg-amber-400/20' : 'bg-amber-400/10' } `}>
    <p className="text-amber-400 text-lg font-medium">0</p>
  </div> );
}
 
export default SumTotalShowcase;