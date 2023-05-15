import './layout.css';
import AdminHeader from "../components/header/header";
import AdminSidebar from "../components/sidebar/sidebar";

function LayoutAdmin({ children }) {
    return (
        <div className="layoutAdmin">
            <div >
                <AdminHeader />
            </div>
            <div className='layoutAdminMain'>
                <AdminSidebar />
                <div className='layoutAdminMainContainer'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;