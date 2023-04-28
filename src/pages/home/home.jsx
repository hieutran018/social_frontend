import "./home.css";
import Lottie from 'react-lottie-player';
import ErrorAnimation from '../../lottiefiles/error.json';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Variants from '../../components/feed/postskeleton';

import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../redux/actions/postAction";
import { selectPost, selectPostStatus, selectPage } from "../../redux/selectors/postSelector";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
function Home() {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectPostStatus);
    const posts = useSelector(selectPost);
    const page = useSelector(selectPage);
    const [nextPage, setNextPage] = useState(0);
    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;

        setNextPage(nextPage === page ? page : nextPage + 1);
        console.log("PAGE NEXT", nextPage, "TOTAL PAGE", page);
    };

    useEffect(() => {
        dispatch(fetchPost(cookies, nextPage));
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [cookies, dispatch, nextPage])


    return (
        <div>
            <div className="homeTopbar">
                <Topbar />
            </div>
            <div className="homeContainer">
                <div>
                    <Sidebar page={1} />
                </div>

                <div className="homeFeed">
                    <Share />
                    {
                        status === 'loading' ?
                            <div className="feed">
                                <div className="feedWrapper">
                                    <Variants />
                                </div>
                            </div> :
                            status === 'succeeded' ? <Feed post={posts} isGroup={true} /> :
                                status === 'failed' ?
                                    <div className="feed">
                                        <div className="feedWrapper">
                                            <div>
                                                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                                                    <Lottie
                                                        loop
                                                        animationData={ErrorAnimation}
                                                        play
                                                        style={{ width: 400, height: 300 }}
                                                    />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center" }}><span style={{ color: "black", fontSize: "25px", fontWeight: "600" }}>Có lỗi xảy ra, vui lòng thử lại!</span></div>
                                            </div>
                                        </div>
                                    </div> : <></>
                    }

                </div>

                <Rightbar />
            </div>

        </div>
    );
}

export default Home;