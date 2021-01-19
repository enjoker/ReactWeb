import { Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/MainStyle.css'

function App() {
  // localStorage.setItem('loginStatus',false)
  // console.log(localStorage.getItem('loginStatus'))
  // let checkLogin = localStorage.getItem('loginStatus')
  // console.log(checkLogin)
  return (
    <div>
      <Route path='/register' component={Register} />
      {
        localStorage.loginStatus === 'LoggedIn' ? (<Home />) : (<Login />)
      }

    </div>
  );
}

export default App;
