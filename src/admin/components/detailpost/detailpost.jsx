import './detailpost.css';
import { Link } from 'react-router-dom';
import { BsFilePostFill } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { RxDotsVertical } from 'react-icons/rx';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import avatar from '../../../ckc_social_logo.png';

function DetailPost() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openShare, setOpenShare] = useState(false);
    const [openReaction, setOpenReaction] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpenShare = () => {
        setOpenShare(true);
    };
    const handleCloseShare = (value) => {
        setOpenShare(false);

    };
    const handleClickOpenReaction = () => {
        setOpenReaction(true);
    };
    const handleCloseReaction = (value) => {
        setOpenReaction(false);

    };
    const handleClickOpenComment = () => {
        setOpenComment(true);
    };
    const handleCloseComment = (value) => {
        setOpenComment(false);

    };
    return (
        <div className='adminDeatailPostWrapper'>
            <div className='postsManagementBreadCrumb'>
                <div className='postsManagementIconContainer'><BsFilePostFill size={30} className='postsManagementIcon' /></div>
                <div className='postsManagementBreadCrumbTitle'>Quản lý bài viết / <span className='postsManagementBreadCrumbTitleCurrent'>Chi tiết bài viết</span></div>
            </div>
            <div className='adminDeatailPostMainTop'>
                <Link to="/admin/posts">
                    <div className='adminDetailBack'>
                        <IoMdArrowBack size={40} />
                    </div>
                </Link>
                <div className='adminDetailPostAction'>
                    <div onClick={handleClickOpenShare} className='adminDetailPostActionCountContainer admindetailPostActionColorShare'>
                        <div className='adminDetailPostActionCount'>
                            Lượt chia sẻ: 100
                        </div>
                    </div>
                    <div onClick={handleClickOpenReaction} className='adminDetailPostActionCountContainer admindetailPostActionColorReaction'>
                        <div className='adminDetailPostActionCount'>
                            Lượt Reaction: 100
                        </div>
                    </div>
                    <div onClick={handleClickOpenComment} className='adminDetailPostActionCountContainer admindetailPostActionColorComment'>
                        <div className='adminDetailPostActionCount'>
                            Lượt bình luận: 100
                        </div>
                    </div>
                </div>
            </div>
            <div className='adminDeatailPostMain'>
                <div className='adminDetailPostMainContainer'>
                    <div className='admiDetailPostUser'>
                        <div className='admiDetailPostUserLeft'>
                            <img className='adminDetailPostUserAvatar' src={avatar} alt="" />
                            <div className='adminDetailPostUserContainer'>
                                <div className='adminDetailPostUserName'>Trần Dương Chí Hiếu</div>
                                <div className='adminDetailPostCreatedAt'> 1 giờ trước</div>
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
                            #MT10517
                            <br />
                            Mình thích bn Thúy An 10/9 quá đi, mình luôn theo dõi từng bài đăng từng str của bn, tuy vẫn ch dám ib cho bn nhưng mình thích bn Thúy An lắm lun, mong sẽ có 1 ngày mình dũng cảm để ib cho bn ấy.
                            <br />#MT10518<br />
                            Chụp hình lén thì cũng vui mà không phải lúc nào cũng nên chụp nha bạn, nhiều quá thành vô duyên ấy. Mình nói thẳng rồi mà hình như bạn không hiểu thì phải, cái gì cũng phải có chừng mực chứ đâu mà chụp quài. Bớt OTP lại, ở đây mình không có nhu cầu được ship với ai hết. Xin đừng ship mình với một người tồi  Body shaming học sinh? Nếu xưng hô không tử tế thì xin đừng đem khuyết điểm ng khác ra để gọi, đùa cợt. Học trong môi trường giáo dục tốt nhưng lại phải chịu đựng lời nói body shaming từ ngco...
                            <br />#MT10519<br />
                            Đã tồi thì không nên yêu ai đâu anh bạn à, nhìn lại thái độ của mình trước rồi tự suy ngẫm lại bản thân đi. Nếu đã tốt thì người ta đã không quay lưng với bạn như thế rồi, sống tệ mà đòi tìm được tình yêu.
                            <br />#MT10520<br />
                            Ăn ở sao mới bị người ta ghét. Chứ tự nhiên khi không ai mà ghét? Sao mà cứ hay đem nhau ra so sánh quá, có trình thì đã ngang nhau rồi chứ không phải như vậy đâu. Không ghét nhau cũng cố tình nói móc, nói khoét cho ghét nhau là sao? Đi nói xấu người khác là giỏi thôi chứ có làm gì được.
                            <br />#MT10521<br />

                            Có 1 kiểu ng, hiểu chuyện, có chính kiến, có khả năng kiểm soát bản thân, và là 1 ng tích cực. Tình yêu đối với họ là 1 thứ k quan trọng, mà là 1 phần của cuộc đời họ. Họ có thể đã yêu nhiều ng (k cùng lúc) nhưng tình cảm đv mỗi ng đều thật tới từng cảm xúc. Họ muốn trao đi, họ mún cùng chia sẽ, họ mún lo lắng, quan tâm và chăm sóc cho ng ấy. Nhưng dường như, những thứ đó chỉ dừng lại ở chỗ là 1 suy nghĩ. Họ muốn nhưng k làm đc. họ sợ những tình cảm của họ có thể chỉ là nhất thời. họ sợ mình k có khả năng làm ngta hạnh phúc. họ sợ chính họ là ng bị lừa gạt. Và tất cả cũng chỉ là những dòng suy nghĩ chảy dài vô tận trong đầu họ. Chính xác!! Tôi đang nói về những overthinker. Cái loại ng mà số lượng suy nghĩ còn nhiều hơn số đt và rối rắm còn hơn cả liệt kê hết số pi. Họ hướng ngoại, mạnh mẽ, tự tin, hài hước và thành công,... họ có thể là 1 overthinker/Họ hướng nội, tự ti, nhút nhát, cứng rắn, tự lập, đơn độc... họ vẫn có thể là overthinker. Họ là loại ng dễ bị tổn thương tinh thần nhất dù là ai đi chăng nữa, chỉ là ta nhận ra hay k thôi. Chỉ 1 câu nói đùa nhưng bn lại dùng sai giọng điệu, họ sẽ mất cả đêm để nghĩ về nó và hàng tỉ thứ liên quan tới nó. Là 1 cảm giác mông lung, bất an, lo lắng, dằn vặt, sợ hãi,... chúng kéo đến liên tục để tra tấn tinh thần họ. Tôi cũng có 1 ng bn thân là 1 overthinker tới mức nặng (còn tôi thì nhẹ thoi) và t hiểu đc sự khủng hoảng của nó qua cách nó kể về 1 thái độ, 1 câu nói và 1 ánh mắt của ng nó thích. Đêm trc khi nó kể với tôi nó gần như đã thức trắng chỉ vì những thứ k rỏ ràng nó tiếp nhận. Bạn cũng có những đứa bạn là overthinker chứ, cứu nó đi.... Nhiều khi thứ nó cần chỉ là sự lắng nghe chân thành, 1 chút đồng cảm, 1 câu giải thích xác thực rỏ ràng. Đây k ph bệnh mà là 1 tính cách, 1 phần của con ng, k thể bỏ nó đi, chỉ có thể thay đổi, sửa chữa nó...
                        </div>
                        <div className='adminDetailPostContentMedia'>
                            <img className='adminDetailPostContentMediaFile' src={avatar} alt="" />
                            <img className='adminDetailPostContentMediaFile' src={avatar} alt="" />
                            <img className='adminDetailPostContentMediaFile' src={avatar} alt="" />
                        </div>
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
        </div>
    );
}
export default DetailPost;