import React, { Component } from 'react'
import './App.css'
import './react-datetime.css'

import BookingForm from './components/BookingForm'
import FilterElement from './components/FilterElement'
import GoogleSignInButton from './components/GoogleSignInButton'
import MyBookings from './components/MyBookings'
import NavBar from './components/NavBar'
import SignInForm from './components/SignInForm'
// import RoomsList from './components/RoomsList'

import {
  signIn,
  signOut,
  googleSignIn,
  googleDidSignInWithToken
} from './api/auth'
import { listRooms } from './api/rooms'
import { getDecodedToken } from './api/token'
import { makeBooking, deleteBooking, updateStateRoom } from './api/booking'
import RoomSelector from './components/RoomSelector'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    currentRoom: {"_id":"5a5c0d782b191c21b1eebf4e","name":"Room 1","floor":"8","capacity":18,"bookings":[],"assets":{"whiteBoard":false,"opWalls":false,"tv":false,"projector":false,"pcLab":true,"macLab":false},"__v":0}
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      console.log('signed in', decodedToken)
      this.setState({ decodedToken })
    })
  }
  
  onBeginGoogleSignIn = () => {
    // Begin journey through Google
    googleSignIn()
  }

  onFinishGoogleSignIn = token => {
    // Successfully return from journey with Google
    const decodedToken = googleDidSignInWithToken(token)
    this.setState({ decodedToken })
  }

  // Removes the current token from local storage
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
          alert(`${updatedRoom.name} sucessfully booked.`)
          updateStateRoom(this, updatedRoom)
        })
    }
    // If there is a booking clash and the booking could not be saved
    catch(err) { 
      alert("Your booking could not be saved. There is an existing booking during the times selected.")
      console.error(err.message) 
    }
  }

  // Deletes a booking from the database and updates the React state
  onDeleteBooking = ({ roomId, bookingId }) => {
    deleteBooking(roomId, bookingId)
      .then((updatedRoom) => {
        alert('Booking successfully deleted')
        updateStateRoom(self, updatedRoom)
      })
    .catch(error => console.error( error.message ))
  }

  setRoom = (roomNumber) => {
    const room = this.state.roomData.find(room => room.name === roomNumber)
    this.setState({ currentRoom: room })
  }

  loadMyBookings = () => {
    let myBookings = []
    const userId = this.state.decodedToken.sub
    // Loop through all the rooms
    this.state.roomData.forEach(room => {
      // Loop through all the bookings in 'room'
      room.bookings.forEach(booking => {
        if (booking.user === userId) {
          // Push all bookings where the current userId is equal to the booking's userId into myBookings
          booking.roomId = room._id
          myBookings.push(booking)
        }
      })
    })
    this.setState({ userBookings: myBookings})    
    console.log('state:', this.state.userBookings)
    console.log('myBookings:', myBookings)
  }

  render() {
    const { decodedToken, currentRoom, userBookings } = this.state
    const signedIn = !!decodedToken
    const signOut = this.onSignOut
    const loadMyBookings = this.loadMyBookings
    const onDeleteBooking = this.onDeleteBooking

    return (
      <div className="App">
        <NavBar signOut={signOut} loadMyBookings={loadMyBookings} user={signedIn ? (decodedToken.sub) : (null)} />
        {
          signedIn ? (
            <div>
              <div className="user-info">
                <h3>Signed in User: {decodedToken.email}</h3>
                <button onClick={ signOut } >Log Out</button>
              </div>
              <MyBookings user={decodedToken.email} userBookings={userBookings} onDeleteBooking={onDeleteBooking}/>
              {/* <RoomsList rooms={roomData} onRoomSelect={this.onRoomSelect} /> */}
              <div className="booking-container">
                <RoomSelector setRoom={this.setRoom} roomData={currentRoom} />
                {/* <FilterElement /> */}
                <BookingForm user={decodedToken.email} roomData={currentRoom} onMakeBooking={this.onMakeBooking} />
              </div>
            </div>
          ) : (
          <div>
            <SignInForm onSignIn={this.onSignIn} />
            <GoogleSignInButton onGoogleSignIn={this.onBeginGoogleSignIn} />
          </div>
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
      .then(() => {
        this.loadMyBookings()
      })
      .catch(error => {
        console.error('Error loading myBookings', error)
      })
      .then(() => {
        this.setRoom("Room 1")
      })
    
  }

  // When the App first renders
  componentDidMount() {
    this.load()

    window.authenticateCallback = this.onFinishGoogleSignIn
  }

  componentWillUnmount() {
    delete window.authenticateCallback
  }
}

export default App
