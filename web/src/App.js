import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './css/App.css'
import './css/style.css'
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
import BookingModal from './components/BookingModal';
import { filterParams, capacityParams } from './helpers/filters'
import { initialRoom } from './helpers/rooms'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    calendarDate: new Date(),
    selectedBooking: null,
    filterParams:  filterParams,
    capacityParams: capacityParams,
    floorParam: null,
    availabilityParam: null,
    filteredData: null,
    checked: null,
    currentRoom: initialRoom,
    error: null
  }

  // Pass supplied email & password to the signIn function, returns the users token
  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then(decodedToken => {
      console.log('signed in', decodedToken)
      this.setState({ decodedToken })
    })
  }

  onBeginGoogleSignIn = () => {
    // Begin journey through Google auth process
    googleSignIn()
  }

  onFinishGoogleSignIn = token => {
    // Successfully return from journey with Google token
    const decodedToken = googleDidSignInWithToken(token)
    this.setState({ decodedToken })
  }

  // Removes the current token from local storage
  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null })
  }

  setCalendarDate = date => {
    this.setState({ calendarDate: date })
  }

  onShowBooking = booking => {
    const selectedBooking = booking
    this.setState(() => ({ selectedBooking }))
  }

  onCloseBooking = () => {
    this.setState(() => ({ selectedBooking: null }))
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
        'Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is not a past date.'
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
    // this.onFilterByFeature(filterParams)
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
    // this.onFilterByCapacity(capacityParams)
  }

  onSetFloorParam = (value) => {
    this.setState({floorParam: value})
  } 

  onSetAvailabilityParam = (availability) => {
    this.setState({ availabilityParam: availability})
  }

  onFilterAll = (floor, availability) => {
    const roomData = this.state.roomData
    let filteredData = []

    const onFilterByFloor = () => {
      const value = this.state.floorParam
      if (value === 'all') {
        filteredData = roomData
      } else {
        filteredData = roomData.filter(room => room.floor === value)
      }
      return filteredData
    }
  
    const onFilterByFeature = () => {
      const featureParams = this.state.filterParams
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
      return filteredData
    }
  
    const  onFilterByCapacity = () => {
      const capacityParams = this.state.capacityParams
      capacityParams.forEach(capacity => {
        if (capacity.value === true)
        filteredData.push(...roomData.filter(room => room.capacity === capacity.capacity)) 
      })
      return filteredData
    }

      //  filter out occupied rooms
    const onFilterByAvailablity = () => {
      const availability = this.state.availabilityParam
      if (availability === 'fullyAvail') {
        filteredData = roomData.filter(room => room.bookings.length === 0)
      } else if (availability === 'partAvail') {
        filteredData = roomData.filter(room => room.bookings.length > 0)
      } else if (availability === 'fullBooked') {
        filteredData = !roomData.filter(room => room.bookings.length > 0) && !roomData.filter(room => room.bookings.length === 0)
      }
      return filteredData
    }

    onFilterByFloor()
    onFilterByFeature()
    onFilterByCapacity()
    onFilterByAvailablity()
    this.setState({ filteredData: filteredData })
  }

  // ***Need to add to the state***
  // get today's bookings for all rooms
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
      calendarDate,
      selectedBooking,
      filteredData
    } = this.state
    const signedIn = !!decodedToken
    const signOut = this.onSignOut
    const loadMyBookings = this.loadMyBookings
    const onDeleteBooking = this.onDeleteBooking
    const setCalendarDate = this.setCalendarDate

    const requireAuth = (render) => () => (
      signedIn ? (
        render()
      ) : (
        <Redirect to='/signin' />
      )
    )

    return (
      <Router>
        <div id="app" className="App">
          <NavBar
            signOut={signOut}
            loadMyBookings={loadMyBookings}
            user={signedIn ? decodedToken.sub : null}
          />
          
          <div>
            {/* <div className="user-info">
              <h3>Signed in User: {decodedToken.email}</h3>
              <button onClick={signOut}>Log Out</button>
            </div> */}
            <BookingModal
              selectedBooking={selectedBooking}
              onCloseBooking={this.onCloseBooking}
            />
            <div className="main-container">
              {/* <RoomSelector setRoom={this.setRoom} roomData={currentRoom} /> */}
            <Switch>
              <Route path='/signin' exact render={ () => (
                signedIn ? (
                  <Redirect to='/bookings' />
                ) : (
                  <div>
                    <SignInForm onSignIn={this.onSignIn} />
                    <GoogleSignInButton onGoogleSignIn={this.onBeginGoogleSignIn} />
                  </div>
                )
              )} />

              <Route path='/bookings' exact render={ requireAuth(() => (
                <Fragment>
                  <div className="left-panel">
                    <Calendar setCalendarDate={setCalendarDate} />
                    <FilterElement 
                      onSetFloorParam={this.onSetFloorParam}
                      onToggleFeature={this.onToggleFeature}
                      onToggleCapacity={this.onToggleCapacity}
                      onSetAvailabilityParam={this.onSetAvailabilityParam}
                      onFilterAll={this.onFilterAll}
                    />
                  </div>
                  <RoomsList
                    rooms={filteredData}
                    onRoomSelect={this.onRoomSelect}
                    onShowBooking={this.onShowBooking}
                    date={calendarDate}
                  />
                </Fragment>
              ))} />

              <Route path="/createbooking" exact render={ requireAuth(() => (
                <BookingForm
                  user={decodedToken.email}
                  roomData={currentRoom}
                  onMakeBooking={this.onMakeBooking}
                  date={calendarDate}
                  updateCalendar={setCalendarDate}
                />
              ))} />

              <Route path="/mybookings" exact render={ requireAuth(() => (
                <MyBookings
                  user={decodedToken.email}
                  userBookings={userBookings}
                  onDeleteBooking={onDeleteBooking}
                />
              ))} />
              <Route render={ () => (
                <h2>Page Not Found</h2>
              )} />
            </Switch>
            </div>
          </div>
      
        </div>
      </Router>
    )
  }

  load() {
    listRooms()
      .then(rooms => {
        this.setState({ roomData: rooms })
      })
      .catch(error => {
        console.error('Error loading room data', error)
        this.setState({ error })
      })
      .then(() => {
        this.onResetFilteredData()
      })
      .catch(error => {
        console.error('Error resetting filtered data', error)
        this.setState({ error })
      })
      .then(() => {
        this.loadMyBookings()
      })
      .catch(error => {
        console.error('Error loading myBookings', error)
        this.setState({ error })
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
