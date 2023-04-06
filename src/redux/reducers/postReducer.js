import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED, ADD_POST, ADD_POST_STARTED, ADD_POST_SUCCEEDED, ADD_POST_FAILED, COUNT_COMMENT_POST
} from '../constants/postConstant'

const initialState = []

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POST_STARTED: {
            return {
                ...state,

                status: 'loading'
            }
        }
        case FETCH_POST_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                posts: action.posts
            }
        }
        case FETCH_POST_FAILED: {
            return {
                ...state,
                status: 'failed',
                posts: [],
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