import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'




// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        posts: postReducer,
        users: userReducer,



    }
})

export default store