import {
    FETCH_CHAT_STARTED,
    FETCH_CHAT_SUCCEEDED,
    FETCH_CHAT_FAILED,
} from '../constants/chatConstant';
import axios from 'axios';

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
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-list-chats";
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                }
            }).then((response) => {
                console.log("RES ALBUM", response.data)
                dispatch(fetchChatSucceeded(response.data));


            }).catch((error) => dispatch(fetchChatFailed(error.message)));
        } catch (err) {
            dispatch(fetchChatFailed(err))
        }
    }
}
