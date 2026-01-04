

const TitleandCategoryShowcase = ({ color, name, category }) => {
  return ( <div className="flex gap-4 overflow-auto text-left">
    <div className={`w-1 rounded-sm`} 
    style={{ backgroundColor: color }} ></div>
    <div>
      <h3 className="text-gray-100 font-medium mb-2">{ name }</h3>
      <button className="text-gray-400 bg-gray-500/20 text-xs font-semibold py-0.5 px-3 border border-gray-600/30 rounded-md " > {category} </button>
    </div>
  </div> );
}
 
export default TitleandCategoryShowcase;