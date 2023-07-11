import './detailgroup.css';
import { useEffect, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import avatar from '../../../ckc_social_logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../../components/auth/auth';
import { useCookies } from 'react-cookie';
function DetailGroup() {
    const groupId = useParams().groupId;
    const navigate = useNavigate();
    const cookies = useCookies('tk')[0].tk;
    const [openMember, setOpenMember] = useState(false);
    const [members, setMembers] = useState([]);
    const [group, setGroup] = useState();
    const handleClickOpenMember = () => {
        setOpenMember(true);
    };

    const handleCloseMemer = () => {
        setOpenMember(false);
    };

    useEffect(() => {
        baseURL.get('/api/v1/admin/fetch-detail-group/groupId=' + groupId, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((response) => {
            setGroup(response.data)
        })
    }, [cookies, groupId])

    useEffect(() => {
        baseURL.get('/api/v1/admin/fetch-member-group/groupId=' + groupId, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((response) => {
            setMembers(response.data);
        })
    }, [cookies, groupId])

    return (
        <div className='adminDetailgroupWrapper'>
            <div className='groupManagementBreadCrumb'>
                <div className='groupManagementIconContainer'><HiUserGroup size={30} className='groupManagementIcon' /></div>
                <div className='groupManagementBreadCrumbTitle'>Quản lý nhóm / <span className='groupManagementBreadCrumbTitleCurrent'>Chi tiết về nhóm</span></div>
            </div>
            <div className='adminDetailGroupMain'>
                {
                    group ? <div className='adminDetailGroupInfoWrapper'>
                        <div className='adminDetailGroupInfoTop'>
                            <img className='adminDetailGroupAvatar' src={group.avatar} alt="" />
                            <div className='adminDetailGroupName'>{group.group_name}</div>
                        </div>
                        <div className='adminDetailGroupInfoAccount'>
                            <div className='adminDetailGroupInfoAccountItem'>
                                <span className='adminDetailGroupInfoAccountDescription'>Số bài viết:</span> <span className='adminDetailGroupInfoAccountContent'>{group.members}</span>
                            </div>
                            <div className='adminDetailGroupInfoAccountItem'>
                                <span className='adminDetailGroupInfoAccountDescription'>Ngày tạo tài khoản:</span> <span className='adminDetailGroupInfoAccountContent'>{group.created_at}</span>
                            </div>
                        </div>
                        <div className='adminDetailGroupInfoBottom'>
                            <div className='adminDetailGroupInfoBottomLeft'>
                                <div className='adminDetailGroupInfoItem'>
                                    <span className='adminDetailGroupInfoItemDescription'>Người sở hữu:</span> <span className='adminDetailGroupInfoItemContent'>{group.admin}</span>
                                </div>
                                <div className='adminDetailGroupInfoItem'>
                                    <span className='adminDetailGroupInfoItemDescription'>Quyền riêng tư:</span> <span className='adminDetailGroupInfoItemContent'>{group.privacy}</span>
                                </div>
                                <div className='adminDetailGroupInfoItem'>
                                    <span className='adminDetailGroupInfoItemDescription'>Tình trạng:</span> <span className='adminDetailGroupInfoItemContent'>Hoạt động</span>
                                </div>
                            </div>
                            <div className='adminDetailGroupInfoBottomRight'>
                                <div onClick={handleClickOpenMember} className='adminDetailGroupInfoItem'>
                                    <span className='adminDetailGroupInfoItemDescription'>Thành viên:</span> <span className='adminDetailGroupInfoItemContent'>{group.members}</span>
                                </div>
                                <div className='adminDetailGroupInfoItem'>
                                    <span className='adminDetailGroupInfoItemDescription'>Tập tin lưu trữ:</span> <span className='adminDetailGroupInfoItemContent'>{group.mediaFile}</span>
                                </div>
                            </div>
                        </div>
                        <div className='adminDetailGroupInfoAction'>
                            <button className='adminDetailGroupActionBlockGroup'>Khóa nhóm</button>
                            <div>
                                <button onClick={() => navigate(-1)} className='adminDetailGroupInfoActionCancel'>Quay lại</button>
                                <button className='adminDetailGroupInfoActionOptions'>Tùy Chọn</button>
                            </div>
                        </div>
                    </div> : <></>
                }
            </div>
            <div>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    onClose={handleCloseMemer} open={openMember} >
                    <DialogTitle style={{ display: "flex", justifyContent: "center" }}> Danh sách thành viên nhóm</DialogTitle>
                    <DialogContent style={{ padding: "0px" }} >
                        {
                            members.map((member) => (
                                <div key={member.id} className='groupDetailDialogMember'>
                                    <div className='groupDetailDialogMemberCard'>
                                        <img className='groupDetailDialogMemberAvatar' src={member.avatar} alt="" />
                                        <div className='groupDetailDialogMemberNameContainer'>
                                            <div className='groupDetailDialogMemberName'>{member.displayName}</div>
                                            <div>{parseInt(member.isAdminGroup) === 1 ? 'Quản trị viên' : 'Thành viên nhóm'}</div>
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