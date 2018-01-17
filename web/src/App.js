import React, { Component } from 'react'
import './App.css'
import './react-datetime.css'
import SignInForm from './components/SignInForm'
import RoomsList from './components/RoomsList'
import BookingForm from './components/BookingForm'
import { signIn, signOut } from './api/auth'
import { listRooms } from './api/rooms'
import { getDecodedToken } from './api/token'
import { makeBooking } from './api/booking'
import RoomSelector from './components/RoomSelector'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    currentRoom: {"_id":"5a5c0d782b191c21b1eebf4e","name":"Room 1","floor":"8","capacity":18,"bookings":[],"assets":{"whiteBoard":false,"opWalls":false,"tv":false,"projector":false,"pcLab":true,"macLab":false},"__v":0}
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

  // Makes a booking by updating the database and the React state
  onMakeBooking = ({startDate, endDate, businessUnit, purpose, roomId}) => {
    const bookingData = {startDate, endDate, businessUnit, purpose, roomId}
    const existingBookings = this.state.currentRoom.bookings
    
    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking({startDate, endDate, businessUnit, purpose, roomId}, existingBookings)
        .then((updatedRoom) => {
          // If the new booking is successfully saved to the database
          this.setState((previousState) => {
            // Find the relevant room in React State and replace it with the new room data
            const updatedRoomData = previousState.roomData.map((room) => {
              if (room._id === updatedRoom._id) {
                return updatedRoom
              } else {
                return room
              }
            })
            return {
              roomData: updatedRoomData
            }
          })
        })
      }
    // If there is a booking clash and the booking could not be saved
    catch(err) { 
      alert("Your booking could not be saved. There is an existing booking during the times selected.") 
    }
  }

  onRoomSelect = () => {
    console.log('hi')
  }

  setRoom = (roomNumber) => {
    const room = this.state.roomData.find(room => room.name === roomNumber)
    this.setState({ currentRoom: room })
  }

  render() {
    const { decodedToken, roomData, currentRoom } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Booking Room System</h1>
        {
          signedIn ? (
            <div>
              <h3>Signed in User: {decodedToken.email}</h3>
              <h3>{currentRoom.name}</h3>
              <button onClick={ this.onSignOut } >Log Out</button>
              {/* <RoomsList rooms={roomData} onRoomSelect={this.onRoomSelect} /> */}
              <RoomSelector setRoom={this.setRoom} roomData={currentRoom} />
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
