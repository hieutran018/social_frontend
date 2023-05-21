import './detailgroup.css';
import { useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import avatar from '../../../ckc_social_logo.png';
import { useParams } from 'react-router-dom';
function DetailGroup() {
    const groupId = useParams().groupId;
    const [openMember, setOpenMember] = useState(false);
    const handleClickOpenMember = () => {
        setOpenMember(true);
    };

    const handleCloseMemer = () => {
        setOpenMember(false);
    };
    const groups = [
        { id: 1, groupName: 'Nhóm 1', owner: 'Snow', members: 35, privacy: 'Công khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 2, groupName: 'Nhóm 2', owner: 'Lannister', members: 42, privacy: 'Công khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 3, groupName: 'Nhóm 3', owner: 'Lannister', members: 45, privacy: 'Riêng tư', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 4, groupName: 'Nhóm 4', owner: 'Stark', members: 16, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 5, groupName: 'Nhóm 5', owner: 'Targaryen', members: 20, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 6, groupName: 'Nhóm 6', owner: 'Melisandre', members: 21, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 7, groupName: 'Nhóm 7', owner: 'Clifford', members: 44, privacy: 'Công Khai', status: 'Dừng hoạt động', createdAt: '10/05/2023' },
        { id: 8, groupName: 'Nhóm 8', owner: 'Frances', members: 36, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 9, groupName: 'Nhóm 9', owner: 'Roxie', members: 65, privacy: 'Riêng tư', status: 'Dừng hoạt động', createdAt: '10/05/2023' },
    ];
    return (
        <div className='adminDetailgroupWrapper'>
            <div className='groupManagementBreadCrumb'>
                <div className='groupManagementIconContainer'><HiUserGroup size={30} className='groupManagementIcon' /></div>
                <div className='groupManagementBreadCrumbTitle'>Quản lý nhóm / <span className='groupManagementBreadCrumbTitleCurrent'>Chi tiết về nhóm</span></div>
            </div>
            <div className='adminDetailGroupMain'>
                <div className='adminDetailGroupInfoWrapper'>
                    <div className='adminDetailGroupInfoTop'>
                        <img className='adminDetailGroupAvatar' src={avatar} alt="" />
                        <div className='adminDetailGroupName'>{groups[groupId].groupName}</div>
                    </div>
                    <div className='adminDetailGroupInfoAccount'>
                        <div className='adminDetailGroupInfoAccountItem'>
                            <span className='adminDetailGroupInfoAccountDescription'>Số bài viết:</span> <span className='adminDetailGroupInfoAccountContent'>{groups[groupId].members}</span>
                        </div>
                        <div className='adminDetailGroupInfoAccountItem'>
                            <span className='adminDetailGroupInfoAccountDescription'>Ngày tạo tài khoản:</span> <span className='adminDetailGroupInfoAccountContent'>{groups[groupId].createdAt}</span>
                        </div>
                    </div>
                    <div className='adminDetailGroupInfoBottom'>
                        <div className='adminDetailGroupInfoBottomLeft'>
                            <div className='adminDetailGroupInfoItem'>
                                <span className='adminDetailGroupInfoItemDescription'>Người sở hữu:</span> <span className='adminDetailGroupInfoItemContent'>{groups[groupId].owner}</span>
                            </div>
                            <div className='adminDetailGroupInfoItem'>
                                <span className='adminDetailGroupInfoItemDescription'>Quyền riêng tư:</span> <span className='adminDetailGroupInfoItemContent'>{groups[groupId].privacy}</span>
                            </div>
                            <div className='adminDetailGroupInfoItem'>
                                <span className='adminDetailGroupInfoItemDescription'>Tình trạng:</span> <span className='adminDetailGroupInfoItemContent'>{groups[groupId].status}</span>
                            </div>
                        </div>
                        <div className='adminDetailGroupInfoBottomRight'>
                            <div onClick={handleClickOpenMember} className='adminDetailGroupInfoItem'>
                                <span className='adminDetailGroupInfoItemDescription'>Thành viên:</span> <span className='adminDetailGroupInfoItemContent'>10</span>
                            </div>
                            <div className='adminDetailGroupInfoItem'>
                                <span className='adminDetailGroupInfoItemDescription'>Tập tin lưu trữ:</span> <span className='adminDetailGroupInfoItemContent'>10</span>
                            </div>
                        </div>
                    </div>
                    <div className='adminDetailGroupInfoAction'>
                        <button className='adminDetailGroupActionBlockGroup'>Khóa nhóm</button>
                        <div>
                            <button className='adminDetailGroupInfoActionCancel'>Quay lại</button>
                            <button className='adminDetailGroupInfoActionOptions'>Tùy Chọn</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    onClose={handleCloseMemer} open={openMember} >
                    <DialogTitle style={{ display: "flex", justifyContent: "center" }}> Danh sách thành viên nhóm</DialogTitle>
                    <DialogContent style={{ padding: "0px" }} >
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                                <div key={item} className='groupDetailDialogMember'>
                                    <div className='groupDetailDialogMemberCard'>
                                        <img className='groupDetailDialogMemberAvatar' src={avatar} alt="" />
                                        <div className='groupDetailDialogMemberNameContainer'>
                                            <div className='groupDetailDialogMemberName'>Trần Dương Chí Hiếu {item}</div>
                                            <div>Thành viên</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default DetailGroup;