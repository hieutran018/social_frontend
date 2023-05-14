import Dashboard from '../../components/dashboard/dashboard';
import AdminHeader from '../../components/header/header';
import AdminSidebar from '../../components/sidebar/sidebar';
import './dashboard.css';
function DashBoard() {
    return (
        <div className='dashboard'>
            <div >
                <AdminHeader />
            </div>
            <div className='dashboardMain'>
                <AdminSidebar />
                <div className='dashboardMainContainer'>
                    <Dashboard />
                </div>
            </div>

        </div>
    );
}

export default DashBoard;