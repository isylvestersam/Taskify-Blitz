
import { summaryCardData } from '../ui/SummaryCard/config'
import Header from '../Components/Header';
import IconCube from '../ui/IconCube/IconCube'
import SummaryCard from '../ui/SummaryCard/SummaryCard'
import { tagConfig } from '../ui/Tag/config';
import { iconCubeData } from '../ui/IconCube/config';
import Tag from '../ui/Tag/Tag';
import Dropdown from '../ui/Dropdown'


const Dashboard = () => {
  return ( <div className='container w-full flex flex-col mx-auto pt-5 px-4 md:px-8 lg:px-12'>
    <Header />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
        {
          summaryCardData.map((data, index) => (
            <SummaryCard key={data.id} {...data} tag={tagConfig[index]} iconCubeData={iconCubeData[index]} />
          ))
        }
      </div>
      <Dropdown
        menu={[
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]}
      />
  </div> );
}
 
export default Dashboard;