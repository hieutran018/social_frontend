import './member.css';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';
import { CgProfile } from 'react-icons/cg';
import { MdGroupRemove } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { MdRemoveModerator } from 'react-icons/md';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMemberToAdminGroup, removeAdminToGroup, removeMemberFromGroup } from '../../../redux/actions/memberAction';
import { useCookies } from 'react-cookie';

function MemberCard({ member, auth }) {
    console.log(member);
    const cookies = useCookies('_tk')[0]._tk;
    const groupId = useParams().groupId;
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchor, setAnchor] = useState(null);
    const openAdvanceOption = Boolean(anchor);
    const handleClickOpenAdvanceOption = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleClickCloseAdvanceOption = () => {
        setAnchor(null);
    };
    const handleNavigate = () => {
        navigate('/' + member.user_id);
    }

    const handleAddMemberToAdminGroup = (userId) => {
        dispatch(addMemberToAdminGroup(cookies, userId, groupId))
        setAnchor(null)

    }
    const handleRemoveAdminToGroup = (userId) => {
        dispatch(removeAdminToGroup(cookies, userId, groupId))
        setAnchor(null)
    }
    const handleRemoveMemberFromGroup = (userId) => {
        dispatch(removeMemberFromGroup(cookies, userId, groupId));
        setAnchor(null)

    }

    return (
        <div className='memberCard'>
            <div style={{ display: "flex" }}>
                <div className='memberCardMemberAvatar'>
                    <img className='memberCardAvatar' src={member.avatar} alt="" />
                </div>
                <div className='memberCardRight'>
                    <div className="memberCardMemberInformation">
                        <div className='memberCardMemberName'>
                            {member.displayName}
                        </div>
                        {
                            member.isAdminGroup === 1 ? <div className='memberCardMemberPosition'>Quản trị viên</div> : <></>
                        }
                    </div>
                    <div className='memberCardJoinedAt'>
                        {member.isAccept === 1 ? "Lời mời trở thành quản trị viên Đã tham gia vào thứ ba, ngày 2 tháng 5 năm 2023" : "Đã tham gia vào thứ ba, ngày 2 tháng 5 năm 2023"}
                    </div>
                </div>
            </div>

            <div className='memberAdvanceOption'>
                <BiDotsVerticalRounded onClick={handleClickOpenAdvanceOption} size={25} />
                <div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchor}
                        open={openAdvanceOption}
                        onClose={handleClickCloseAdvanceOption}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div className="memberCardMenuItems">
                            <MenuItem onClick={handleNavigate} >
                                <div className="memberCardItem">
                                    <div className="memberCardIcon">
                                        <CgProfile size={25} />
                                    </div>
                                    <div className="memberCardTextContainer">
                                        <span className="memberCardText">Trang cá nhân</span>
                                    </div>
                                </div>
                            </MenuItem>
                            {
                                auth && user.id !== member.user_id && member.isAdminGroup === 0 ?
                                    <MenuItem onClick={() => handleAddMemberToAdminGroup(member.user_id)} >
                                        <div className="memberCardItem">
                                            <div className="memberCardIcon">
                                                <GrUserAdmin size={25} />
                                            </div>
                                            <div className="memberCardTextContainer">
                                                <span className="memberCardText">Thăng cấp quản trị viên</span>
                                            </div>
                                        </div>
                                    </MenuItem> : <></>
                            }
                            {auth && user.id !== member.user_id && member.isAdminGroup === 1 ?
                                <MenuItem onClick={() => handleRemoveAdminToGroup(member.user_id)} >
                                    <div className="memberCardItem">
                                        <div className="memberCardIcon">
                                            <MdRemoveModerator size={25} />
                                        </div>
                                        <div className="memberCardTextContainer">
                                            <span className="memberCardText">Xóa quyền quản trị viên</span>
                                        </div>
                                    </div>
                                </MenuItem> : <></>
                            }
                            {
                                auth && user.id !== member.user_id ?
                                    <MenuItem onClick={() => handleRemoveMemberFromGroup(member.user_id)} >
                                        <div className="memberCardItem">
                                            <div className="memberCardIcon">
                                                <MdGroupRemove size={25} />
                                            </div>
                                            <div className="memberCardTextContainer">
                                                <span className="memberCardText">Xóa khỏi nhóm</span>
                                            </div>
                                        </div>
                                    </MenuItem> :
                                    <></>
                            }

                            {
                                user.id === member.user_id ?
                                    <MenuItem onClick={() => handleRemoveMemberFromGroup(member.user_id)} >
                                        <div className="memberCardItem">
                                            <div className="memberCardIcon">
                                                <SlLogout size={25} />
                                            </div>
                                            <div className="memberCardTextContainer">
                                                <span className="memberCardText">Rời nhóm</span>
                                            </div>
                                        </div>
                                    </MenuItem> :
                                    <></>
                            }
                        </div>
                    </Menu>
                </div>
            </div>



        </div>
    );
}

export default MemberCard;