import {
    ADMIN_FETCH_REPORT_STARTED,
    ADMIN_FETCH_REPORT_SUCCESSED,
    ADMIN_FETCH_REPORT_FAILURED
} from '../constants/adminReportConstant';

const initialState = [];

export default function adminReportReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_FETCH_REPORT_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case ADMIN_FETCH_REPORT_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                adminReports: action.reports
            }
        }
        case ADMIN_FETCH_REPORT_FAILURED: {
            return {
                ...state,
                status: 'failured',
                adminReports: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}
