import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import CSS from './styling.css';

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
		username: localStorage.getItem('username'),
		about: localStorage.getItem('about'),
		birthday: localStorage.getItem('birthday'),
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

	profile(e) {
		e.preventDefault()
		
		window.location.replace('http://localhost:3000/profile')
		
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
				<nav class="navbar">
					<a id="face">
						<h2>face</h2>
					</a>
	
					<ul>
						<li><button id='logout' onClick={this.logout}>Log Out</button></li>
						<li><button id='profile' onClick={this.profile}>Profile</button></li>
					</ul>
					
					
				</nav>
			</div>
          // <div>
            // Welcome to the Dashboard, {this.state.username}!
            // <br />
            // <button id='logout' onClick={this.logout}>Log Out</button>
          // </div>
        )  
      }
      else {
        return <Redirect to="/" />
      }

    }

    
    
  }
}