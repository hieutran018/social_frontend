import {
    FETCH_ALBUM_STARTED,
    FETCH_ALBUM_SUCCEEDED,
    FETCH_ALBUM_FAILED,
    CREATE_ALBUM
} from '../constants/albumConstant'

const initialState = []

export default function albumReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALBUM_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_ALBUM_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                albums: action.albums
            }
        }
        case FETCH_ALBUM_FAILED: {
            return {
                ...state,
                status: 'failed',
                albums: [],
                error: action.error
            }
        }
        case CREATE_ALBUM: {
            return {
                ...state,
                albums: [action.album, ...state.albums]
            }
        }

        default:
            return state
    }
}