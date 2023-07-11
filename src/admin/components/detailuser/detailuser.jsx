import './detailuser.css';
import { RiFolderUserFill } from 'react-icons/ri';
import avatar from '../../../ckc_social_logo.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
function DetailUser() {
    const cookies = useCookies('tk')[0].tk;
    const userId = useParams().userId;
    const [user, setUser] = useState();
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/admin/fetch-detail-user/userId=' + userId;
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
            }
        }).then((response) => {
            console.log(response.data);
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [userId])
    return (
        <div className='adminDetailUserWrapper'>
            <div className='userManagementBreadCrumb'>
                <div className='userManagementIconContainer'><RiFolderUserFill size={30} className='userManagementIcon' /></div>
                <div className='userManagementBreadCrumbTitle'>Quản lý người dùng / <span className='userManagementBreadCrumbTitleCurrent'>Chi tiết người dùng</span></div>
            </div>
            {
                user ? <div className='adminDetailUserMain'>
                    <div className='adminDetailUserInfoWrapper'>
                        <div className='adminDetailUserInfoTop'>
                            <img className='adminDetailUserAvatar' src={user.avatar} alt="" />
                            <div className='adminDetailUserName'>{user.displayName}</div>
                        </div>
                        <div className='adminDetailUserInfoAccount'>
                            <div className='adminDetailUserInfoAccountItem'>
                                <span className='adminDetailUserInfoAccountDescription'>Bạn bè:</span> <span className='adminDetailUserInfoAccountContent'>{user.friend}</span>
                            </div>
                            <div className='adminDetailUserInfoAccountItem'>
                                <span className='adminDetailUserInfoAccountDescription'>Ngày tạo tài khoản:</span> <span className='adminDetailUserInfoAccountContent'>10/05/2023</span>
                            </div>
                        </div>
                        <div className='adminDetailUserInfoBottom'>
                            <div className='adminDetailUserInfoBottomLeft'>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Email:</span> <span className='adminDetailUserInfoItemContent'>{user.email}</span>
                                </div>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Số điện thoại:</span> <span className='adminDetailUserInfoItemContent'>{user.phone ? user.phone : 'Chưa cập nhật'}</span>
                                </div>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Ngày sinh:</span> <span className='adminDetailUserInfoItemContent'>Ngày 25, tháng 04, năm 2001</span>
                                </div>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Tình trạng quan hệ:</span> <span className='adminDetailUserInfoItemContent'>Độc thân</span>
                                </div>
                            </div>
                            <div className='adminDetailUserInfoBottomRight'>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Giới tính:</span> <span className='adminDetailUserInfoItemContent'>{user.sex}</span>
                                </div>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Đến từ:</span> <span className='adminDetailUserInfoItemContent'>Nhơn Phú, Mang Thít, Vĩnh Long</span>
                                </div>
                                <div className='adminDetailUserInfoItem'>
                                    <span className='adminDetailUserInfoItemDescription'>Đang sống tại:</span> <span className='adminDetailUserInfoItemContent'>{user.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className='adminDetailUserInfoAction'>
                            <button className='adminDetailUserInfoActionCancel'>Quay lại</button>
                            <button className='adminDetailUserInfoActionOptions'>Tùy Chọn</button>
                        </div>
                    </div>

                </div> : <></>
            }
        </div>

    );
}

export default DetailUser;