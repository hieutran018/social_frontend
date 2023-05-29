import axios from 'axios';
import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED,
    ADD_POST,
    ADD_POST_STARTED,
    ADD_POST_SUCCEEDED,
    ADD_POST_FAILED, LOAD_MORE_POST,
    UPDATE_POST
} from '../constants/postConstant'

export const fetchPostStarted = posts => ({
    type: FETCH_POST_STARTED,
    posts
})

export const fetchPostSucceeded = (posts, page) => ({
    type: FETCH_POST_SUCCEEDED,
    posts,
    page
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
export const loadMorePost = posts => ({
    type: LOAD_MORE_POST,
    posts
})

export const updatePost = post => ({
    type: UPDATE_POST,
    post
})


export const fetchPostGroup = (cookies, page) => {
    return async dispatch => {
        if (page + 1 === 1) {
            dispatch(fetchPostStarted([]))
        }
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-post-group?page=' + page
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {

                if (page >= 0 && page < 2) {
                    dispatch(fetchPostSucceeded(response.data.data, response.data.last_page))
                } else {
                    dispatch(loadMorePost(response.data.data))
                }


            }).catch((error) => dispatch(fetchPostFailed(error)));
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const fetchPost = (token, page) => {
    return async dispatch => {

        if (page + 1 === 1) {
            dispatch(fetchPostStarted([]))
        }
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/fetch-post?page=' + page, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(res.data);
            if (page >= 0 && page < 2) {
                dispatch(fetchPostSucceeded(res.data.data, res.data.last_page))
            } else {
                dispatch(loadMorePost(res.data.data))
            }
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const addNewPost = (token, contentPost, files, privacy, tags, group, feelActivityId) => {
    return async dispatch => {
        console.log(tags);
        try {
            dispatch(addNewPostStarted());
            const requestURL = "http://127.0.0.1:8000/api/v1/create-post";

            axios({
                method: 'POST', //you can set what request you want to be
                url: requestURL,
                data: { postContent: contentPost, privacy: privacy, files: files, tags: tags, groupId: group, feelActivityId: feelActivityId },
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
export const sharePostFormGroupToWall = (post, cookies, inputContent, privacy) => {
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

            }).catch((error) => {
                addNewPostFailed(error.message);
                console.log(error);
            });
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    };
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
            }).catch((error) => {
                addNewPostFailed(error.message);
                console.log(error);
            });
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    };
}

export const editPost = (cookies, postId, contentPost, files, privacy, tags, feelActivityId, removeFile) => {
    return async dispatch => {
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/update-post";
            axios({
                method: "POST",
                url: requestURL,
                data: {
                    postId: postId,
                    contentPost: contentPost,
                    privacy: privacy,
                    tags: tags,
                    faaId: feelActivityId,
                    files: files,
                    removeFile: removeFile
                },
                headers: {
                    Authorization: "Bearer " + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(updatePost(response.data));
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchPostGroupByIdGroup = (cookies, groupId, page) => {
    return async dispatch => {
        console.log(page);

        try {
            if (page + 1 === 1) {
                dispatch(fetchPostStarted([]));
            }
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-post-by-group-id/" + groupId + "?page=" + page;
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                if (page >= 0 && page < 2) {
                    dispatch(fetchPostSucceeded(response.data.data, response.data.last_page))
                } else {
                    console.log(response.data.data);
                    dispatch(loadMorePost(response.data.data))
                }

            }).catch((error) => console.log(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const commentPost = (cookies, postId, commentContent, file) => {
    return async dispatch => {
        try {
            axios({
                method: 'POST', //you can set what request you want to be
                url: 'http://127.0.0.1:8000/api/v1/create-comment-post',
                data: { postId: postId, commentContent: commentContent, file: file },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
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