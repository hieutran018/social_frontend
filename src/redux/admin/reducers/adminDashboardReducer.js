import {
    ADMIN_DASHBOARD_FETCH_STARTED,
    ADMIN_DASHBOARD_FETCH_SUCCESSED,
    ADMIN_DASHBOARD_FETCH_FAILURED
} from '../constants/adminDashboardConstant';

const initialState = []

export default function adminDashboardReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_DASHBOARD_FETCH_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_DASHBOARD_FETCH_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                dashboard: action.dashboard
            }
        }
        case ADMIN_DASHBOARD_FETCH_FAILURED: {
            return {
                ...state,
                status: 'failured',
                dashboard: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}