import axios from 'axios';
import {
    FETCH_COMMENT_POST_STARTED,
    FETCH_COMMENT_POST_SUCCEEDED,
    FETCH_COMMENT_POST_FAILED,
    CREATE_COMMENT
} from '../constants/commentConstant';

export const fetchCommentStarted = () => ({
    type: FETCH_COMMENT_POST_STARTED
})

export const fetchCommentSucceeded = comments => ({
    type: FETCH_COMMENT_POST_SUCCEEDED,
    comments
})

export const fetchCommentFailed = errors => ({
    type: FETCH_COMMENT_POST_FAILED,
    errors
})
export const createComment = comment => ({
    type: CREATE_COMMENT,
    comment
})

export const fetchComment = (cookies, postId) => {
    return async dispatch => {
        try {
            dispatch(fetchCommentStarted());
            const requestURL = 'https://ckcsocial.site/api/v1/fetch-comment-by-post/postId=' + postId;
            axios({
                method: "GET",
                url: requestURL,
                headers: {
                    Authorization: "Bearer " + cookies[0]._tk
                }
            }).then((response) => {
                console.log(response.data, "COOMENT POST" + postId);
                dispatch(fetchCommentSucceeded(response.data));
            }).catch((error) => {
                dispatch(fetchCommentFailed(error));
            })
        } catch (error) {
            dispatch(fetchCommentFailed(error));
        }
    }
}
export const commentPost = (cookies, postId, commentContent, file) => {
    return async dispatch => {
        try {
            axios({
                method: 'POST', //you can set what request you want to be
                url: 'https://ckcsocial.site/api/v1/create-comment-post',
                data: { postId: postId, commentContent: commentContent, file: file },
                headers: {
                    Authorization: 'Bearer ' + cookies[0]._tk,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((res) => {
                console.log(res.data);
                dispatch(createComment(res.data));
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}
