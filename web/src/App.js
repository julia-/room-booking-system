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
import { filterParams, capacityParams } from './helpers/filters'
import { initialRoom } from './helpers/rooms'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    calendarDate: null,
    filterParams:  filterParams,
    capacityParams: capacityParams,
    filteredData: null,
    checked: null,
    currentRoom: initialRoom
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

  onResetFilteredData = () => {
    const roomData = this.state.roomData
    this.setState({ filteredData: roomData})
  }

  // setting the feature filter parameters
  onToggleFeature = (feature) => {
    // Get the filter parameters
    let filterParams = this.state.filterParams
    // Find the filter parameter that matches the the passed parameter
    let featureParam = filterParams.find(param => param.name === feature)
    // Toggle the value of the parameter, eg if false, set to true
    featureParam.value = !featureParam.value
    // Set state with the updated filter parameters
    this.setState({filterParams: filterParams})
    // filter the filtered roomData again with the updated filter parameters
    this.onFilterByFeature(filterParams)
  }

  // setting the capacity filter parameters
  onToggleCapacity = (capacity) => {
    // Get the capacity parameters
    let capacityParams = this.state.capacityParams
    // Find the capacity parameter that matches the the passed parameter
    let capacityParam = capacityParams.find(param => param.id === capacity)
    // Toggle the value of the parameter, eg if false, set to true
    capacityParam.value = !capacityParam.value
    // Set state with the updated capacity parameters
    this.setState({capacityParams: capacityParams})
    // filter the filtered roomData again with the updated capacity parameters
    // this.onFilterByCapacity(capacityParams)
    console.log('cap params', this.state.capacityParams)
    this.onFilterByCapacity(capacityParams)
  }

  onFilterByFloor = (value) => {
    // might need to reset roomData before executing the rest of the code
    const roomData = this.state.roomData
    let filteredData = []
    if (value === 'all') {
      filteredData = roomData
    } else {
      filteredData = roomData.filter(room => room.floor === value)
    }
    this.setState({filteredData: filteredData})
  }

  onFilterByFeature = (featureParams) => {
    const roomData = this.state.filteredData
    let filteredData = []
    featureParams.forEach(feature => {
      if (feature.name === 'macLab' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.macLab === true)
      } else if (feature.name === 'pcLab' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.pcLab === true)
      }else if (feature.name === 'tv' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.tv === true)
      } else if (feature.name === 'opWall' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.opWalls === true)
      } else if (feature.name === 'whiteboard' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.whiteboard === true)
      } else if (feature.name === 'projector' && feature.value === true) {
        filteredData = roomData.filter(room => room.assets.projector === true)
      } 
    })
    // this.setState({filteredData: filteredData})
    console.log('onFilterByFeature', filteredData)
  }

  onFilterByCapacity = (capacityParams) => {
    const roomData = this.state.roomData
    let filteredData = []
    capacityParams.forEach(capacity => {
      if (capacity.value === true)
      filteredData.push(...roomData.filter(room => room.capacity === capacity.capacity)) 
    })
    this.setState({filteredData: filteredData})
  }

  //  filter out occupied rooms
  onFilterByAvailablity = (availability) => {
    const roomData = this.state.roomData
    let bookedRooms = []
    if (availability === 'fullyAvail') {
      bookedRooms = roomData.filter(room => room.bookings.length === 0)
    } else if (availability === 'partAvail') {
      bookedRooms = roomData.filter(room => room.bookings.length > 0)
    }
    this.setState({filteredData: bookedRooms})
  }

  // ***Need to add to the state***
  // get todays booking for all rooms
  oneSetCurrentDateBookings = () => {
    const currentDate = moment().format('DD-MM-YYYY')
    // const roomData = this.state.roomData
    const roomData = this.state.roomData
    // array to collect todays bookings
    let todaysBookings = []
    // loop through all rooms
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
    // console.log('state:', this.state.userBookings)
    // console.log('myBookings:', myBookings)
  }

  render() {
    const {
      decodedToken,
      currentRoom,
      userBookings,
      roomData,
      filteredData,
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
            </div>
            <MyBookings
              user={decodedToken.email}
              userBookings={userBookings}
              onDeleteBooking={onDeleteBooking}
            />
            <Calendar getCalendarDate={getCalendarDate} />
            <RoomsList
              rooms={filteredData}
              onRoomSelect={this.onRoomSelect}
              date={calendarDate}
            />
            <div className="booking-container">
              {/* <RoomSelector setRoom={this.setRoom} roomData={currentRoom} /> */}
              <FilterElement 
                filterByFloor={this.onFilterByFloor}
                onToggleCapacity={this.onToggleCapacity}
                filterByFeature={this.onFilterByFeature}
                filterByAvailability={this.onFilterByAvailablity}
                onToggleFeature={this.onToggleFeature}
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
        this.onResetFilteredData()
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
