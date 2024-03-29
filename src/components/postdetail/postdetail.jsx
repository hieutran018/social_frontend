import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ShowMoreText from "react-show-more-text";
import PublicIcon from '@mui/icons-material/Public';
import { AiOutlineCamera, AiOutlineLike } from 'react-icons/ai';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Comment from "../comment/comment";
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import likeImg from '../../rections/like.png';
import loveImg from '../../rections/love.png';
import yayImg from '../../rections/yay.png';
import wowImg from '../../rections/wow.png';
import sadImg from '../../rections/sad.png';
import hahaImg from '../../rections/haha.png';
import angryImg from '../../rections/angry.png';
import authorUser from '../../lottiefiles/tick_blue.png';
import './postdetail.css'
import ReactionsPost from '../reationspost/reactionspost';
import ReactionButton from '../reaction/reaction';
import { fetchComment, commentPost } from '../../redux/actions/commentAction';
import { selectStatusComments, selectComments } from '../../redux/selectors/commentSelector';
import SkeletonCommentPost from '../comment/skeletonComment';

function PostDetail({ post, isLiked, like, likes, share, close, reaction }) {
    const cookies = useCookies('_tk');
    const [postId,] = useState(post.id);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLike, setIsLike] = useState(post.isLike);
    const [commentList, setCommentList] = useState([]);
    const [inputComment, setInputComment] = useState('');
    const [countComment, setCountComment] = useState(post.totalComment);
    const [file, setFile] = useState();
    const [openReactions, setOpenReactions] = useState(false);
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const status = useSelector(selectStatusComments);
    const reactions = [
        { id: 1, img: likeImg },
        { id: 2, img: loveImg },
        { id: 3, img: sadImg },
        { id: 4, img: hahaImg },
        { id: 5, img: yayImg },
        { id: 6, img: wowImg },
        { id: 7, img: angryImg },
    ]

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    const handleChangeFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleOpenReactions = () => {
        setOpenReactions(true);
    }
    const handleCloseReactions = () => {
        setOpenReactions(false);
    }

    useEffect(() => {
        dispatch(fetchComment(cookies, postId))
    }, [])
    const handleClickPostComment = (postId) => {
        dispatch(commentPost(cookies, postId, inputComment, file))
        setInputComment('');
        setFile();
    }

    return (
        <div>
            <div className="dialogPost">
                <div>
                    <div className="postTitle">
                        <div style={{ width: "10%" }}></div>

                        <div>
                            <span className="postTitleDialog">Bài viết của {post.displayName}</span>
                        </div>
                        <div style={{ width: "10%", display: "flex", justifyContent: "end", alignItems: "center" }}>
                            <div onClick={close} className="dialoPostButtonClose">
                                <IconButton className="buttonClose" aria-label="delete" size="medium">
                                    <ClearIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postWrapper">
                    <div className="postTop">
                        {
                            post.group_id ?
                                <div className="postTopLeft">
                                    <a href={"/" + post.group_id}>
                                        <img
                                            className="postProfileImgGroup"
                                            src={post.groupAvatar}
                                            alt={"Avatar user " + post.groupName}
                                        />
                                    </a>
                                    <div>
                                        <span className="postUsername">
                                            <a className="postLinkProfileUser" href={"/userId/" + post.user_id}>
                                                {post.groupName}
                                            </a>
                                        </span>
                                        <div className="postPrivacy">
                                            <span className="postMemberGroup">
                                                <a className="postLinkProfileMemberGroup" href={"/userId/" + post.user_id}>
                                                    {post.displayName}
                                                </a>
                                            </span>
                                            <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                {post.privacy.toString() === "0" ?
                                                    <LockIcon className="postIconPrivacy" /> :
                                                    post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                        : <GroupIcon className="postIconPrivacy" />
                                                }</span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="postTopLeft">
                                    <a href={"/userId/" + post.user_id}>
                                        <img
                                            className="postProfileImg"
                                            src={post.avatarUser}
                                            alt={"Avatar user " + post.displayName}
                                        />
                                    </a>
                                    <div>
                                        <div className="postUsername">
                                            <a className="postLinkProfileUser" href={"/userId/" + post.user_id}>
                                                {post.displayName}

                                            </a>
                                            {post.isVerified === 1 ? <img style={{ width: "24px", height: "24px" }} src={authorUser} alt="" /> : <></>}
                                            {post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.iconPatch} alt="" /> <span className='postTagUser'>{post.iconName}</span></span> : ""}{post.parent_post ? <span className="postWithTextShare"> đã chia sẻ một bài viết</span> : ""} {post.tag.length === 0 ? "" : <span className="postWithText"><span style={{ marginLeft: "0.3rem" }}>cùng với</span> <span className="postTagUser">{post.tag.length + " người khác"}</span></span>}
                                        </div>
                                        <div className="postPrivacy">
                                            <span className="postDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                {post.privacy.toString() === "0" ?
                                                    <LockIcon className="postIconPrivacy" /> :
                                                    post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                        : <GroupIcon className="postIconPrivacy" />
                                                }</span>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className="postShareCenter">
                        {
                            post.parent_post ? <ShowMoreText
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
                            </ShowMoreText> : <div></div>
                        }
                        {
                            !post.parent_post ?
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
                                    {parseInt(post.totalMediaFile) === 1 ?
                                        <div>
                                            {
                                                post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.mediafile[0].media_file_name} controls></video> :
                                                    <img className="postImg" src={post.mediafile[0].media_file_name} alt="" />
                                            }

                                        </div>
                                        : parseInt(post.totalMediaFile) === 2 ?
                                            <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
                                                {post.mediafile.map((item) => (
                                                    <ImageListItem key={item.media_file_name}>
                                                        {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={item.title}
                                                            loading="lazy"
                                                            style={{ height: '300px' }}
                                                        />}
                                                    </ImageListItem>
                                                ))}
                                            </ImageList> : parseInt(post.totalMediaFile) === 3 ?
                                                <ImageList sx={{ width: "100%", height: "350px" }} cols={3} rowHeight={300}>
                                                    {post.mediafile.map((item) => (
                                                        <ImageListItem key={item.media_file_name}>
                                                            {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                                style={{ height: '300px' }}
                                                            />}
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> : parseInt(post.totalMediaFile) === 4 ? <ImageList sx={{ width: "100%", height: "880px" }} cols={2} rowHeight={500}>
                                                    {post.mediafile.map((item) => (
                                                        <ImageListItem style={{ height: '300px' }} key={item.media_file_name}>
                                                            {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />}
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> : parseInt(post.totalMediaFile) > 4 ?
                                                    <div className="postDetailMediaFileContainerItemList">
                                                        <img className="postDetailMediFileItemsList" src={post.mediafile[0].media_file_name} alt="" />
                                                        <img className="postDetailMediFileItemsList" src={post.mediafile[1].media_file_name} alt="" />
                                                        <img className="postDetailMediFileItemsList" src={post.mediafile[2].media_file_name} alt="" />
                                                        <div className="postDetailMediaFileItemsListCount">
                                                            <div className="postDetailMediaFileCountItemsList"><span className="postDetailMediFileCountItem">+{post.totalMediaFile - 3}</span></div>
                                                            <img className="postDetailMediFileItemsList" src={post.mediafile[3].media_file_name} alt="" />
                                                        </div>
                                                    </div>
                                                    : <></>}
                                </div> :
                                parseInt(post.parent_post) === 1 ?
                                    <div className="postParent">
                                        <div className="postShareWrapper">
                                            <div className="postShareIsDeleteContenTitle">Nội dung này hiện không có sẵn.</div>
                                            <div className="postShareIsDeleteContentDescription">
                                                Khi điều này xảy ra, thường là do chủ sở hữu chỉ chia sẻ nội dung đó với một nhóm nhỏ người hoặc thay đổi người có thể xem hoặc nội dung đó đã bị xóa.
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="postParent">
                                        <div className="postShareWrapper">
                                            <div className="postShareCenter">
                                                <div>
                                                    {parseInt(post.parent_post.totalMediaFile) === 1 ?
                                                        <div>
                                                            {
                                                                post.parent_post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.parent_post.mediafile[0].media_file_name} controls></video> :
                                                                    <img className="postShareImg" src={post.parent_post.mediafile[0].media_file_name} alt="" />
                                                            }

                                                        </div>
                                                        : parseInt(post.parent_post.totalMediaFile) === 2 ?
                                                            <ImageList sm={{ width: "90%", height: "300px" }} cols={2} rowHeight={400}>
                                                                {post.parent_post.mediafile.map((item) => (
                                                                    <ImageListItem style={{ height: "300px" }} key={item.media_file_name}>
                                                                        {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                            alt={item.title}
                                                                            loading="lazy"
                                                                        />}
                                                                    </ImageListItem>
                                                                ))}
                                                            </ImageList> : parseInt(post.parent_post.totalMediaFile) === 3 ?
                                                                <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                                    {post.parent_post.mediafile.map((item) => (
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
                                                                    {post.parent_post.mediafile.map((item) => (
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
                                                {
                                                    post.parent_post.group_id ?

                                                        <div className="postTopLeft">
                                                            <a href={"/" + post.parent_post.group_id}>
                                                                <img
                                                                    className="postProfileImgGroup"
                                                                    src={post.parent_post.groupAvatar}
                                                                    alt={"Avatar user " + post.parent_post.groupName}
                                                                />
                                                            </a>
                                                            <div>
                                                                <span className="postUsername">
                                                                    <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                        {post.parent_post.groupName}
                                                                    </a>
                                                                </span>
                                                                <div className="postPrivacy">
                                                                    <span className="postMemberGroup">
                                                                        <a className="postLinkProfileMemberGroup" href={"/userId/" + post.parent_post.user_id}>
                                                                            {post.parent_post.displayName}
                                                                        </a>
                                                                    </span>
                                                                    <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                        {post.parent_post.privacy.toString() === "0" ?
                                                                            <LockIcon className="postIconPrivacy" /> :
                                                                            post.parent_post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                                                : <GroupIcon className="postIconPrivacy" />
                                                                        }</span>
                                                                </div>
                                                            </div>
                                                        </div> :
                                                        <div className="postTopLeft">
                                                            <a href={"/userId/" + post.parent_post.user_id}>
                                                                <img
                                                                    className="postProfileImg"
                                                                    src={post.parent_post.avatarUser}
                                                                    alt={"Avatar user " + post.parent_post.displayName}
                                                                />
                                                            </a>
                                                            <div>
                                                                <span className="postUsername">
                                                                    <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                        {post.parent_post.displayName} {post.parent_post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.parent_post.iconPatch} alt="" /> <span className='postTagUser'>{post.parent_post.iconName}</span></span> : ""} {post.parent_post.tag.length === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.parent_post.tag.length + " người khác"}</span></span>}
                                                                    </a>
                                                                </span>
                                                                <div className="postPrivacy">
                                                                    <span className="postshareDate">{moment(post.parent_post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                        {parseInt(post.parent_post.privacy) === 0 ? <LockIcon className="postIconPrivacy" /> : parseInt(post.parent_post.privacy) === 1 ? <PublicIcon className="postIconPrivacy" /> : <GroupIcon className="postIconPrivacy" />}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
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
                                                ><p>{post.parent_post.post_content}</p>
                                                </ShowMoreText>
                                            </div>

                                        </div>
                                    </div>
                        }
                    </div>
                    <div className="postBottomStatistical detailPostStatistical">
                        <span className="postTextStatistical">
                            <div className="postIconReacactionsContainer">
                                {likes.map((reaction) => parseInt(reaction.type) === 1 ? <img className="postIconReactions" src={reactions[0].img} alt="" /> :
                                    parseInt(reaction.type) === 2 ? <img className="postIconReactions" src={reactions[1].img} alt="" /> : reaction.type === 7 ? <img className="postIconReactions" src={reactions[0].img} alt="" /> :
                                        parseInt(reaction.type) === 3 ? <img className="postIconReactions" src={reactions[2].img} alt="" /> :
                                            parseInt(reaction.type) === 4 ? <img className="postIconReactions" src={reactions[3].img} alt="" /> :
                                                parseInt(reaction.type) === 5 ? <img className="postIconReactions" src={reactions[4].img} alt="" /> :
                                                    parseInt(reaction.type) === 6 ? <img className="postIconReactions" src={reactions[5].img} alt="" /> :
                                                        <img className="postIconReactions" src={reactions[6].img} alt="" />)}
                            </div>
                            <span className="postTextDescriptionReactions">{like === 0 ? "" : like}</span>
                        </span>
                        <div>
                            <span className="postTextStatistical statisticalComment">
                                {countComment === 0 ? "" : countComment + " bình luận"}
                            </span>
                            <span className="postTextStatistical">
                                {share === 0 ? "" : share + " lượt chia sẻ"}
                            </span>
                        </div>
                    </div>
                    <div onMouseLeave={handleCloseReactions} className="postDetailBottom">
                        <div className="postBottomButton"> {openReactions ? <ReactionsPost handleReactions={reaction} onMouseOver={handleOpenReactions} /> : <></>}<button onMouseOver={handleOpenReactions} className="btn ">{isLiked ? <ReactionButton reaction={isLiked} /> : <AiOutlineLike size={25} />} </button></div>
                        <div className="postDetailBottomButton"><button className="btn ">Bình luận</button></div>
                        <div className="postDetailBottomButton"><button className="btn ">Chia sẻ</button></div>
                    </div>
                    {
                        status === 'loading' ?
                            <SkeletonCommentPost /> :
                            status === 'succeeded' ?
                                <div>
                                    {comments.map((u) => (
                                        <Comment key={u.id} comment={u} />
                                    ))}
                                </div> :
                                status === 'failed' ?
                                    <>FAILED</> :
                                    <></>
                    }
                    <div>
                        <div className="commentBox">
                            <img className="commentBoxAvatarProfile" src={user.avatar} alt="" />
                            <input onKeyDownCapture={
                                inputComment != null ? event => {
                                    if (event.key === 'Enter') {
                                        handleClickPostComment(post.id)
                                    }
                                } : {}
                            } className="commentBoxInut" type="text" value={inputComment} onChange={(event) => setInputComment(event.target.value)} />
                            <label className='commentBoxUpload' onChange={handleChangeFile} htmlFor='uploadFiles'><input type="file" id="uploadFiles" hidden /><AiOutlineCamera style={{ fontSize: "35" }} className="shareIcon" /></label>
                        </div>
                        {
                            file ? <div className='commentBoxPreviewUploadContainer'>
                                {
                                    file.type === 'image/jpeg' ? <img width={500} height={200} src={URL.createObjectURL(file)} alt="" /> :
                                        <video src={URL.createObjectURL(file)} controls></video>
                                }
                            </div> :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostDetail;