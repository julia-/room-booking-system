import React, { Component } from 'react'
import './App.css'
import SignInForm from './components/SignInForm'
import RoomsList from './components/RoomsList'
import BookingForm from './components/BookingForm'
import { signIn, signOut } from './api/auth'
import { listRooms } from './api/rooms'
import { getDecodedToken } from './api/token'
import { makeBooking } from './api/booking'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    currentRoom: {
      name: 'Room 1',
      id: "5a5c0d782b191c21b1eebf52",
      floor: '8',
      capacity: 18,
      assets: {
        pcLab: true
      }
    },
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

  onMakeBooking = ({startDate, endDate, businessUnit, purpose, roomId}) => {
    const bookingData = {startDate, endDate, businessUnit, purpose, roomId}
    console.log('booking data:', bookingData)
    makeBooking({startDate, endDate, businessUnit, purpose, roomId})
  }

  render() {
    const { decodedToken, roomData, currentRoom } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Red Hill Room System!</h1>
        {
          signedIn ? (
            <div>
              <h3>Signed in User: {decodedToken.email}</h3>
              <button onClick={ this.onSignOut } >Log Out</button>
              <RoomsList rooms={roomData} />
              <BookingForm user={decodedToken.email} roomData={currentRoom} onMakeBooking={this.onMakeBooking} />
            </div>
          ) : (
            <SignInForm onSignIn={ this.onSignIn } />
          )
        }
      </div>
    )
  }

  load() {
    listRooms()
      .then(rooms => {
        this.setState({ roomData: rooms })
        console.log('Room data on state:', this.state.roomData)
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
