import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ShowMoreText from "react-show-more-text";
import PublicIcon from '@mui/icons-material/Public';
import { AiOutlineCamera } from 'react-icons/ai';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Comment from "../comment/comment";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../redux/actions/postAction';
import axios from 'axios';

import './postdetail.css'



function PostDetail({ post }) {

    const cookies = useCookies('_tk');
    const user = JSON.parse(localStorage.getItem('user'));
    const [commentList, setCommentList] = useState([]);
    const [inputComment, setInputComment] = useState('');
    const [countComment, setCountComment] = useState(post.totalComment);
    const [file, setFile] = useState();

    const dispatch = useDispatch();

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    const handleChangeFile = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        function fetchCommentByIdPost(postId) {
            const requestURL = 'http://127.0.0.1:8000/api/fetch-comment-by-post';
            axios({
                method: "POST",
                url: requestURL,
                data: {
                    postId: postId
                }
            }).then((response) => {
                setCommentList(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchCommentByIdPost(post.id)
    }, [post.id])


    const handleClickPostComment = (postId) => {
        console.log(postId, post);
        dispatch(commentPost(cookies[0]._tk, postId, inputComment, file ? file : null))
        const requestURL = 'http://127.0.0.1:8000/api/fetch-comment-by-post';
        axios({
            method: "POST",
            url: requestURL,
            data: {
                postId: postId
            }
        }).then((response) => {
            setCommentList(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
        setInputComment('');
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
                        <div className="dialoPostButtonClose" style={{ width: "10%" }}>
                            <IconButton className="buttonClose" aria-label="delete" size="large">
                                <ClearIcon fontSize="inherit" />
                            </IconButton>
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
                                        <span className="postUsername">
                                            <a className="postLinkProfileUser" href={"/userId/" + post.user_id}>
                                                {post.displayName}

                                            </a>
                                            {post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.iconPatch} alt="" /> <span className='postTagUser'>{post.iconName}</span></span> : ""}{post.parent_post ? <span className="postWithTextShare"> đã chia sẻ một bài viết</span> : ""} {post.tag.length === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.tag.length + " người khác"}</span></span>}
                                        </span>
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
                                    {post.totalMediaFile === 1 ?
                                        <div>
                                            {
                                                post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.mediafile[0].media_file_name} controls></video> :
                                                    <img className="postImg" src={post.mediafile[0].media_file_name} alt="" />
                                            }

                                        </div>
                                        : post.totalMediaFile === 2 ?
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
                                            </ImageList> : post.totalMediaFile === 3 ?
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
                                </div> :
                                <div className="postParent">
                                    <div className="postShareWrapper">
                                        <div className="postShareCenter">
                                            <div>
                                                {post.parent_post.totalMediaFile === 1 ?
                                                    <div>
                                                        {
                                                            post.parent_post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.parent_post.mediafile[0].media_file_name} controls></video> :
                                                                <img className="postShareImg" src={post.parent_post.mediafile[0].media_file_name} alt="" />
                                                        }

                                                    </div>
                                                    : post.parent_post.totalMediaFile === 2 ?
                                                        <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
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
                                                        </ImageList> : post.parent_post.totalMediaFile === 3 ?
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
                                                                    {post.parent_post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.parent_post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : <GroupIcon className="postIconPrivacy" />}</span>
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
                    <div className="postBottomStatistical">
                        <span className="postTextStatistical">{post.totalLike === 0 ? "" : post.totalLike + " lượt thích"}</span> <div><span className="postTextStatistical statisticalComment">{countComment === 0 ? "" : countComment + " bình luận"}</span><span className="postTextStatistical">{post.totalShare === 0 ? "" : post.totalShare + " lượt chia sẻ"}</span></div>
                    </div>
                    <div className="postDetailBottom">

                        <div className="postDetailBottomButton"><button className="btn ">Thích </button></div>
                        <div className="postDetailBottomButton"><button className="btn ">Bình luận</button></div>
                        <div className="postDetailBottomButton"><button className="btn ">Chia sẻ</button></div>



                    </div>
                    <div>
                        {commentList.map((u) => (
                            <Comment key={u.id} comment={u} />
                        ))}
                    </div>
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