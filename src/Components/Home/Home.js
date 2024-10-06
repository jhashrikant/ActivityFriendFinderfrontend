import React, { useEffect } from 'react'
import styles from "./Home.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { ActivitiesOfInterest } from '../../helpers/utils';

const Home = () => {
  

  // const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log(isLoggedIn)
  //   const token = sessionStorage.getItem('token')

  //   useEffect(() => {
  //     // Check if token exists and dispatch login
  //     if (token) {
  //       dispatch(login()); // Update Redux store to reflect that user is logged in
  //     }
  //   }, [dispatch, token]);

  // const dispatch = useDispatch()
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // // const token = sessionStorage.getItem('token')

  // useEffect(() => {
  //   // Check if token exists and dispatch login
  //   if (!isLoggedIn) {
  //     navigate('/Login')
  //     return;
  //   }

  // }, [isLoggedIn]);

  const navigate = useNavigate()
  return (
    <>
      <main>
        <section className={styles.hero}>
          <h1>Find Your Perfect Activity Partner!</h1>
          <p>Connect with like-minded individuals for fun activities.</p>
          <button onClick={() => navigate('/Login')} className="cta-button">Get Started</button>
        </section>
        <section className={styles.howitworks}>
          <h2>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <h3>Step 1: Sign Up</h3>
              <p>Create an account and choose activities.</p>
            </div>
            <div className={styles.step}>
              <h3>Step 2: Find Friends</h3>
              <p>Get matched with nearby users with similar interests.</p>
            </div>
            <div className={styles.step}>
              <h3>Step 3: Join Activities</h3>
              <p>Participate in activities and meet new friends.</p>
            </div>
          </div>
        </section>
        <section className={styles.featuredactivities}>
          <h2>Featured Activities</h2>
          <div className={styles.activitycards}>
            {ActivitiesOfInterest?.map(({ activity, id }) => {
              return (
                <div key={id} className={styles.activitycard}>{activity}</div>
              )
            })}
          </div>
        </section>
        <section className={styles.testimonials}>
          <h2>User Testimonials</h2>
          <blockquote>"This app helped me find great friends!" - User 1</blockquote>
          <blockquote>"I love hiking with new pals!" - User 2</blockquote>
        </section>
      </main>
    </>
  )
}

export default Home
