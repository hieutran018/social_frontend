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

function App() {
  return (
    <Routes>
      <Route path="/login" element={< Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes children={<Home />} />} />
      <Route path="/home" element={<ProtectedRoutes children={<Home />} />} />
      <Route path='/video' element={<ProtectedRoutes children={<Videos />} />} />
      <Route path='/friend' element={<ProtectedRoutes children={<Friend />} />} />
      <Route path='/friend-suggestion' element={<ProtectedRoutes children={<FriendSuggestion />} />} />
      <Route path='/friend-suggestion/:userId' element={< FriendSuggestion />} />
      <Route path='/friend-request' element={< FriendRequest />} />
      <Route path='/friend-request/:userId' element={< FriendRequest />} />
      <Route path='/userId/:userId' element={<Profile />} />
      <Route path='/userId/:userId/:page' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category' element={<Profile />} />
      <Route path='/userId/:userId/:page/:category/:albumId' element={<Profile />} />
      <Route path='/groups/:pages' element={<Group />} />
      <Route path='/groups/:pages/:groupId' element={<Group />} />
      <Route path='/groups/:pages/:groupId/:groupTab' element={<Group />} />
      <Route path='/search/:result' element={<Search />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/settings/:setting' element={<Settings />} />
      <Route path='/stories/create' element={<StoriesPage />} />
      <Route path='/stories/view/:storiesCurrent' element={<StoriesView />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/admin/login" element={< AdminLogin />} />
      <Route path='/admin/dashboard' element={< LayoutAdmin children={<Dashboard />} />} />
      <Route path='/admin/users' element={<LayoutAdmin children={<UserManagement />} />} />
      <Route path='/admin/users/detail-user/:userId' element={<LayoutAdmin children={<UserManagement />} />} />
    </Routes>
  );
}

export default App;
