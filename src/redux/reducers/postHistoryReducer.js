import {
    FETCH_POSTHISTORY_STARTED,
    FETCH_POSTHISTORY_SUCCEEDED,
    FETCH_POSTHISTORY_FAILED
} from '../constants/postHistoryConstant';

const initialState = [];


export default function postHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTHISTORY_STARTED: {
            return {
                ...state,
                status: 'loading',
                postHistories: []
            }
        }
        case FETCH_POSTHISTORY_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                postHistories: [...state.postHistories, ...action.histories]
            }
        }
        case FETCH_POSTHISTORY_FAILED: {
            return {
                ...state,
                status: 'failed',
                postHistories: [],
                error: action.error
            }
        }
        default: return state
    }
}