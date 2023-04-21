import './searchresult.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchResult() {
    const result = useParams().result;
    const cookies = useCookies('_tk')[0]._tk;
    const [datas, setData] = useState([]);
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
                setData(response.data);
                console.log(response.data);
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
                            datas.map((data) => (
                                <div key={data.id} className='searchResultUserCard'>
                                    <div className='searchResultCardLeft'>
                                        <img className='searchResultAvatar' src={data.avatar} alt="" />
                                    </div>
                                    <div className='searchResultCardRight'>
                                        <div className='searchResultName'>{data.username}</div>
                                        <div className='searchResultButtonAction'>Kết bạn</div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='searchReusltLoadMore'>
                            <div className='searchResultButtonLoadMore'>
                                Xem tất cả
                            </div>
                        </div>
                    </div>
                </div>
                <div className='searchResultData margin'>
                    <div className='searchResultUser'>
                        <div className='searchResultTitleBox'>
                            Nhóm
                        </div>
                        {
                            [0, 1, 2, 3, 4].map((item) => (
                                <div key={item} className='searchResultUserCard'>
                                    <div className='searchResultCardLeft'>
                                        <img className='searchResultAvatarGroup' src="data:image/jpeg;base64,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" alt="" />
                                    </div>
                                    <div className='searchResultCardRight'>
                                        <div className='searchResultGroupContainer'>
                                            <div className='searchResultGroupName'>Nhom DATN 2023</div>
                                            <div className='searchResultGroupInfor'>Công khai - 10 thành viên</div>
                                        </div>
                                        <div className='searchResultButtonAction'>Truy cập</div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='searchReusltLoadMore'>
                            <div className='searchResultButtonLoadMore'>
                                Xem tất cả
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SearchResult;