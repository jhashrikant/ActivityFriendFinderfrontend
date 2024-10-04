import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import useSessionTimeout from './hooks/useSessionTimeout';
import Recommendations from './Components/Recommendations/Recommendations';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { login, logout } from './redux/slices/authSlice';


function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    // Check if token exists and dispatch login
    if (token) {
      dispatch(login()); // Update Redux store to reflect that user is logged in
    }
    else{
      dispatch(logout())
    }
  }, [dispatch, token]);

  useSessionTimeout() ///logut session after 5mins

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to={"/Login"} />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Recommendations' element={<Recommendations />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
