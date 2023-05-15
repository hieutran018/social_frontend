import './detailuser.css';
import { RiFolderUserFill } from 'react-icons/ri';
import avatar from '../../../ckc_social_logo.png';
import { useParams } from 'react-router-dom';
function DetailUser() {
    const userId = useParams().userId;
    const user = [
        { id: 1, email: 'example1@gmail.com', displayName: 'Snow', age: 35, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458693' },
        { id: 2, email: 'example2@gmail.com', displayName: 'Lannister', age: 42, sex: 'Nữ', address: 'Tp Vĩnh Long', phoneNumber: '0121489693' },
        { id: 3, email: 'example3@gmail.com', displayName: 'Lannister', age: 45, sex: 'Nữ', address: 'Tp Hồ Chí Minh', phoneNumber: '0121368693' },
        { id: 4, email: 'example4@gmail.com', displayName: 'Stark', age: 16, sex: 'Nam', address: 'Vĩnh Long', phoneNumber: '0121458693' },
        { id: 5, email: 'example5@gmail.com', displayName: 'Targaryen', age: null, sex: 'Nữ', address: 'Long An', phoneNumber: '0127895693' },
        { id: 6, email: 'example6@gmail.com', displayName: 'Melisandre', age: 150, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458654' },
        { id: 7, email: 'example7@gmail.com', displayName: 'Clifford', age: 44, sex: 'Nữ', address: 'Vĩnh Long', phoneNumber: '0121452013' },
        { id: 8, email: 'example8@gmail.com', displayName: 'Frances', age: 36, sex: 'Nam', address: 'Tp HCM', phoneNumber: '0121458831831' },
        { id: 9, email: 'example9@gmail.com', displayName: 'Roxie', age: 65, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458493' },
    ];
    return (
        <div className='adminDetailUserWrapper'>
            <div className='userManagementBreadCrumb'>
                <div className='userManagementIconContainer'><RiFolderUserFill size={30} className='userManagementIcon' /></div>
                <div className='userManagementBreadCrumbTitle'>Quản lý người dùng / <span className='userManagementBreadCrumbTitleCurrent'>Chi tiết người dùng</span></div>
            </div>
            <div className='adminDetailUserMain'>
                <div className='adminDetailUserInfoWrapper'>
                    <div className='adminDetailUserInfoTop'>
                        <img className='adminDetailUserAvatar' src={avatar} alt="" />
                        <div className='adminDetailUserName'>{user[userId].displayName}</div>
                    </div>
                    <div className='adminDetailUserInfoAccount'>
                        <div className='adminDetailUserInfoAccountItem'>
                            <span className='adminDetailUserInfoAccountDescription'>Bạn bè:</span> <span className='adminDetailUserInfoAccountContent'>100</span>
                        </div>
                        <div className='adminDetailUserInfoAccountItem'>
                            <span className='adminDetailUserInfoAccountDescription'>Ngày tạo tài khoản:</span> <span className='adminDetailUserInfoAccountContent'>10/05/2023</span>
                        </div>
                    </div>
                    <div className='adminDetailUserInfoBottom'>
                        <div className='adminDetailUserInfoBottomLeft'>
                            <div className='adminDetailUserInfoItem'>
                                <span className='adminDetailUserInfoItemDescription'>Email:</span> <span className='adminDetailUserInfoItemContent'>{user[userId].email}</span>
                            </div>
                            <div className='adminDetailUserInfoItem'>
                                <span className='adminDetailUserInfoItemDescription'>Số điện thoại:</span> <span className='adminDetailUserInfoItemContent'>{user[userId].phoneNumber}</span>
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
                                <span className='adminDetailUserInfoItemDescription'>Giới tính:</span> <span className='adminDetailUserInfoItemContent'>{user[userId].sex}</span>
                            </div>
                            <div className='adminDetailUserInfoItem'>
                                <span className='adminDetailUserInfoItemDescription'>Đến từ:</span> <span className='adminDetailUserInfoItemContent'>Nhơn Phú, Mang Thít, Vĩnh Long</span>
                            </div>
                            <div className='adminDetailUserInfoItem'>
                                <span className='adminDetailUserInfoItemDescription'>Đang sống tại:</span> <span className='adminDetailUserInfoItemContent'>{user[userId].address}</span>
                            </div>
                        </div>
                    </div>
                    <div className='adminDetailUserInfoAction'>
                        <button className='adminDetailUserInfoActionCancel'>Quay lại</button>
                        <button className='adminDetailUserInfoActionOptions'>Tùy Chọn</button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default DetailUser;