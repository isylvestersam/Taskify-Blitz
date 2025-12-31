import IconCube from "../IconCube/IconCube";
import { iconCubeData } from "../IconCube/config";
import Tag from "../Tag/Tag";
import { tagConfig } from "../Tag/config";

const SummaryCard = ( { timeframe, dotColor, cardStyle, label, labelColor, point, pointColor, secondaryLabel, secondaryValue, tag, iconCubeData } ) => {

  
  return ( <div className={`flex flex-col bg-linear-to-br gap-5 p-6 ${cardStyle} via-slate-900 to-slate-900 border shadow-lg shadow-blue-950/20 backdrop-blur-md  rounded-xl transition-all duration-300 ease-in-out `} >
    {/* Icons Cube and Timeframe Div */}
    <div className="flex  items-start justify-between">
      <IconCube
        {...iconCubeData}
      />
      <Tag
        {...tag}
      />
    </div>

    <div className={`text-white flex flex-col gap-3 `}>
      <h3 className={labelColor}> {label} </h3>
      <h1 className={`text-4xl bg-linear-to-r  bg-clip-text text-transparent tracking-tight ${pointColor}`}> {point} </h1>
      <div className="flex items-center gap-3 text-xs">
        <div className={`w-1 h-1 rounded-full ${dotColor}`} ></div>
        <p className="text-gray-400"> {secondaryLabel} : {secondaryValue} </p>

      </div>
    </div>
  </div> )
}
 
export default SummaryCard;