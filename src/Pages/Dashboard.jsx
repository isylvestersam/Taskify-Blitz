
import { summaryCardData } from '../ui/SummaryCard/config'
import Header from '../Components/Header';
import IconCube from '../ui/IconCube/IconCube'
import SummaryCard from '../ui/SummaryCard/SummaryCard'
import { tagConfig } from '../ui/Tag/config';
import { iconCubeData } from '../ui/IconCube/config';
import Tag from '../ui/Tag/Tag';
import Dropdown from '../ui/Dropdown/Dropdown'
import Selector from '../ui/Selector/Selector'
import WeeklySelector from '../Components/WeeklySelector';
import MonthlySelector from '../Components/MonthlySelector';
import YearlySelector from '../Components/YearlySelector';
import Showcase from '../Components/Showcase';
import AddNewTask from '../Components/Modal/TaskModal';
import TitleandCategoryShowcase from '../ui/TitleAndCategoryShowcase';
import OccurrenceShowcase from '../ui/OccurrenceShowcase';
import MaxPointsShowcase from '../ui/MaxPointsShowcase';
import DateShowcase from '../ui/DateShowcase';
import PointsInput from '../ui/PointsInput';


const Dashboard = () => {
  return ( <div className='container w-full flex flex-col mx-auto pt-5 px-4 md:px-8 lg:px-12 pb-92'>
    <Header />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
      {
        summaryCardData.map((data, index) => (
          <SummaryCard key={data.id} {...data} tag={tagConfig[index]} iconCubeData={iconCubeData[index]} />
          ))
          }
          </div>
          <div className='flex flex-col  gap-6 md:items-center md:flex-col-reverse lg:flex-row lg:justify-between my-4 p-3 card'>
            <Showcase />
            <Selector />

          </div>
            <AddNewTask />
            <div className='my-12'>
              <PointsInput />
            </div>
      
  </div> );
}
 
export default Dashboard;