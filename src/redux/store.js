import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import groupReducer from './reducers/groupReducer'
import albumReducer from './reducers/albumReducer'
import mediafileReducer from './reducers/mediafileReducer'
import memberReducer from './reducers/memberReducer'




// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        posts: postReducer,
        users: userReducer,
        groups: groupReducer,
        albums: albumReducer,
        mediafiles: mediafileReducer,
        members: memberReducer


    }
})

export default store