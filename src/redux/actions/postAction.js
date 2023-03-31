import axios from 'axios'
import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED,
    ADD_POST,
    ADD_POST_STARTED,
    ADD_POST_SUCCEEDED,
    ADD_POST_FAILED
} from '../constants/postConstant'

export const fetchPostStarted = () => ({
    type: FETCH_POST_STARTED
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

export const fetchPost = () => {
    return async dispatch => {
        dispatch(fetchPostStarted())

        try {
            // Axios is common, but also `fetch`, or your own "API service" layer
            const res = await axios.get('http://127.0.0.1:8000/api/fetch-post?page=1')

            dispatch(fetchPostSucceeded(res.data.data))
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const addNewPost = (token, contentPost, files, privacy) => {
    return async dispatch => {
        try {
            dispatch(addNewPostStarted());
            const requestURL = "http://127.0.0.1:8000/api/v1/create-post";

            axios({
                method: 'POST', //you can set what request you want to be
                url: requestURL,
                data: { postContent: contentPost, privacy: privacy, files: files },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {

                dispatch(addNewPostSucceeded(response.data));
                dispatch(fetchPost())


            }).catch((error) => addNewPostFailed(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const sharePostToWall = (post, cookies) => {
    return async dispatch => {
        try {
            axios({
                method: 'POST', //you can set what request you want to be
                url: 'http://127.0.0.1:8000/api/v1/share-post-to-profile',
                data: { postId: post.id, postContent: null },
                headers: {
                    Authorization: 'Bearer ' + cookies[0]._tk
                }
            }).then((response) => {
                dispatch(addPost(response.data));
                dispatch(fetchPost())


            }).catch((error) => addNewPostFailed(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    };
}

export const addPost = (post) => ({
    type: ADD_POST,
    post
})