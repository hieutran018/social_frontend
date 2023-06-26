import {
    FETCH_STORIES_STARTED,
    FETCH_STORIES_SUCCESSED,
    FETCH_STORIES_FAILED
} from '../constants/storiesConstant';
import { baseURL } from '../../components/auth/auth';

export const fetchStoriesStarted = () => ({
    type: FETCH_STORIES_STARTED
})

export const fetchStoriesSuccessed = (stories) => ({
    type: FETCH_STORIES_SUCCESSED,
    stories
})
export const fetchStoriesFailed = (errors) => ({
    type: FETCH_STORIES_FAILED,
    errors
})

export const fetchStories = (cookies) => {
    return async dispatch => {
        try {
            dispatch(fetchStoriesStarted());
            // const requestURL = 'https://ckcsocial.site/api/v1/stories';
            baseURL.get('/api/v1/stories', {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchStoriesSuccessed(response.data));
            }).catch((error) => {
                console.log(error);
                dispatch(fetchStoriesFailed(error));
            })
        } catch (error) {
            console.log(error);
            dispatch(fetchStoriesFailed(error));
        }
    }
}
