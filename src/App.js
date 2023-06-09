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


function App() {
  return (
    <Routes>
      <Route path="/login" element={< Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword />} />
      <Route path="/registration" element={<Register />} />
      {/* <Route path="/" element={<ProtectedRoutes children={<Home />} />} /> */}
      {/* <Route path="/home" element={<ProtectedRoutes children={<Home />} />} /> */}
      {/* <Route path='/video' element={<ProtectedRoutes children={<Videos />} />} /> */}
      {/* <Route path='/friend' element={<ProtectedRoutes children={<Friend />} />} /> */}
      {/* <Route path='/friend-suggestion' element={<ProtectedRoutes children={<FriendSuggestion />} />} /> */}
      {/* <Route path='/friend-suggestion/:userId' element={< FriendSuggestion />} /> */}
      {/* <Route path='/friend-request' element={< FriendRequest />} /> */}
      {/* <Route path='/friend-request/:userId' element={< FriendRequest />} /> */}
      {/* <Route path='/userId/:userId' element={<Profile />} /> */}
      {/* <Route path='/userId/:userId/:page' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category/:albumId' element={<Profile />} /> */}
      {/* <Route path='/groups/:pages' element={<Group />} /> */}
      {/* <Route path='/groups/:pages/:groupId' element={<Group />} /> */}
      {/* <Route path='/groups/:pages/:groupId/:groupTab' element={<Group />} /> */}
      <Route path='/search/:result' element={<Search />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/settings/:setting' element={<Settings />} />
      <Route path='/stories/view/:storiesCurrent' element={<StoriesView />} />
      <Route path="/loading" element={<Loading />} />
      //? ==================================================================
      <Route path="/" element={<ProtectedRoutes children={<LayoutUser children={<HomePage />} sidebar={1} rightbar />} />} />
      <Route path="/home" element={<ProtectedRoutes children={<LayoutUser children={<HomePage />} sidebar={1} rightbar />} />} />
      <Route path="/videos" element={<ProtectedRoutes children={<LayoutUser children={<VideoPage />} sidebar={2} />} />} />
      <Route path="/friend" element={<ProtectedRoutes children={<LayoutUser children={<FriendPage />} sidebar={3} />} />} />
      <Route path='/friend-request' element={<LayoutUser children={<FriendRequestPage />} sidebar={4} />} />
      <Route path='/friend-suggestion' element={<LayoutUser children={<FriendSuggestionPage />} sidebar />} />
      <Route path='/friend-request/:userId' element={<LayoutUser children={<FriendRequestPage />} sidebar={4} />} />
      <Route path='/friend-suggestion/:userId' element={<LayoutUser children={<FriendSuggestionPage />} sidebar />} />
      <Route path='/userId/:userId' element={<Profile />} />
      <Route path='/userId/:userId/:page' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category/:albumId' element={<Profile />} />
      <Route path='/groups/:pages' element={<LayoutUser children={<GroupPage />} sidebar={5} />} />
      <Route path='/groups/:pages/:groupId' element={<LayoutUser children={<GroupPage />} sidebar={5} />} />
      <Route path='/groups/:pages/:groupId/:groupTab' element={<LayoutUser children={<GroupPage />} sidebar={5} />} />
      <Route path="/stories/create" element={<ProtectedRoutes children={<LayoutUser children={<StoriesPage />} sidebar={8} />} />} />
      <Route path="/posts/view-post-detail/:postId" element={<ProtectedRoutes children={<LayoutUser children={<ViewPostDetail />} profile />} />} />
      <Route path="/chats/:chatId" element={<ProtectedRoutes children={<LayoutUser children={<ChatPage />} sidebar={10} />} />} />
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
