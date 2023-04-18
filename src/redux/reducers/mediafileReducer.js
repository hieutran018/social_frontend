import {
    FETCH_MEDIAFILE_STARTED,
    FETCH_MEDIAFILE_SUCCEEDED,
    FETCH_MEDIAFILE_FAILED
} from '../constants/mediafileConstant'

const initialState = []

export default function mediafileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEDIAFILE_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_MEDIAFILE_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                mediafiles: action.mediafiles
            }
        }
        case FETCH_MEDIAFILE_FAILED: {
            return {
                ...state,
                status: 'failed',
                mediafiles: [],
                error: action.error
            }
        }


        default:
            return state
    }
}