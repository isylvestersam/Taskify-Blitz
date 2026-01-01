import { colors } from "./config";


const ColorSelector = ( { color, setColor } ) => {
  return ( <div className="flex flex-wrap gap-2">
    {
      colors.map((c) =>(
        <button className={`w-8 h-8 rounded-full ${
          c === color ? 'outline-3 outline-white' : ''
        } `}
        onClick={() => setColor(c)}
        key={c}
        type="button"
        style={ {backgroundColor: c} }
        >
          
        </button>
      ))
    }
  </div> );
}
 
export default ColorSelector;