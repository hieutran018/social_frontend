import './dashboard.css';
import { AiFillHome, AiOutlineUserAdd } from 'react-icons/ai';
import { HiStatusOnline } from 'react-icons/hi';
import { RiUser3Fill } from 'react-icons/ri';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { MdOutlinePostAdd } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';
import Charts from '../charts/chart';

function Dashboard() {

    return (
        <div className='adminDashboard'>
            <div className='adminDashboardWrapper'>
                <div className='adminDashboardBreadCrumb'>
                    <div className='adminDashboardIconContainer'><AiFillHome size={30} className='adminDashboardIcon' /></div>
                    <div className='adminDashboardBreadCrumbTitle'>Dash board</div>
                </div>
                <div className='adminDashboardStatistics'>
                    <div className='adminDashboardStatisticsCard gradientInfo'>
                        <div className='adminDashboardStatisticsCardTop'>
                            <div className='adminDashboardStatisticsName'>
                                Đang Trực Tuyến
                            </div>
                            <HiStatusOnline size={30} color='white' />
                        </div>
                        <div className='adminDashboardStatisticsCardBottom'>
                            <RiUser3Fill size={50} color='white' />
                            <div className='adminDashboardStatisticsTotal'>
                                100
                            </div>
                        </div>
                    </div>
                    <div className='adminDashboardStatisticsCard gradientDanger'>
                        <div className='adminDashboardStatisticsCardTop'>
                            <div className='adminDashboardStatisticsName'>
                                Bản Tin Tháng Này
                            </div>
                            <BsFillFileEarmarkPostFill size={30} color='white' />
                        </div>
                        <div className='adminDashboardStatisticsCardBottom '>
                            <MdOutlinePostAdd size={50} color='white' />
                            <div className='adminDashboardStatisticsTotal'>
                                100
                            </div>
                        </div>
                    </div>
                    <div className='adminDashboardStatisticsCard gradientSuccess'>
                        <div className='adminDashboardStatisticsCardTop'>
                            <div className='adminDashboardStatisticsName'>
                                Người dùng mới
                            </div>
                            <AiOutlineUserAdd size={30} color='white' />
                        </div>
                        <div className='adminDashboardStatisticsCardBottom'>
                            <FaUserCheck size={50} color='white' />
                            <div className='adminDashboardStatisticsTotal'>
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div className='adminDashboardCharts'>
                    <Charts />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;