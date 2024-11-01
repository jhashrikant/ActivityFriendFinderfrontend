import React, { Fragment, useState } from 'react'
import styles from "./Login.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { API_URL } from '../../helpers/utils';
const Login = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  // const isLoggedIn = sessionStorage.getItem('token')
  console.log(isLoggedIn)
  // console.log(isLoggedIn);

  const user = useSelector((state) => state.auth)
  console.log("user", user)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const handleFormChange = (event) => {
    setFormData((prevformdata) => {
      return {
        ...prevformdata,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      console.log(data);
      if (response.ok) {
        // toast.success('Logged In successfully ');
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user))
        setLoading(false)
        //upate the redux store
        dispatch(login(data.user))
        setTimeout(() => {
          navigate('/Recommendations'); // Redirect to Recommendations
        }, 2000);

      } else {
        toast.error(data.message);
        setLoading(false)
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message || "An unexpected error occured . Please Try again!")
      setLoading(false)
    }
  }

  return (
    <Fragment>
      {/* <h2 className={styles.Loginheading}>Login to your account</h2> */}
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h2 className={styles.title}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='email'>Email</label>
              <input
                value={formData.email}
                onChange={handleFormChange}
                id='email'
                name='email'
                type='email'
                required
                className={styles.input}
                aria-required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password'>Password</label>
              <input
                value={formData.password}
                onChange={handleFormChange}
                id='password'
                name='password'
                type='password'
                required
                className={styles.input}
                aria-required
              />
            </div>
            <button data-testid="submitBtn" disabled={loading} aria-disabled className={styles.submitButton}>{loading ? "Logging in..." : "Login"}</button>
          </form>
        </div>
      </div>
      <Toaster />
    </Fragment>
  )
}

export default Login

