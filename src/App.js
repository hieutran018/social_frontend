import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Videos from './pages/videos/Videos';
import Profile from './pages/profile/profile';
import Friend from './pages/friend/Friend';
import FriendSuggestion from './pages/friendsuggestion/FriendSuggestion';
import Auth from './components/auth/auth';


function requireAuth(nextState, replace, next) {
  const { token } = Auth();
  if (!token) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    });
  }
  next();
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path='/video' element={<Videos />} />
      <Route path='/friend' element={<Friend />} onEnter={requireAuth} />
      <Route path='/friend-suggestion' element={<FriendSuggestion />} />
      <Route path='/frofile' element={<Profile />} onEnter={requireAuth} />
    </Routes>
  );
}

export default App;
