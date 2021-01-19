import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import '../../assets/css/MainStyle.css'
import axios from 'axios'


const LoginPage = () => {
   let [message, setMessage] = useState(null)
   const [username, setUsername] = useState()
   const [password, setPassword] = useState()

   const onChangeUsername = (e) => {
      setUsername(e.currentTarget.value);
   }

   const onChangePassword = (e) => {
      setPassword(e.currentTarget.value);
   }

   useEffect(() => {
      console.log('Username is', username)
      console.log('Password is', password)
   }, [username, password])

   const checkLogin = (event) => {
      event.preventDefault()
      console.log(username);

      axios.post('http://103.75.200.45:8088/login', {
         email: username,
         password: password
      })
         .then(response => {
            console.log(response.data[0]['email'])
            setMessage(message = response.data['status'])
            localStorage.setItem('loginStatus', 'LoggedIn')
            localStorage.setItem('currentUser', response.data[0]['name'])
            localStorage.setItem('userId', response.data[0]['id'])
            window.location.reload()
         })
         .catch(err => {
            console.error(err)
            setMessage(message = 'Username or Password is wrong')
         })
   }

   return (
      <React.Fragment>
         <div className="loginBg">
            <div className="loginContainer" style={{ width: 400 }}>
               <h1 className="test">Login</h1>
               <Form onSubmit={checkLogin}>
                  <Form.Group controlId="email">
                     <Form.Label>Email Address:</Form.Label>
                     <Form.Control type="email" name="email" onChange={onChangeUsername} required />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password:</Form.Label>
                     <Form.Control type="password" name="password" onChange={onChangePassword} required />
                  </Form.Group>
                  <label style={{ color: '#d80d0d', textAlign: 'center' }}>{message}</label>
                  <input type="submit" className="submitBtn" value="Sign In" />
                  <a href="/register"><p className="registerBtn">Register</p></a>
                  <a href="/"><p className="changePassword">Forgot Password?</p></a>
               </Form>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginPage