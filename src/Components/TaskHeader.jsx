import MaxPointsShowcase from "../ui/MaxPointsShowcase";
import OccurrenceShowcase from "../ui/OccurrenceShowcase";
import TitleandCategoryShowcase from "../ui/TitleAndCategoryShowcase";


const TaskHeader = ( { task } ) => {
  // color, name, category, occurrence, maxPoints
  console.log(task);
  

  return ( <div className="flex flex-col gap-3 w-full">
    <TitleandCategoryShowcase
      color={task.color}
      name={task.name}
      category={task.category}
    />
    <div className="flex flex-1 border-b border-b-slate-800 " ></div>
    <div className="flex items-center justify-between w-full gap-3">
      <OccurrenceShowcase />
      <MaxPointsShowcase 
        maxPoints={task.maxPoints}
        />
    </div>
  </div> );
}
 
export default TaskHeader;