import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listRooms } from './api/rooms'
import { setToken } from './api/init'

class App extends Component {
  state = {
    decodedToken: null
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({email, password}) => {
    signIn({ email, password })
      .then((data) => {
        console.log('signed in', data)
        const token = data.token
        // Set the authorisation header for axios requests
        setToken(token)
        // Load room data with token now set
        listRooms()
        .then((rooms) => {
          console.log('loaded rooms:', rooms)
        })
        .catch((error) => {
          console.error('Error loading room data', error)
        })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Red Hill Room System</h1>
        <SignInForm onSignIn={ this.onSignIn } />
      </div>
    );
  }

  // When the App first renders
  componentDidMount() {
    // Load room data from database
    listRooms()
      .then((rooms) => {
        console.log(rooms)
      })
      .catch((error) => {
        console.error('Error loading room data', error)
      })
  }
}

export default App;
