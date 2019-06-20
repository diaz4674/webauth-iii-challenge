import React from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Users from './Components/Users'


class App extends React.Component {

  logout = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render = () => { 
  return (
    <>
    <ul>
      <li><NavLink to ='/login'>Login</NavLink></li>
      <li><NavLink to ='/signup'>SignUp</NavLink></li>
      <li><NavLink to ='/users'>Users</NavLink></li>
      <li><button onClick = {this.logout}>Logout</button></li>
    </ul>
    <main>
      <Route path = '/login' component = {Login} />
      <Route path = '/signup' component = {SignUp} />
      <Route path = '/users' component = {Users} />
    </main>
    </>
  );
  }
}

export default withRouter(App);
