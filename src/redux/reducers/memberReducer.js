import {
    FETCH_MEMBER_STARTED, FETCH_MEMBER_SUCCEEDED, FETCH_MEMBER_FAILED
} from '../constants/memberConstant'

const initialState = []

export default function memberReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBER_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_MEMBER_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                members: action.members
            }
        }
        case FETCH_MEMBER_FAILED: {
            return {
                ...state,
                status: 'failed',
                members: [],
                error: action.error
            }
        }


        default:
            return state
    }
}