import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import '../../assets/css/MainStyle.css'

const ChangePassword = () => {
   const [message, setMessage] = useState(null)
   const [oldPassword, setOldPassword] = useState()
   const [newPassword, setNewPassword] = useState()
   const [cfPassword, setCfPassword] = useState()

   const onChangeOldPassword = (e) => {
      setOldPassword(e.currentTarget.value);
   }
   const onChangeNewPassword = (e) => {
      setNewPassword(e.currentTarget.value);
   }
   const onChangeCfPassword = (e) => {
      setCfPassword(e.currentTarget.value);
   }

   useEffect(() => {
      console.log('oldPassword is', oldPassword)
      console.log('newPassword is', newPassword)
      console.log('cfPassword is', cfPassword)
      console.log('------------------------------')
   }, [newPassword, cfPassword, oldPassword])

   const doChanged = (event) => {
      event.preventDefault()
      if (newPassword === cfPassword) {
         console.log('newPassword=cfPassword')
         axios.post('http://103.75.200.45:8088/changepass', {
            email: localStorage.email,
            password: oldPassword,
            newpassword: newPassword
         }).then(res => {
            console.log(res)
            alert('Change Password Success!')
            window.location.replace('/profile')
         }).catch(err => {
            console.log(err)
         })
      }
      else {
         setMessage('Password do not match')
      }
   }
   return (
      <div className="profileContainer" style={{ minWidth: 400, position: 'relative' }}>
         <div style={{ textAlign: 'center' }}>
            <img className={'profileImg'} src={'https://media.idownloadblog.com/wp-content/uploads/2018/11/iPad-Pro-11-advertising-wallpaper-5-dark-pink-AR72014.jpg'} alt="profile" />
         </div>
         <h1 className="profileName" style={{ textAlign: 'center' }}>{localStorage.currentUser}</h1>
         <Form onSubmit={doChanged}>
            <Form.Group controlId="oldPassword">
               <Form.Label>Current Password:</Form.Label>
               <Form.Control type="password" name="currentPassword" onChange={onChangeOldPassword} required />
            </Form.Group>
            <Form.Group controlId="newPassword">
               <Form.Label>New Password:</Form.Label>
               <Form.Control type="password" name="newPassword" onChange={onChangeNewPassword} required />
            </Form.Group>
            <Form.Group controlId="CfPassword">
               <Form.Label>Confirm Password:</Form.Label>
               <Form.Control type="password" name="cfPassword" onChange={onChangeCfPassword} required />
            </Form.Group>
            <label style={{ color: '#d80d0d', textAlign: 'center' }}>{message}</label>
            <input className="submitBtn" type="submit" value="Change Password" style={{ marginTop: 40 }} />
         </Form>
      </div>
   )
}

export default ChangePassword