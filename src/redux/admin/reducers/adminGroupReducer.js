import {
    ADMIN_FETCH_GROUP_STARTED,
    ADMIN_FETCH_GROUP_SUCCESSED,
    ADMIN_FETCH_GROUP_FAILURED
} from '../constants/adminGroupConstant';



const initialState = []

export default function adminGroupReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_GROUP_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_FETCH_GROUP_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                adminGroup: action.groups
            }
        }
        case ADMIN_FETCH_GROUP_FAILURED: {
            return {
                ...state,
                status: 'failured',
                adminGroup: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}
