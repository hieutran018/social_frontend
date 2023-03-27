import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postReducer'


// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        posts: postReducer,


    }
})

export default store