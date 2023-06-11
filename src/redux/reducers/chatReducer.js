import {
    FETCH_CHAT_STARTED,
    FETCH_CHAT_SUCCEEDED,
    FETCH_CHAT_FAILED,
} from '../constants/chatConstant'

const initialState = []

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CHAT_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_CHAT_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                chats: action.chats
            }
        }
        case FETCH_CHAT_FAILED: {
            return {
                ...state,
                status: 'failed',
                chats: [],
                error: action.error
            }
        }
        default:
            return state
    }
}