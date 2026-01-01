import { colors } from "./config";


const ColorSelector = () => {
  return ( <div className="flex flex-wrap gap-2">
    {
      colors.map((color) =>(
        <button className={`bg-${color} w-8 h-8 rounded-full`}
        key={color}
        type="button"
        style={ {backgroundColor: color} }
        >
          
        </button>
      ))
    }
  </div> );
}
 
export default ColorSelector;