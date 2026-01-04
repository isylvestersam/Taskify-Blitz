

const MaxPointsShowcase = ({ maxPoints }) => {
  return ( <span className="bg-amber-700/20 w-fit px-2 py-1 border border-amber-400/30 rounded-md flex gap-1 items-center shrink-0">
    <img src='/images/yellow-target.svg' className="outline-amber-500 w-4" alt="" />
    <p className="text-amber-400 text-xs"> {
        `${maxPoints}${
          maxPoints > 1 ? 'pts' : 'pt'
        }`
      } </p>
  </span> );
}

export default MaxPointsShowcase;