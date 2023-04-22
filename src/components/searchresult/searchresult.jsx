import './searchresult.css';
import Post from '../post/Post';
import { BsDot } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function SearchResult() {
    const result = useParams().result;
    const cookies = useCookies('_tk')[0]._tk;
    const [dataUsers, setDataUsers] = useState([]);
    const [dataGroups, setDataGroups] = useState([]);
    const [dataPosts, setDataPosts] = useState([]);
    useEffect(() => {
        function searchData() {
            const requestURL = 'http://127.0.0.1:8000/api/v1/search-users-and-groups/' + result;

            axios({
                method: "GET",
                url: requestURL,
                headers: {
                    Authorization: "Bearer " + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                setDataUsers(response.data.users);
                setDataGroups(response.data.groups);
                setDataPosts(response.data.posts);
                console.log(response.data.users);
                console.log(response.data.groups);
            }).catch((error) => console.log(error));
        }
        searchData();
    }, [result, cookies])
    console.log(result);
    return (
        <div className='searchResult'>
            <div className='searchResultWrapper'>
                <div className='searchResultData'>
                    <div className='searchResultUser'>
                        <div className='searchResultTitleBox'>
                            Mọi người
                        </div>
                        {
                            dataUsers.map((data) => (
                                <Link className='searchResultLink' key={data.id} to={"/" + data.id}>
                                    <div className='searchResultUserCard'>
                                        <div className='searchResultCardLeft'>
                                            <img className='searchResultAvatar' src={data.avatar} alt="" />
                                        </div>
                                        <div className='searchResultCardRight'>
                                            <div className='searchResultName'>{data.username}</div>
                                            <div className='searchResultButtonAction'>Kết bạn</div>
                                        </div>
                                    </div></Link>
                            ))
                        }
                        <div className='searchReusltLoadMore'>
                            <div className='searchResultButtonLoadMore'>
                                Xem tất cả
                            </div>
                        </div>
                    </div>
                </div>
                {
                    dataGroups.length === 0 ?
                        <></> :
                        <div className='searchResultData margin'>
                            <div className='searchResultUser'>
                                <div className='searchResultTitleBox'>
                                    Nhóm
                                </div>
                                {
                                    dataGroups.map((item) => (
                                        <Link className='searchResultLink' key={item.id} to={"/groups/group/" + item.id}>
                                            <div className='searchResultUserCard'>
                                                <div className='searchResultCardLeft'>
                                                    <img className='searchResultAvatarGroup' src={item.avatar} alt="" />
                                                </div>
                                                <div className='searchResultCardRight'>
                                                    <div className='searchResultGroupContainer'>
                                                        <div className='searchResultGroupName'>{item.group_name}</div>
                                                        <div className='searchResultGroupInfor'>{item.privacy === 0 ? "Nhóm riêng tư" : "Nhóm công khai "} <BsDot /> {" " + item.totalMember + " thành viên"}</div>
                                                    </div>
                                                    <div className='searchResultButtonAction'>Truy cập</div>
                                                </div>
                                            </div></Link>
                                    ))
                                }
                                <div className='searchReusltLoadMore'>
                                    <div className='searchResultButtonLoadMore'>
                                        Xem tất cả
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                {
                    dataPosts.length === 0 ? <></> :
                        dataPosts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                }

            </div>
        </div>
    );
}

export default SearchResult;