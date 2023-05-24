import { configureStore } from '@reduxjs/toolkit'

import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import groupReducer from './reducers/groupReducer'
import albumReducer from './reducers/albumReducer'
import mediafileReducer from './reducers/mediafileReducer'
import memberReducer from './reducers/memberReducer'
import storiesReducer from './reducers/storiesReducer'
import adminUserReducer from './admin/reducers/adminUserReducer'
import adminDashboardReducer from './admin/reducers/adminDashboardReducer'
import adminPostReducer from './admin/reducers/adminPostReducer'
import adminGroupReducer from './admin/reducers/adminGroupReducer'
import adminFeelAndActivityReducer from './admin/reducers/adminFeelAndActivityReducer'
// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        posts: postReducer,
        users: userReducer,
        groups: groupReducer,
        albums: albumReducer,
        mediafiles: mediafileReducer,
        members: memberReducer,
        stories: storiesReducer,
        adminUsers: adminUserReducer,
        dashboard: adminDashboardReducer,
        adminPosts: adminPostReducer,
        adminGroup: adminGroupReducer,
        adminFAA: adminFeelAndActivityReducer,
    }
})

export default store