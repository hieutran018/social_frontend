import {
    FETCH_MEMBER_STARTED,
    FETCH_MEMBER_SUCCEEDED,
    FETCH_MEMBER_FAILED,
    UPDATE_MEMBER_GROUP,
    REMOVE_MEMBER_GROUP
} from '../constants/memberConstant'

const initialState = []

export default function memberReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBER_STARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case FETCH_MEMBER_SUCCEEDED: {
            return {
                ...state,
                status: 'succeeded',
                members: action.members
            }
        }
        case FETCH_MEMBER_FAILED: {
            return {
                ...state,
                status: 'failed',
                members: [],
                error: action.error
            }
        }
        case UPDATE_MEMBER_GROUP: {
            return {
                ...state,
                members: state.members.map(member => {
                    if (member.id === action.member.id) {
                        return member = action.member
                    } else {
                        return member
                    }
                })
            }
        }
        case REMOVE_MEMBER_GROUP: {
            return {
                ...state,
                members: state.members.filter((member) => (
                    member.user_id !== action.memberId
                ))
            }
        }


        default:
            return state
    }
}