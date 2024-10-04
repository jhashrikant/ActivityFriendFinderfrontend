import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const useSessionTimeout = () => {
  const navigate = useNavigate()
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = sessionStorage.getItem('token')
  console.log(isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId;

    if (isLoggedIn) {
      timeoutId = setTimeout(() => {
        dispatch(logout());//update redux store
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        toast.error("session has been timedout .Please login again");
        navigate('/Login')
      }, 5 * 60 * 1000); // 5 minutes
    }

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [isLoggedIn, dispatch]);
};

export default useSessionTimeout;
