import {
    FETCH_CHAT_STARTED,
    FETCH_CHAT_SUCCEEDED,
    FETCH_CHAT_FAILED,
    CREATE_CHAT,
    UPDATE_NAME_GROUP_CHAT_STARTED,
    UPDATE_NAME_GROUP_CHAT_END
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
        case CREATE_CHAT: {
            return {
                ...state,
                chats: [action.chat, ...state.chats]
            }
        }
        case UPDATE_NAME_GROUP_CHAT_STARTED: {
            return {
                ...state,
                updateStatus: 'updating',
            }
        }
        case UPDATE_NAME_GROUP_CHAT_END: {
            return {
                ...state,
                updateStatus: 'updated',
                chats: state.chats.map(chat => {
                    if (chat.id === action.chat.id) {
                        return chat = action.chat
                    } else {
                        return chat
                    }
                })
            }
        }
        default:
            return state
    }
}