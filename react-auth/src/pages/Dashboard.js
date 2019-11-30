import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import CSS from './styling.css';

export default class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: localStorage.getItem('username'),
      isLoggedIn: false,
      checkedIfLoggedIn: false
    }

    fetch('http://localhost:3001/checkIfLoggedIn', {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(body => {
        console.log(body)
        if (body.isLoggedIn) {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: true })
        }
        else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false })
        }
      })

    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()

    const cookies = new Cookies()
    cookies.remove('authToken')

    localStorage.removeItem('username')

    this.setState({ isLoggedIn: false })
  }

  render() {
    if (!this.state.checkedIfLoggedIn) {
      return (<div></div>)
    }

    else {

      if (this.state.isLoggedIn) {
        return (
          <div>
            Welcome to the Dashboard, {this.state.username}!
            <br />
            <button id='logout' onClick={this.logout}>Log Out</button>
          </div>
        )  
      }
      else {
        return <Redirect to="/" />
      }

    }

    
    
  }
}