import './layout.css';
import Rightbar from "../components/rightbar/Rightbar";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

function LayoutUser({ children, sidebar, profile, rightbar }) {
    return (
        <div className="layout">
            <div className="layoutTopbar">
                <Topbar />
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