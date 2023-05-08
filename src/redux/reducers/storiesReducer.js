import {
    FETCH_STORIES_STARTED,
    FETCH_STORIES_SUCCESSED,
    FETCH_STORIES_FAILED
} from '../constants/storiesConstant';

const initialState = [];
export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STORIES_STARTED: {
            return {
                ...state,
                stories: [],
                status: 'loading',
            }
        }
        case FETCH_STORIES_SUCCESSED: {
            return {
                ...state,
                status: 'successed',
                stories: action.stories,
            }
        }
        case FETCH_STORIES_FAILED: {
            return {
                ...state,
                status: 'failed',
                stoies: [],
                error: action.errors
            }
        }
        default:
            return state
    }
}