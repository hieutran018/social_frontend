import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Videos from './pages/videos/Videos';
// import Profile from './pages/profile/profile';
import Friend from './pages/friend/Friend';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path='/video' element={<Videos />} />
      <Route path='/friend' element={<Friend />} />
    </Routes>
  );
}

export default App;
