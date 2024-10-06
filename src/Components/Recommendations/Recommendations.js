import React, { useEffect, useState } from 'react'
import styles from "./Recommendations.module.css"
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { API_URL } from '../../helpers/utils'

const Recommendations = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log(isLoggedIn)
  // const isLoggedIn = sessionStorage.getItem('token')

  // useEffect(() => {
  //   console.log(isLoggedIn)
  //   if (!isLoggedIn) {
  //     navigate('/Login')
  //   }
  // }, [])

  // console.log("isLoggedIn",isLoggedIn)
  // // const dispatch = useDispatch()
  // // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // // console.log(isLoggedIn)
  // // const token = sessionStorage.getItem('token')

  // // useEffect(() => {
  // //   // Check if token exists and dispatch login
  // //   if (!isLoggedIn) {
  // //     navigate('/Login')
  // //   }

  // }, [isLoggedIn]);


  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user object

        // Check if user is retrieved and has an _id
        if (!user || !user._id) {
          toast.error("Please login")
          return
        }

        const response = await fetch(`${API_URL}/findnearbyfriends/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json()
        if (response.ok) {
          console.log(result);
          setRecommendations(result.matches)
          setLoading(false)
        }
        else {
          toast.error(result.message)
          setLoading(false)
        }
      } catch (error) {
        console.log(error.message || "errorblock")
        toast.error("An expected error occured . Please try again!")
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={styles.recommendationscontainer}>
      <h2>Nearby Friends</h2>
      {recommendations.length === 0 ? (
        <p>No friends found nearby.</p>
      ) : (
        <div className={styles.recommendationsgrid}>
          {recommendations.map((friend, index) => (
            <div key={index} className={styles.recommendationcard}>
              <div className={styles.recommendationavatar}>
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 10}`}
                  alt="friendavatar"
                />
              </div>
              <div className={styles.recommendationinfo}>
                <h3>User ID: {friend.userId}</h3>
                <p>Shared Activities: {friend.sharedActivities.join(', ')}</p>
                <p>Distance: {friend.distance} km away</p>
                <p style={{fontWeight:'500'}}>Name: {friend.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default Recommendations
