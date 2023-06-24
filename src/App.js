import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import ForgetPassword from './pages/forgetpassword/forgetpassword';
import ConfirmForgotPassword from './pages/forgetpassword/confrimforgetpassword';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Videos from './pages/videos/Videos';
import Profile from './pages/profile/profile';
import Friend from './pages/friend/Friend';
import FriendSuggestion from './pages/friendsuggestion/FriendSuggestion';
import Group from './pages/groups/group';
import Loading from './components/loading/Loading';
import ProtectedRoutes from './components/protectedroute/protectedroute';
import FriendRequest from './pages/friendrequest/friendrequest';
import Search from './pages/search/search';
import Settings from './pages/setting/setting';
import StoriesPage from './pages/storiespage/storiespage';
import StoriesView from './pages/storiespage/storieview/storiesview';
import AdminLogin from './admin/pages/login/login';
import LayoutAdmin from './admin/pages/layout';
import Dashboard from './admin/components/dashboard/dashboard';
import UserManagement from './admin/components/usermanagement/usermanagement';
import PostsManagement from './admin/components/postsmanagement/postsmanagement';
import PostStatus from './admin/components/poststatusmanagement/poststatusmanagement';
import CreatePostStatus from './admin/components/createpoststatus/createpoststatus';
import EditPostStatus from './admin/components/editpoststatus/editpoststatus';
import AdminProfile from './admin/components/profile/profile';
import GroupManagement from './admin/components/groupmanagement/groupmanagement';
import StoryManagement from './admin/components/storymanagement/storymanagement';
import ReportManagement from './admin/components/reportmanagement/reportmanagement';
import HomePage from './pages/homePage/homePage';
import LayoutUser from './pages/layout';
import FriendPage from './pages/friendPage/friendPage';
import FriendRequestPage from './pages/friendRequestPage/friendRequestPage';
import FriendSuggestionPage from './pages/friendSuggestionPage/friendSuggestionPage';
import GroupPage from './pages/groupPage/groupPage';
import VideoPage from './pages/videoPage/videoPage';
import ViewPostDetail from './components/viewpostdetail/viewpostdetail';
import ChatPage from './pages/chatPage/chatPage';
import Pusher from 'pusher-js';
import SettingPage from './pages/settingPage/settingPage';
import { app, analytics } from './firebase/firebaseconfig';

const newapp = app;
const newanalytics = analytics;
function App() {
  const pusher = new Pusher('4eea52e19a1b86509eb3', {
    cluster: 'ap1',
    encrypted: true
  });

  return (
    <Routes>
      <Route path="/login" element={< Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword />} />
      <Route path="/registration" element={<Register />} />
      <Route path='/search/:result' element={<Search />} />
      {/* <Route path='/settings' element={<Settings />} /> */}
      {/* <Route path='/settings/:setting' element={<Settings />} /> */}
      <Route path='/stories/view/:storiesCurrent' element={<StoriesView />} />
      <Route path="/loading" element={<Loading />} />
      //? ==================================================================
      <Route path="/" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<HomePage />} sidebar={1} rightbar />} />} />
      <Route path="/home" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<HomePage />} sidebar={1} rightbar />} />} />
      <Route path="/videos" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<VideoPage />} sidebar={2} />} />} />
      <Route path="/friend" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<FriendPage />} sidebar={3} />} />} />
      <Route path='/friend-request' element={<LayoutUser pusher={pusher} children={<FriendRequestPage />} sidebar={4} />} />
      <Route path='/friend-suggestion' element={<LayoutUser pusher={pusher} children={<FriendSuggestionPage />} sidebar />} />
      <Route path='/friend-request/:userId' element={<LayoutUser children={<FriendRequestPage />} sidebar={4} />} />
      <Route path='/friend-suggestion/:userId' element={<LayoutUser pusher={pusher} children={<FriendSuggestionPage />} sidebar />} />
      <Route path='/userId/:userId' element={<Profile pusher={pusher} />} />
      <Route path='/userId/:userId/:page' element={<Profile pusher={pusher} />} />
      <Route path='/userId/:userId/:page/:category' element={<Profile pusher={pusher} />} />
      <Route path='/userId/:userId/:page/:category/:albumId' element={<Profile pusher={pusher} />} />
      <Route path='/groups/:pages' element={<LayoutUser pusher={pusher} children={<GroupPage />} sidebar={5} />} />
      <Route path='/groups/:pages/:groupId' element={<LayoutUser pusher={pusher} children={<GroupPage />} sidebar={5} />} />
      <Route path='/groups/:pages/:groupId/:groupTab' element={<LayoutUser pusher={pusher} children={<GroupPage />} sidebar={5} />} />
      <Route path="/stories/create" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<StoriesPage />} sidebar={8} />} />} />
      <Route path="/posts/view-post-detail/:postId" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<ViewPostDetail />} profile />} />} />
      <Route path="/chats/:userId" element={<ProtectedRoutes children={<LayoutUser pusher={pusher} children={<ChatPage pusher={pusher} />} sidebar={10} />} />} />
      <Route path='/settings' element={<LayoutUser pusher={pusher} children={<SettingPage />} sidebar={7} />} />
      <Route path='/settings/:setting' element={<LayoutUser pusher={pusher} children={<SettingPage />} sidebar={7} />} />
      //? ==================================================================
      <Route path="/admin/login" element={< AdminLogin />} />
      <Route path='/admin/dashboard' element={< LayoutAdmin children={<Dashboard />} />} />
      <Route path='/admin/users' element={<LayoutAdmin children={<UserManagement />} />} />
      <Route path='/admin/users/detail-user/:userId' element={<LayoutAdmin children={<UserManagement />} />} />
      <Route path='/admin/posts' element={<LayoutAdmin children={<PostsManagement />} />} />
      <Route path='/admin/posts/detail-post/:postId' element={<LayoutAdmin children={<PostsManagement />} />} />
      <Route path='/admin/post-status' element={<LayoutAdmin children={<PostStatus />} />} />
      <Route path='/admin/post-status/create-post-status' element={<LayoutAdmin children={<CreatePostStatus />} />} />
      <Route path='/admin/post-status/edit-post-status/:statusId' element={<LayoutAdmin children={<EditPostStatus />} />} />
      <Route path='/admin/profile' element={<LayoutAdmin children={<AdminProfile />} />} />
      <Route path='/admin/groups' element={<LayoutAdmin children={<GroupManagement />} />} />
      <Route path='/admin/groups/detail-group/:groupId' element={<LayoutAdmin children={<GroupManagement />} />} />
      <Route path='/admin/stories' element={<LayoutAdmin children={<StoryManagement />} />} />
      <Route path='/admin/reports' element={<LayoutAdmin children={<ReportManagement />} />} />
      <Route path='/admin/reports/detail-report/:reportId' element={<LayoutAdmin children={<ReportManagement />} />} />

    </Routes>
  );
}

export default App;
