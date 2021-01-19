import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap'
import axios from 'axios'

const logout = () => {
   localStorage.clear()
   window.location.replace('/')
}

const Profile = () => {
   const [profile, setprofile] = useState([])
   
   useEffect(() => {
      const userId = localStorage.userId
      const getUser = async () => {
         await axios.post('http://103.75.200.45:8088/getuserdetail/' + userId)
            .then(res => {
               setprofile(res.data)
            })
            .catch(err => {
               console.log(err)
            })
      }
      getUser()
   }, [])

   return (
      <React.Fragment>
         <div className="profileContainer" style={{ minWidth: 400, position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
               <img className={'profileImg'} src={'https://media.idownloadblog.com/wp-content/uploads/2018/11/iPad-Pro-11-advertising-wallpaper-5-dark-pink-AR72014.jpg'} alt="profile" />
            </div>
            <h1 className="profileName" style={{ textAlign: 'center' }}>{profile.name}</h1>
            <Form>
               {/* <Form.Group controlId="age">
                  <Form.Label><strong>Age</strong>:</Form.Label>
               </Form.Group> */}
               <div style={{ border: '1px solid #ccc', padding: 20, paddingBottom: 0, marginBottom: 20, borderRadius: 5 }}>
                  <Form.Group controlId="telephone">
                     <Form.Label><strong>Telephone</strong>: {profile.phone}</Form.Label>
                  </Form.Group>
                  <Form.Group controlId="email">
                     <Form.Label><strong>Email Address</strong>: {profile.email}</Form.Label>
                  </Form.Group>
               </div>
               <div style={{ paddingLeft: 20 }}>
                  {/* <Form.Group controlId="editProfile" style={{ marginBottom: '0.5rem' }}>
                     <Link to={''}><Form.Label style={{ cursor: 'pointer' }}>Edit Profile</Form.Label></Link>
                  </Form.Group> */}
                  <Form.Group controlId="changePassword" style={{ marginBottom: '0.5rem' }}>
                     <Link to={'/changepass'}><Form.Label style={{ cursor: 'pointer' }}>Change Password</Form.Label></Link>
                  </Form.Group>
                  <Form.Group controlId="logout">
                     <Form.Label onClick={logout}><strong style={{ color: '#ff0000', cursor: 'pointer' }}>Log Out</strong></Form.Label>
                  </Form.Group>
               </div>
            </Form>

         </div>
      </React.Fragment>
   )
}

export default Profile