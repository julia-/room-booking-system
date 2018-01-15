import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn, signOut } from './api/auth'
import { listRooms } from './api/rooms'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken() // retrieves the token from local storage if valid, else will be null
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({email, password}) => {
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        <h1>Red Hill Room System!</h1>
        {
          !!decodedToken ? (
            <div>
              <h3>Signed in User: {decodedToken.email}</h3>
              <button onClick={ this.onSignOut } >Log Out</button>
            </div>
          ) : (
            <SignInForm onSignIn={ this.onSignIn } />
          )
        }
      </div>
    );
  }

  // When the App first renders
  componentDidMount() {
    // Load room data from database
    listRooms()
      .then((rooms) => {
        console.log('Room data:', rooms)
      })
      .catch((error) => {
        console.error('Error loading room data', error)
      })
  }
}

export default App;
