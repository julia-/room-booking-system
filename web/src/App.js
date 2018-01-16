import React, { Component } from 'react'
import './App.css'
import SignInForm from './components/SignInForm'
import RoomsList from './components/RoomsList'
import { signIn, signOut } from './api/auth'
import { listRooms } from './api/rooms'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    rooms: null
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      console.log('signed in', decodedToken)
      this.setState({ decodedToken })
    })
  }

  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken, rooms } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Red Hill Room System!</h1>
        {signedIn ? (
          <div>
            <h3>Signed in User: {decodedToken.email}</h3>
            <button onClick={this.onSignOut}>Log Out</button>
            <RoomsList rooms={rooms} />
          </div>
        ) : (
          <SignInForm onSignIn={this.onSignIn} />
        )}
      </div>
    )
  }

  load() {
    listRooms()
      .then(rooms => {
        this.setState({ rooms })
      })
      .catch(error => {
        console.error('Error loading room data', error)
      })
  }
  // When the App first renders
  componentDidMount() {
    this.load()
  }
}

export default App
