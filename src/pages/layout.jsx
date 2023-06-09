import './layout.css';
import Rightbar from "../components/rightbar/Rightbar";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Pusher from 'pusher-js';

function LayoutUser({ children, sidebar, profile, rightbar }) {
    const pusher = new Pusher('4eea52e19a1b86509eb3', {
        cluster: 'ap1',
        encrypted: true
    });
    return (
        <div className="layout">
            <div className="layoutTopbar">
                <Topbar pusher={pusher} />
            </div>
            <div className="layoutContainer" >
                {
                    !profile ?
                        <div style={{ flex: "1" }}>
                            <Sidebar page={sidebar} />
                        </div> :
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