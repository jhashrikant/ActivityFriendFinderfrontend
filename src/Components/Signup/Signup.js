import React, { useEffect, useState } from 'react'
import styles from "./Signup.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ActivitiesOfInterest = [
  {
    id: 1,
    activity: "Swimming"
  },
  {
    id: 2,
    activity: "Hiking"
  },
  {
    id: 3,
    activity: "Cricket"
  },
  {
    id: 4,
    activity: "Hockey"
  },
  {
    id: 5,
    activity: "Football"
  }
]

const Signup = () => {

  const API_URL = "http://localhost:3001" || process.env.REACT_APP_API_BASE_URL
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  // const [Error, setError] = useState("")
  const [selectedActivities, setSelectedActivities] = useState([])

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleAcivityChange = (activity) => {
    setSelectedActivities((prevactivities) => {
      if (prevactivities.includes(activity)) {
        return prevactivities.filter((activities) => activities !== activity)
      }
      else {
        return [...prevactivities, activity]
      }
    })
  }

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

    if (!formData.name || !formData.email || !formData.password || selectedActivities.length === 0) {
      // setError('All fields are required!');
      toast.error("All fields are required!")
      return;
    }
    setLoading(true)
    // console.log(selectedActivities)
    // console.log(formData)
    console.log(location)
    const combinedData = {
      name: formData?.name,
      email: formData?.email,
      password: formData?.password,
      activities: selectedActivities,
      location: {
        type: "Point", // GeoJSON type
        coordinates: [location.longitude, location.latitude], // [longitude, latitude]
      },
    };
    console.log(combinedData)
    try {
      const response = await fetch(`${API_URL}/Signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message)
        setLoading(false)
        setTimeout(() => {
          navigate('/Login');
        }, 2000); // 2 seconds delay
      } else {
        toast.error(data.message);
        setLoading(false)
      }
    }
    catch (error) {
      console.error(error.message);
      toast.error(error.message || "An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.form__container}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              value={formData.name}
              onChange={handleFormChange}
              id='name'
              name='name'
              type='text'
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              value={formData.email}
              onChange={handleFormChange}
              id='email'
              name='email'
              type='email'
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              value={formData.password}
              onChange={handleFormChange}
              id='password'
              name='password'
              type='password'
              className={styles.input}
            />
          </div>
          <div className={styles.checkboxcontainer}>
            <label>Activities of interest:</label>
            {ActivitiesOfInterest.map(({ id, activity }) => (
              <div key={id} className={styles.checkboxlabel}>
                <input
                  id={id}
                  type='checkbox'
                  value={activity}
                  checked={selectedActivities.includes(activity)}
                  onChange={() => handleAcivityChange(activity)}
                />
                <label htmlFor={id}>{activity}</label>
              </div>
            ))}
          </div>
          <button disabled={loading} className={styles.button}>{loading ? "Signing up..." : "Signup"}</button>
        </div>
        <Toaster />
      </form>
    </div>
  )
}

export default Signup
