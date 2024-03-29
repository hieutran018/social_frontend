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
import postHistoryReducer from './reducers/postHistoryReducer'
import adminReportReducer from './admin/reducers/adminReportReducer'
import commentReducer from './reducers/commentReducer'
import chatReducer from './reducers/chatReducer'
// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        posts: postReducer,
        comments: commentReducer,
        users: userReducer,
        groups: groupReducer,
        albums: albumReducer,
        mediafiles: mediafileReducer,
        members: memberReducer,
        stories: storiesReducer,
        chats: chatReducer,
        postHistories: postHistoryReducer,
        adminUsers: adminUserReducer,
        dashboard: adminDashboardReducer,
        adminPosts: adminPostReducer,
        adminGroup: adminGroupReducer,
        adminFAA: adminFeelAndActivityReducer,
        adminReports: adminReportReducer
    }
})

export default store