import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED,
    ADD_POST,
    ADD_POST_STARTED,
    ADD_POST_SUCCEEDED,
    ADD_POST_FAILED, LOAD_MORE_POST,
    UPDATE_POST,
    DELETE_POST
} from '../constants/postConstant';
import { baseURL } from '../../components/auth/auth';

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
export const deletedPost = post => ({
    type: DELETE_POST,
    post
})


export const fetchPostGroup = (cookies, page) => {
    return async dispatch => {
        if (page + 1 === 1) {
            dispatch(fetchPostStarted([]))
        }
        try {
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-post-group?page=' + page;
            baseURL.get('/api/v1/fetch-post-group?page=' + page, {
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
            }).catch((error) => {
                dispatch(fetchPostFailed(error))
                console.log(error);
            });
        } catch (err) {
            console.log(err);
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
            baseURL.get('/api/v1/fetch-post?page=' + page, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((res) => {
                console.log("DATA", res.data);
                if (page >= 0 && page < 2) {
                    dispatch(fetchPostSucceeded(res.data.data, res.data.last_page))
                } else {
                    dispatch(loadMorePost(res.data.data))
                }
            }).catch((error) => {
                dispatch(fetchPostFailed(error))
                console.log(error);
            });

        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const fetchPostByUserId = (userId, page) => {
    return async dispatch => {
        if (page + 1 === 1) {
            dispatch(fetchPostStarted([]))
        }
        try {
            baseURL.get('/api/fetch-post-by-userId/userId=' + userId + '?page=' + page, {})
                .then((res) => {
                    console.log("DATA", res.data);
                    if (page >= 0 && page < 2) {
                        dispatch(fetchPostSucceeded(res.data.data, res.data.last_page))
                    } else {
                        dispatch(loadMorePost(res.data.data))
                    }
                }).catch((error) => {
                    dispatch(fetchPostFailed(error))
                    console.log(error);
                });
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
            // const requestURL = "https://ckcsocial.site/api/v1/create-post";
            baseURL.post('/api/v1/create-post', {
                postContent: contentPost, privacy: privacy, files: files, tags: tags, groupId: group, feelActivityId: feelActivityId
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("CREATE POST", response.data);
                dispatch(addNewPostSucceeded(response.data));
            }).catch((error) => addNewPostFailed(error));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const sharePostFormGroupToWall = (post, cookies, inputContent, privacy) => {
    return async dispatch => {
        try {
            dispatch(addNewPostStarted());
            baseURL.post('/api/v1/share-post-to-profile', {
                postId: post.id, postContent: inputContent, privacy: privacy
            }, {
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
            baseURL.post('/api/v1/share-post-to-profile', {
                postId: post.id, postContent: inputContent, privacy: privacy
            }, {
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
            // const requestURL = "https://ckcsocial.site/api/v1/update-post";
            baseURL.post('/api/v1/update-post', {
                postId: postId,
                contentPost: contentPost,
                privacy: privacy,
                tags: tags,
                faaId: feelActivityId,
                files: files,
                removeFile: removeFile
            }, {
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
            // const requestURL = "https://ckcsocial.site/api/v1/fetch-post-by-group-id/" + groupId + "?page=" + page;
            baseURL.get('/api/v1/fetch-post-by-group-id/' + groupId + '?page=' + page, {
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


export const deletePost = (cookies, postId) => {
    return async dispatch => {
        try {
            baseURL.post('/api/v1/delete-post', { postId: postId }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((res) => {
                console.log(res.data);
                dispatch(deletedPost(res.data))
            })
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