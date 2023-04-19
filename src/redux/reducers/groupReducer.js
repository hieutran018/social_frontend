import {
    FETCH_GROUP_STARTED,
    FETCH_GROUP_SUCCEEDED,
    FETCH_GROUP_FAILED,
    CREATE_GROUP,
    UPDATE_GROUP
} from '../constants/groupConstant'

const initialState = []

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GROUP_STARTED: {
            return {
                ...state,

                status: 'loading'
            }
        }
        case FETCH_GROUP_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                groups: action.groups
            }
        }
        case FETCH_GROUP_FAILED: {
            return {
                ...state,
                status: 'failed',
                groups: [],
                error: action.error
            }
        }
        case CREATE_GROUP: {
            return {
                ...state,
                groups: [action.group, ...state.groups]
            }
        }
        case UPDATE_GROUP: {
            return {
                ...state,
                groups: state.groups.map(group => {
                    if (group.id === action.group.id) {
                        return group = action.group
                    } else {
                        return group
                    }
                })
            }
        }
        default:
            return state
    }
}