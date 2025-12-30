import IconCube from "../IconCube/IconCube";
import { iconCubeData } from "../IconCube/config";
import Tag from "../Tag/Tag";
import { tagConfig } from "../Tag/config";

const SummaryCard = ( { timerame, dotColor } ) => {


  return ( <div className="flex flex-col gap-5 p-6" >
    {/* Icons Cube and Timeframe Div */}
    <div className="flex  items-start justify-between">
      <IconCube
        image='images/calendar.svg'
        gradientColor='from-cyan-500 to-cyan-600'
        shadowColor='shadow-cyan-500/30'
      />
      <Tag
        label='Week'
        textColor={'text-blue-500'}
      />
    </div>

    <div className="text-white flex flex-col gap-3">
      <h3> Today's Points </h3>
      <h1 className="text-4xl">0</h1>
      <div className="flex items-center gap-3 text-xs">
        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
        <p>Avg: 0pts/day </p>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <p>Avg: 0pts/day </p>
      </div>
    </div>
  </div> );
}
 
export default SummaryCard;