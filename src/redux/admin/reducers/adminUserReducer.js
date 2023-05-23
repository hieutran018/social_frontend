import {
    ADMIN_FETCH_USER_STARTED,
    ADMIN_FETCH_USER_SUCCESSED,
    ADMIN_FETCH_USER_FAILURED
} from '../constants/adminUserConstant';

const initialState = []

export default function adminUserReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_USER_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_FETCH_USER_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                adminUsers: action.users
            }
        }
        case ADMIN_FETCH_USER_FAILURED: {
            return {
                ...state,
                status: 'failured',
                adminUsers: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}
