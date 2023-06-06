import './detailpost.css';
import { Link, useParams } from 'react-router-dom';
import { BsFilePostFill } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { RxDotsVertical } from 'react-icons/rx';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import avatar from '../../../ckc_social_logo.png';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import 'moment/locale/vi';

function DetailPost({ props }) {
    const postId = useParams().postId;
    const [id,] = useState(props ? props : postId);
    const cookies = useCookies('tk')[0].tk;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openShare, setOpenShare] = useState(false);
    const [openReaction, setOpenReaction] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [post, setPost] = useState();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpenShare = () => {
        setOpenShare(true);
    };
    const handleCloseShare = () => {
        setOpenShare(false);

    };
    const handleClickOpenReaction = () => {
        setOpenReaction(true);
    };
    const handleCloseReaction = () => {
        setOpenReaction(false);

    };
    const handleClickOpenComment = () => {
        setOpenComment(true);
    };
    const handleCloseComment = () => {
        setOpenComment(false);
    };

    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/admin/fetch-post-by-id/postId=' + id;
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
            }
        }).then((response) => {
            console.log(response.data);
            setPost(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [cookies, id])
    console.log(props);
    return (
        <div className={props ? "" : 'adminDeatailPostWrapper'}>
            {
                props ?
                    <></> :
                    <div className='postsManagementBreadCrumb'>
                        <div className='postsManagementIconContainer'><BsFilePostFill size={30} className='postsManagementIcon' /></div>
                        <div className='postsManagementBreadCrumbTitle'>Quản lý bài viết / <span className='postsManagementBreadCrumbTitleCurrent'>Chi tiết bài viết</span></div>
                    </div>
            }

            {
                post ?
                    <div>
                        <div className='adminDeatailPostMainTop'>
                            {
                                props ? <></> :
                                    <Link to="/admin/posts">
                                        <div className='adminDetailBack'>
                                            <IoMdArrowBack size={40} />
                                        </div>
                                    </Link>
                            }
                            <div className='adminDetailPostAction'>
                                <div onClick={handleClickOpenShare} className='adminDetailPostActionCountContainer admindetailPostActionColorShare'>
                                    <div className='adminDetailPostActionCount'>
                                        Lượt chia sẻ: {post.totalShare}
                                    </div>
                                </div>
                                <div onClick={handleClickOpenReaction} className='adminDetailPostActionCountContainer admindetailPostActionColorReaction'>
                                    <div className='adminDetailPostActionCount'>
                                        Lượt Reaction: {post.totalLike}
                                    </div>
                                </div>
                                <div onClick={handleClickOpenComment} className='adminDetailPostActionCountContainer admindetailPostActionColorComment'>
                                    <div className='adminDetailPostActionCount'>
                                        Lượt bình luận: {post.totalComment}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='adminDeatailPostMain'>
                            <div className='adminDetailPostMainContainer'>
                                <div className='admiDetailPostUser'>
                                    <div className='admiDetailPostUserLeft'>
                                        <img className='adminDetailPostUserAvatar' src={post.avatarUser} alt="" />
                                        <div className='adminDetailPostUserContainer'>
                                            <div className='adminDetailPostUserName'>{post.displayName}</div>
                                            <div className='adminDetailPostCreatedAt'>{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}</div>
                                        </div>
                                    </div>
                                    <RxDotsVertical onClick={handleClick} size={25} />

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem style={{ width: "300px" }} onClick={handleClose}>
                                            <div className='adminDetailPostOptionActionPost'>
                                                <AiOutlineHistory size={25} /><span className='adminDetailPostOptionActionPostDescription'>Xem lịch sử chỉnh sửa</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem style={{ width: "300px" }} onClick={handleClose}>
                                            <div className='adminDetailPostOptionActionPost'>
                                                <MdDeleteForever size={25} /><span className='adminDetailPostOptionActionPostDescription'>Xóa bài viết</span>
                                            </div>
                                        </MenuItem>
                                    </Menu>

                                </div>
                                <div className='adminDetailPostContentMain'>
                                    <div className='adminDetailPostContentPost'>
                                        {post.post_content}
                                    </div>
                                    {
                                        post.totalMediaFile !== 0 ?
                                            <div className='adminDetailPostContentMedia'>{
                                                post.mediafile.map((file) => (
                                                    <img key={file.id} className='adminDetailPostContentMediaFile' src={file.media_file_name} alt="" />
                                                ))
                                            }
                                            </div> :
                                            <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <Dialog onClose={handleCloseShare} open={openShare} >
                                <DialogTitle style={{ display: "flex", justifyContent: "center" }}>Danh sách người dùng đã chia sẻ bài viết</DialogTitle>
                                <DialogContent>
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                                            <div key={item} className='adminDetailDialogUsersShare'>
                                                <div className='adminDetailDialogUsersShareCard'>
                                                    <img className='adminDetailDialogUsersShareAvatar' src={avatar} alt="" />
                                                    <div className='adminDetailDialogUsersShareName'> Trần Dương Chí Hiếu {item}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog onClose={handleCloseReaction} open={openReaction} >
                                <DialogTitle style={{ display: "flex", justifyContent: "center" }}> Danh sách người dùng đã Reaction bài viết</DialogTitle>
                                <DialogContent style={{ padding: "0px" }} >
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                                            <div key={item} className='adminDetailDialogUsersShare'>
                                                <div className='adminDetailDialogUsersShareCard'>
                                                    <img className='adminDetailDialogUsersShareAvatar' src={avatar} alt="" />
                                                    <div className='adminDetailDialogUsersShareName'> Trần Dương Chí Hiếu {item}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className='adminDialogComment'>
                            <Dialog
                                fullWidth
                                maxWidth="md"
                                onClose={handleCloseComment} open={openComment} >
                                <DialogTitle style={{ display: "flex", justifyContent: "center" }}>Danh sách người dùng đã Reaction bài viết</DialogTitle>
                                <DialogContent style={{ padding: "0px" }} >
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
                                            <div key={item} className='adminDialogCommentItem'>
                                                <div className='adminCommentCardContainer'>
                                                    <div className="adminCommentCard">
                                                        <div className="adminCommentAvatarContainer">
                                                            <a href={"/userId/" + item}><img className="adminCommentAvatarProfile" src={avatar} alt="" /></a>
                                                        </div>
                                                        <div className='adminCommentMain'>
                                                            <div className="adminCommentUserNameContainer">
                                                                <span className="adminCommentUserName"><a className='commentLinkProfileUser' href={"/userId/" + item}>{"Trần Dương Chí Hiếu" + item}</a></span>
                                                            </div>
                                                            <div className="adminCommentContent">
                                                                <span>Comment bai viet so {item}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='adminCommentBottom'>
                                                    <span className="adminCommentSubItem">1 giờ trước</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div> : <>Đang tải dữ liệu</>
            }

        </div>
    );
}
export default DetailPost;