import {
    FETCH_CHAT_STARTED,
    FETCH_CHAT_SUCCEEDED,
    FETCH_CHAT_FAILED,
    CREATE_CHAT,
    UPDATE_NAME_GROUP_CHAT_STARTED,
    UPDATE_NAME_GROUP_CHAT_END
} from '../constants/chatConstant';
import { baseURL } from '../../components/auth/auth';

export const fetchChatStarted = () => ({
    type: FETCH_CHAT_STARTED
})
export const fetchChatSucceeded = chats => ({
    type: FETCH_CHAT_SUCCEEDED,
    chats
})
export const fetchChatFailed = error => ({
    type: FETCH_CHAT_FAILED,
    error
})

export const createChat = chat => ({
    type: CREATE_CHAT,
    chat
})
export const updateNameGroupChatStart = chat => ({
    type: UPDATE_NAME_GROUP_CHAT_STARTED,
    chat
})

export const updateNameGroupChat = chat => ({
    type: UPDATE_NAME_GROUP_CHAT_END,
    chat
})

export const fetchChat = (cookies) => {
    return async dispatch => {
        try {
            dispatch(fetchChatStarted())
            // const requestURL = "https://ckcsocial.site/api/v1/fetch-list-chats";
            baseURL.get('/api/v1/fetch-list-chats', {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                }
            }).then((response) => {
                console.log("CHAT LIST", response.data)
                dispatch(fetchChatSucceeded(response.data));
            }).catch((error) => {
                dispatch(fetchChatFailed(error.message));
                console.log(error);
            });
        } catch (err) {
            dispatch(fetchChatFailed(err))
        }
    }
}
export const createChatRoom = (conversation) => {
    return async dispatch => {
        console.log('REDUX CREATE CHAT', conversation);
        dispatch(createChat(conversation));
    }
}

export const updateNameGroupChats = (cookies, conversationId, conversationName) => {
    return async dispatch => {
        try {
            dispatch(updateNameGroupChatStart())
            // const requestURL = "https://ckcsocial.site/api/v1/fetch-list-chats";
            baseURL.post('/api/v1/chats/update-name-group-chat', {
                conversationId: conversationId,
                conversationName: conversationName
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                }
            }).then((response) => {

                dispatch(updateNameGroupChat(response.data));
            }).catch((error) => {
                console.log(error);
            });
        } catch (err) {
            console.log(err);
        }
    }
}
