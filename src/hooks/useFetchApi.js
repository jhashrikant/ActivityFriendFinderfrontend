// import React from 'react'

// const useFetchApi = async (url) => {

//   try {
//     const response = await fetch(`${API_URL}/Login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await response.json()
//     console.log(data);
//     if (response.ok) {
//       // toast.success('Logged In successfully ');
//       sessionStorage.setItem("token", data.token);
//       sessionStorage.setItem("user", JSON.stringify(data.user))
//       setLoading(false)
//       //upate the redux store
//       dispatch(login(data.user))
//       setTimeout(() => {
//         navigate('/Recommendations'); // Redirect to Recommendations
//       }, 2000);

//     } else {
//       toast.error(data.message);
//       setLoading(false)
//     }
//   } catch (error) {
//     console.error(error.message);
//     toast.error(error.message || "An unexpected error occured . Please Try again!")
//     setLoading(false)
//   }





//  return null
// }

// export default useFetchApi
