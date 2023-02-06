import "./home.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";


function Home() {
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="homeContainer">

                <Sidebar page={1} />
                <Feed />
                <Rightbar />
            </div>
        </>
    );
}

export default Home;