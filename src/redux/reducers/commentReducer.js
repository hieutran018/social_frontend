import {
    FETCH_COMMENT_POST_STARTED,
    FETCH_COMMENT_POST_SUCCEEDED,
    FETCH_COMMENT_POST_FAILED,
    CREATE_COMMENT,
} from '../constants/commentConstant';

const initialState = [];

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENT_POST_STARTED: {
            return {
                ...state,
                status: 'loading',
                comments: []
            }
        }
        case FETCH_COMMENT_POST_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                comments: action.comments
            }
        }
        case FETCH_COMMENT_POST_FAILED: {
            return {
                ...state,
                status: 'failed',
                comments: [],
                error: action.error
            }
        }
        case CREATE_COMMENT: {
            return {
                ...state,
                comments: [action.comment, ...state.comments]
            }
        }
        default:
            return state
    }
}