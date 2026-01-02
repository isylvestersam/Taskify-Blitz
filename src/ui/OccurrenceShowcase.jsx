

const OccurrenceShowcase = () => {
  const array = ['Mon', 'Tues', 'Wed']

  return ( <span className="flex items-center gap-1">
    <div className="w-1 h-1 rounded-full bg-blue-400 "></div>
    {
      array.map((a, index) => (
        <p className="text-blue-400 text-xs font-semibold"> { `${a} ${index === array.length - 1 ? '' : ','

        }` }  </p>
      ))
    }
  </span> );
}
 
export default OccurrenceShowcase;