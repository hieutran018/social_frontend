import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED, ADD_POST, ADD_POST_STARTED, ADD_POST_SUCCEEDED, ADD_POST_FAILED,
    LOAD_MORE_POST,
    COUNT_COMMENT_POST,
    UPDATE_POST,
    DELETE_POST
} from '../constants/postConstant'

const initialState = []

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POST_STARTED: {
            return {
                ...state,
                posts: [],
                status: 'loading',
                page: 0
            }
        }
        case FETCH_POST_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                page: action.page,
                posts: action.posts,
            }
        }
        case FETCH_POST_FAILED: {
            return {
                ...state,
                status: 'failed',
                error: action.error
            }
        }
        case ADD_POST_STARTED: {
            return {
                ...state,
                statusAdd: 'adding',

            }
        }
        case ADD_POST_SUCCEEDED: {
            return {
                ...state,
                statusAdd: 'succeeded',
                posts: [action.post, ...state.posts]
            }
        }
        case ADD_POST_FAILED: {
            return {
                ...state,
                statusAdd: 'failed',
                posts: state.posts,
                error: action.error
            }
        }
        case UPDATE_POST: {
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id) {
                        return post = action.post
                    } else {
                        return post
                    }
                })
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.post.id)
            }
        }
        case LOAD_MORE_POST: {
            return {
                ...state,
                posts: [...state.posts, ...action.posts]
            }
        }
        case COUNT_COMMENT_POST: {
            return {
                ...state,
            }
        }
        case ADD_POST: {
            return state.posts.concat({
                posts: action.post
            })
        }

        default:
            return state
    }
}