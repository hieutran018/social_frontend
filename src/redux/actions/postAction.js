import axios from 'axios'
import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED,
    ADD_POST,
    ADD_POST_STARTED,
    ADD_POST_SUCCEEDED,
    ADD_POST_FAILED,
    COUNT_COMMENT_POST
} from '../constants/postConstant'

export const fetchPostStarted = posts => ({
    type: FETCH_POST_STARTED,
    posts
})

export const fetchPostSucceeded = posts => ({
    type: FETCH_POST_SUCCEEDED,
    posts
})

export const addNewPostFailed = error => ({
    type: ADD_POST_FAILED,
    error
})

export const addNewPostStarted = () => ({
    type: ADD_POST_STARTED
})

export const addNewPostSucceeded = post => ({
    type: ADD_POST_SUCCEEDED,
    post
})

export const fetchPostFailed = error => ({
    type: FETCH_POST_FAILED,
    error
})

export const countComment = comments => ({
    type: COUNT_COMMENT_POST,
    comments
})

export const fetchPostGroup = (cookies) => {
    return async dispatch => {
        dispatch(fetchPostStarted([]))

        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-post-group'
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log('FEEDS GROUP', response.data);
                dispatch(fetchPostSucceeded(response.data))
                // dispatch(fetchPost())


            }).catch((error) => dispatch(fetchPostFailed(error)));
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const fetchPost = (token) => {
    return async dispatch => {
        dispatch(fetchPostStarted([]))

        try {
            // Axios is common, but also `fetch`, or your own "API service" layer
            const res = await axios.get('http://127.0.0.1:8000/api/v1/fetch-post', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(res.data);
            dispatch(fetchPostSucceeded(res.data))
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const addNewPost = (token, contentPost, files, privacy, group) => {
    return async dispatch => {
        try {
            dispatch(addNewPostStarted());
            const requestURL = "http://127.0.0.1:8000/api/v1/create-post";

            axios({
                method: 'POST', //you can set what request you want to be
                url: requestURL,
                data: { postContent: contentPost, privacy: privacy, files: files, groupId: group },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("POST POST GROUP", response.data);
                dispatch(addNewPostSucceeded(response.data));
                // dispatch(fetchPost())


            }).catch((error) => addNewPostFailed(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const sharePostToWall = (post, cookies, inputContent, privacy) => {
    return async dispatch => {
        try {
            dispatch(addNewPostStarted());
            axios({
                method: 'POST', //you can set what request you want to be
                url: 'http://127.0.0.1:8000/api/v1/share-post-to-profile',
                data: { postId: post.id, postContent: inputContent, privacy: privacy },
                headers: {
                    Authorization: 'Bearer ' + cookies[0]._tk
                }
            }).then((response) => {
                console.log('redux postshare', response.data)
                dispatch(addNewPostSucceeded(response.data));



            }).catch((error) => addNewPostFailed(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    };
}

export const fetchPostGroupByIdGroup = (cookies, groupId) => {
    return async dispatch => {
        try {
            dispatch(fetchPostStarted([]));
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-post-by-group-id/" + groupId;
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(fetchPostSucceeded(response.data));
                console.log("POST GROUP " + groupId, response.data)
            }).catch((error) => console.log(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const commentPost = (cookies, postId, commentContent) => {
    return async dispatch => {
        try {
            axios({
                method: 'POST', //you can set what request you want to be
                url: 'http://127.0.0.1:8000/api/v1/create-comment-post',
                data: { postId: postId, commentContent: commentContent },
                headers: {
                    Authorization: 'Bearer ' + cookies
                }
            }).then((res) => console.log(res))
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const addPost = (post) => ({
    type: ADD_POST,
    post
})