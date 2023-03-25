import "./home.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";

function Home() {
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="homeContainer">
                <Sidebar page={1} />
                <div className="homeFeed">
                    <Share />
                    <Feed />
                </div>

                <Rightbar />
            </div>
        </>
    );
}

export default Home;