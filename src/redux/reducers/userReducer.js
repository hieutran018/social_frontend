import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESSED,
    FETCH_USER_FAILED,
    UPDATE_USER_STARTED,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESSED,
    UPDATE_AVATAR_STARTED,
    UPDATE_AVATAR_SUCCESSED,
    UPDATE_AVATAR_FAILED,
    FETCH_CURRENT_USER
} from '../constants/userContant';

const initialState = []

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_USER_SUCCESSED: {
            return {
                ...state,
                users: action.users,
                status: 'success'
            }
        }
        case FETCH_USER_FAILED: {
            return {
                ...state,
                users: [],
                status: 'failed'
            }
        }
        case FETCH_CURRENT_USER: {
            return {
                ...state,
                users: action.user
            }
        }
        case UPDATE_USER_STARTED: {
            return {
                ...state,
                statusUpdate: 'loading'
            }
        }
        case UPDATE_USER_SUCCESSED: {
            return {
                ...state,
                users: action.users,
                statusUpdate: 'success'
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                users: state,
                statusUpdate: 'failed'
            }
        }
        case UPDATE_AVATAR_STARTED: {
            return {
                ...state,
                statusUpload: 'loading'
            }
        }
        case UPDATE_AVATAR_SUCCESSED: {
            return {
                ...state,
                users: action.users,
                statusUpload: 'success'
            }
        }
        case UPDATE_AVATAR_FAILED: {
            return {
                ...state,
                users: state,
                statusUpload: 'failed'
            }
        }
        default: return state;

    }
}