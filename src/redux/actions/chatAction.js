import {
    FETCH_CHAT_STARTED,
    FETCH_CHAT_SUCCEEDED,
    FETCH_CHAT_FAILED,
} from '../constants/chatConstant';
import axios from 'axios';
import { requestDev } from '../../components/auth/auth';

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

export const fetchChat = (cookies) => {
    return async dispatch => {
        try {
            dispatch(fetchChatStarted())
            // const requestURL = "https://ckcsocial.site/api/v1/fetch-list-chats";
            requestDev.get('/v1/fetch-list-chats', {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                }
            }).then((response) => {
                console.log("CHAT LIST", response.data)
                dispatch(fetchChatSucceeded(response.data));
            }).catch((error) => dispatch(fetchChatFailed(error.message)));
        } catch (err) {
            dispatch(fetchChatFailed(err))
        }
    }
}
