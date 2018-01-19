import React, { Component } from 'react'
import './css/App.css'
import './css/react-datetime.css'
import moment from 'moment'

import BookingForm from './components/BookingForm'
import FilterElement from './components/FilterElement'
import GoogleSignInButton from './components/GoogleSignInButton'
import MyBookings from './components/MyBookings'
import NavBar from './components/NavBar'
import SignInForm from './components/SignInForm'
import RoomsList from './components/RoomsList'

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
import Calendar from './components/Calendar'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    calendarDate: null,
    filterTerms: null,
    filteredData: null,
    currentRoom: {
      _id: '5a5c0d782b191c21b1eebf4e',
      name: 'Room 1',
      floor: '8',
      capacity: 18,
      bookings: [],
      assets: {
        whiteBoard: false,
        opWalls: false,
        tv: false,
        projector: false,
        pcLab: true,
        macLab: false
      },
      __v: 0
    }
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

  // set current selected calendar date
  getCalendarDate = date => {
    this.setState({ calendarDate: date })
  }
  // Makes a booking by updating the database and the React state
  onMakeBooking = ({ startDate, endDate, businessUnit, purpose, roomId }) => {
    const bookingData = { startDate, endDate, businessUnit, purpose, roomId }
    const existingBookings = this.state.currentRoom.bookings
    console.log('bookingData', bookingData)

    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking(
        { startDate, endDate, businessUnit, purpose, roomId },
        existingBookings
      ).then(updatedRoom => {
        // If the new booking is successfully saved to the database
        alert(`${updatedRoom.name} sucessfully booked.`)
        updateStateRoom(this, updatedRoom, this.loadMyBookings)
      })
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      alert(
        'Your booking could not be saved. There is a clash with an existing booking.'
      )
      console.error(err.message)
    }
  }

  // Deletes a booking from the database and updates the React state
  onDeleteBooking = (roomId, bookingId) => {
    deleteBooking(roomId, bookingId)
      .then(updatedRoom => {
        alert('Booking successfully deleted')
        updateStateRoom(this, updatedRoom, this.loadMyBookings)
      })
      .catch(error => console.error(error.message))
  }

  setRoom = roomNumber => {
    const room = this.state.roomData.find(room => room.name === roomNumber)
    this.setState({ currentRoom: room })
  }

  onFilterByFloor = (value) => {
    // might need to reset roomData before executing the rest of the code
    const roomData = this.state.roomData
    let filteredData = roomData.filter(room => room.floor === value)
    this.setState({roomData: filteredData})
  }

  onFilterByCapacity = (value) => {
    const roomData = this.state.roomData
    let filteredData = roomData.filter(room => room.capacity === value)
    this.setState({roomData: filteredData})
  }

  onFilterByFeature = (feature) => {
    const roomData = this.state.roomData
    let filteredData = []
    if (feature = 'macLab') {
      let filteredData = roomData.filter(room => room.assets.tv === false)
    }
    this.setState({roomData: filteredData})
    // console.log(filteredData)
  }

  //  filter out occupied rooms
  onFilterAvailableRooms = () => {
    const roomData = this.state.roomData
    let bookedRooms = roomData.filter(room => room.bookings.length === 0)
    // console.log(bookedRooms)
    // return availableRooms
    this.setState({roomData: bookedRooms})
  }

  // ***Need to add to the state***
  // get todays booking for all rooms
  oneSetCurrentDateBookings = () => {
    const currentDate = moment().format('DD-MM-YYYY')
    // const roomData = this.state.roomData
    const roomData = this.state.roomData
    // array to collect todays bookings
    let todaysBookings = []
    // // loop through all rooms
    roomData.forEach(room => {
      // loop through all bookings for that room
      room.bookings.forEach(booking => {
        const bookingStart = moment(booking.bookingStart).format('DD-MM-YYYY')
        if (bookingStart === currentDate) {
          todaysBookings.push(booking)
        }
      })
    })
    console.log('todays bookings:', todaysBookings)
    // return todaysBookings
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
    this.setState({ userBookings: myBookings })
    console.log('state:', this.state.userBookings)
    console.log('myBookings:', myBookings)
  }

  render() {
    const {
      decodedToken,
      currentRoom,
      userBookings,
      roomData,
      calendarDate
    } = this.state
    const signedIn = !!decodedToken
    const signOut = this.onSignOut
    const loadMyBookings = this.loadMyBookings
    const onDeleteBooking = this.onDeleteBooking
    const getCalendarDate = this.getCalendarDate

    return (
      <div className="App">
        <NavBar
          signOut={signOut}
          loadMyBookings={loadMyBookings}
          user={signedIn ? decodedToken.sub : null}
        />
        {signedIn ? (
          <div>
            <div className="user-info">
              <h3>Signed in User: {decodedToken.email}</h3>
              <button onClick={signOut}>Log Out</button>
              <button onClick={() => this.onFilterByCapacity(24)}>filter</button>
            </div>
            <MyBookings
              user={decodedToken.email}
              userBookings={userBookings}
              onDeleteBooking={onDeleteBooking}
            />
            <Calendar getCalendarDate={getCalendarDate} />
            <RoomsList
              rooms={roomData}
              onRoomSelect={this.onRoomSelect}
              date={calendarDate}
            />
            <div className="booking-container">
              {/* <RoomSelector setRoom={this.setRoom} roomData={currentRoom} /> */}
              <FilterElement 
                filterByFloor={this.onFilterByFloor}
                filterByCapacity={this.onFilterByCapacity}
                filterByFeature={this.onFilterByFeature}
              />
              <BookingForm
                user={decodedToken.email}
                roomData={currentRoom}
                onMakeBooking={this.onMakeBooking}
              />
            </div>
          </div>
        ) : (
          <div>
            <SignInForm onSignIn={this.onSignIn} />
            <GoogleSignInButton onGoogleSignIn={this.onBeginGoogleSignIn} />
          </div>
        )}
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
        this.setRoom('Room 1')
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
