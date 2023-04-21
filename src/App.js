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
// import ProtectedRoutes from './components/protectedroute/protectedroute';
import FriendRequest from './pages/friendrequest/friendrequest';
import Search from './pages/search/search';






function App() {


  return (

    <Routes>
      <Route path="/login" element={< Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path='/video' element={<Videos />} />
      <Route path='/friend' element={<Friend />} />
      <Route path='/friend-suggestion' element={< FriendSuggestion />} />
      <Route path='/friend-suggestion/:userId' element={< FriendSuggestion />} />
      <Route path='/friend-request' element={< FriendRequest />} />
      <Route path='/friend-request/:userId' element={< FriendRequest />} />
      <Route path='/:userId' element={<Profile />} />
      <Route path='/:userId/:page' element={<Profile />} />
      <Route path='/:userId/:page/:category' element={<Profile />} />
      <Route path='/:userId/:page/:category/:albumId' element={<Profile />} />
      <Route path='/groups/:pages' element={<Group />} />
      <Route path='/groups/:pages/:groupId' element={<Group />} />
      <Route path='/groups/:pages/:groupId/:groupTab' element={<Group />} />
      <Route path='/search/:result' element={<Search />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  );
}

export default App;
