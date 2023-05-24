import {
    ADMIN_FETCH_POST_STARTED,
    ADMIN_FETCH_POST_SUCCESSED,
    ADMIN_FETCH_POST_FAILURED
} from '../constants/adminPostConstant';


const initialState = []

export default function adminPostReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_POST_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_FETCH_POST_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                adminPosts: action.posts
            }
        }
        case ADMIN_FETCH_POST_FAILURED: {
            return {
                ...state,
                status: 'failured',
                adminPosts: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}
