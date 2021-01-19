import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import CloseIcon from '../../assets/images/close-icon.svg'
import axios from 'axios'

const Register = () => {
   const [name, setName] = useState()
   const [phone, setPhone] = useState()
   const [email, setEmail] = useState()
   const [password, setPassword] = useState()

   const getInputName = (e) => {
      setName(e.currentTarget.value)
   }
   const getInputPhone = (e) => {
      setPhone(e.currentTarget.value)
   }
   const getInputEmail = (e) => {
      setEmail(e.currentTarget.value)
   }
   const getInputPassword = (e) => {
      setPassword(e.currentTarget.value)
   }

   const RegisUser = async () => {
      await axios.post('http://103.75.200.45:8088/adduser', {
         name: name,
         phone: phone,
         email: email,
         password: password
      }).then(res => {
         console.log(res)
         window.location.replace('/')
      }).catch(err => {
         console.error(err)
      })
   }
   useEffect(() => {
      console.log('name is', name)
      console.log('phone is', phone)
      console.log('email is', email)
      console.log('password is', password)
   }, [name, phone, email, password])
   return (
      <React.Fragment>
         <div className="loginBg">
            <div className="loginContainer" style={{ position: 'relative' }}>
               <a href="/"><img src={CloseIcon} width={24} height={24} style={{ position: 'absolute', right: 15, top: 15 }} /></a>
               <h1 className="test">Register</h1>
               <Form action="javascript:void(0);">
                  <Container>
                     <Row>
                        <Col xs={12} md={6}>
                           <Form.Group controlId="name">
                              <Form.Label>Name:</Form.Label>
                              <Form.Control type="text" name="name" onChange={getInputName} required />
                           </Form.Group>
                           <Form.Group controlId="age">
                              <Form.Label>Age:</Form.Label>
                              <Form.Control type="number" name="age" required />
                           </Form.Group>
                           <Form.Group controlId="telephone">
                              <Form.Label>Telephone:</Form.Label>
                              <Form.Control type="number" name="telephone" onChange={getInputPhone} required />
                           </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                           <Form.Group controlId="email">
                              <Form.Label>Email Address:</Form.Label>
                              <Form.Control type="email" name="email" onChange={getInputEmail} required />
                           </Form.Group>
                           <Form.Group controlId="formBasicPassword">
                              <Form.Label>Password:</Form.Label>
                              <Form.Control type="password" name="password" onChange={getInputPassword} required />
                           </Form.Group>
                           <Form.Group controlId="formBasicPassword">
                              <Form.Label>Confirm Password:</Form.Label>
                              <Form.Control type="password" name="cfpassword" required />
                           </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        <Col><input type="submit" value="Create Account" onClick={RegisUser} /></Col>
                     </Row>
                  </Container>
               </Form>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Register