import './layout.css';
import Rightbar from "../components/rightbar/Rightbar";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

function LayoutUser({ children, sidebar, profile, rightbar, pusher }) {
    return (
        <div className="layout">
            <div className="layoutTopbar">
                <Topbar pusher={pusher} />
            </div>
            <div className="layoutContainer" >
                {
                    !profile ?
                        <Sidebar page={sidebar} />
                        :
                        <></>
                }
                {children}
                {
                    rightbar ?
                        <Rightbar /> :
                        <></>
                }
            </div>
        </div>
    );
}

export default LayoutUser;