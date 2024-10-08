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


const PrivateRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn,"app.private")
  const token = sessionStorage.getItem('token');  // Fallback to sessionStorage

  if (isLoggedIn || token) {
    return element;
  } else {
    return <Navigate to="/Login" />;
  }
};


function App() {

  const dispatch = useDispatch()
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const token = sessionStorage.getItem('token')
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    // Check if token exists and dispatch login
    if (token && user) {
      dispatch(login(user)); // Update Redux store to reflect that user is logged in
      console.log('hellonfrom app.js')
    }
    else {
      dispatch(logout())
    }
  }, [dispatch, token]);

  useSessionTimeout() //logout session after 5mins

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Home />} />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Recommendations' element={<PrivateRoute element={<Recommendations />} />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
