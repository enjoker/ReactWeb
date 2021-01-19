import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Profile from './Profile'
import ChangePassword from './auth/ChangePass'
import User from './User'
import EditUser from './EditUser'

const HomePage = () => {
   const [currentUser, setCurrentUser] = useState([])
   useEffect(() => {
      const userId = localStorage.userId
      const getCurrentUser = async () => {
         await axios.post('http://103.75.200.45:8088/getuserdetail/' + userId
         ).then(res => {
            setCurrentUser(res.data)
         }).catch(err => {
            console.log(err)
         })
      }
      getCurrentUser()
   }, [])
   return (
      <React.Fragment>
         <Container>
            <Row>
               <Col>
                  <h1 style={{ textAlign: 'center', marginTop: 50 }}>HomePage</h1>
                  <h5 style={{ textAlign: 'center', marginTop: 30 }}>
                     Welcome, {currentUser.name}
                  </h5>
               </Col>
            </Row>
         </Container>
      </React.Fragment>
   )
}

const Home = () => {
   return (
      <Router>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand href="#">Navbar</Navbar.Brand>
               <Nav>
                  <Link to={'/'}>Home</Link>
                  <Link to={'/user'}>User</Link>
                  <Link to={'/profile'}>Profile</Link>
               </Nav>
            </Container>
         </Navbar>
         <Switch>
            <Route exact path='/' render={() => <HomePage />} />
            <Route path='/user' component={User} />
            <Route path='/profile' render={() => <Profile />} />
            <Route path='/changepass' component={ChangePassword} />
            <Route path='/edituser/:userId' component={EditUser} />
         </Switch>
      </Router>
   )
}
export default Home