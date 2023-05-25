import {
    ADMIN_FETCH_FAA_STARTED,
    ADMIN_FETCH_FAA_SUCCESSED,
    ADMIN_FETCH_FAA_FAILURED,
    ADMIN_CREATE_FAA
} from '../../admin/constants/adminFeelAndActivityConstant';

const initialState = [];

export default function adminFeelAndActivityReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_FAA_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_FETCH_FAA_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                adminFAA: action.faas
            }
        }
        case ADMIN_FETCH_FAA_FAILURED: {
            return {
                ...state,
                status: 'failured',
                adminFAA: [],
                error: action.errors
            }
        }
        case ADMIN_CREATE_FAA: {
            return {
                ...state,
                adminFAA: [...state.adminFAA, ...action.faa]
            }
        }
        default:
            return state
    }
}
