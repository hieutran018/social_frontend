import '../dialogshare.css'
import '../../post/post.css'
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MenuItem from '@mui/material/MenuItem';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Menu from '@mui/material/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import { sharePostToWall } from '../../../redux/actions/postAction'
import { selectAddPostStatus } from '../../../redux/selectors/postSelector';

function ShareOption({ post }) {

    const cookies = useCookies('_tk');
    const [anchorEl, setAnchorEl] = useState(null);
    const [privacy, setPrivacy] = useState(1);

    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    const statusAdd = useSelector(selectAddPostStatus);
    const [checkClick, setCheckClick] = useState(true);

    const [inputContentPost, setInputContentPost] = useState('');

    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeContent = (e) => {
        setInputContentPost(e.target.value)

    }
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    console.log(post)


    const submitPost = () => {

        setCheckClick(false);
        dispatch(sharePostToWall(post, cookies, inputContentPost))
        console.log(inputContentPost);
        setInputContentPost('');


    }

    return (
        <div className='dialogShare'>
            <div className="wrapper">

                <div className='contaierHeader'>
                    <span className='shareTitle'>Tạo bài viết</span>
                </div>

                {
                    statusAdd === 'adding' ?
                        <div className='dialogshareLoading'>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={100} />
                            </Box>
                        </div> : (statusAdd === 'succeeded' || !statusAdd) && checkClick ? <div>
                            <div className="content">
                                <div className='shareImgAvatarContainer'><img className='shareImgAvatar' src="assets/person/1.jpeg" alt="logo" /></div>
                                <div className="details">
                                    <p className='shareUserName'>Trần Dương Chí Hiếu</p>
                                    <div className='privacy' onClick={handleClick}>
                                        {privacy === 2 ? <PeopleAltIcon /> : privacy === 0 ? <LockPersonIcon /> : <PublicIcon />}
                                        <span>{privacy === 2 ? 'Bạn bè' : privacy === 0 ? 'Chỉ mình tôi' : 'Công khai'}</span>
                                        <ArrowDropDownIcon />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <textarea aria-multiline onChange={handleChangeContent} className='shareContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
                            </div>
                            <div>
                                <div className="postShareWrapper">
                                    <div className="postShareCenter">
                                        <div>
                                            {post.totalMediaFile === 1 ?
                                                <div>
                                                    {
                                                        post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.mediafile[0].media_file_name} controls></video> :
                                                            <img className="postShareImg" src={post.mediafile[0].media_file_name} alt="" />
                                                    }

                                                </div>
                                                : post.parent_post.totalMediaFile === 2 ?
                                                    <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
                                                        {post.mediafile.map((item) => (
                                                            <ImageListItem key={item.media_file_name}>
                                                                {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                    src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                    srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                    alt={item.title}
                                                                    loading="lazy"
                                                                />}
                                                            </ImageListItem>
                                                        ))}
                                                    </ImageList> : post.parent_post.totalMediaFile === 3 ?
                                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                            {post.mediafile.map((item) => (
                                                                <ImageListItem key={item.media_file_name}>
                                                                    {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />}
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList> :
                                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                                            {post.mediafile.map((item) => (
                                                                <ImageListItem key={item.media_file_name}>
                                                                    {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />}
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList>}
                                        </div>

                                    </div>
                                    <div className="postShareTop">
                                        <div className="postTopLeft">
                                            <a href={"/" + post.user_id}>
                                                <img
                                                    className="postProfileImg"
                                                    src={post.avatarUser}
                                                    alt={"Avatar user " + post.username}
                                                />
                                            </a>

                                            <div>
                                                <span className="postUsername">
                                                    <a className="postLinkProfileUser" href={"/" + post.user_id}>
                                                        {post.username}
                                                    </a>
                                                </span>
                                                <div className="postPrivacy">
                                                    <span className="postshareDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                        {post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : <GroupIcon className="postIconPrivacy" />}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <ShowMoreText
                                            /* Default options */
                                            lines={1}
                                            more="xem thêm"
                                            less="ẩn bớt"
                                            className="postText"
                                            anchorClass="postViewMore"
                                            onClick={executeOnClick}
                                            expanded={false}

                                            truncatedEndingComponent={"... "}
                                        ><p>{post.post_content}</p>
                                        </ShowMoreText>
                                    </div>

                                </div>
                            </div>

                            <div className='shareButtonContainer'>
                                <button onClick={submitPost} className="shareButton">Đăng</button>
                            </div>



                            <div>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => hanldeSelectPrivacy(1)} >Công khai</MenuItem>
                                    <MenuItem onClick={() => hanldeSelectPrivacy(2)} >Bạn bè</MenuItem>
                                    <MenuItem onClick={() => hanldeSelectPrivacy(0)}>Chỉ mình tôi</MenuItem>
                                </Menu>

                            </div>
                        </div> : <div className='dialogshareLoading'>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={100} />
                            </Box>
                        </div>
                }

            </div>

        </div >
    )
}

export default ShareOption;