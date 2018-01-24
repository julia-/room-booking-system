import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './css/style.css'
import moment from 'moment'

import BookingForm from './components/BookingForm'
import Button from './components/Button'
import FilterElement from './components/FilterElement'
import Footer from './components/Footer'
import Key from './components/Key'
import MyBookings from './components/MyBookings'
import NavBar from './components/NavBar'
import RoomsList from './components/RoomsList'
import SignInForm from './components/SignInForm'

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
import BookingModal from './components/BookingModal'
import { floorParams, filterParams, capacityParams, onFilterByFloor, onFilterByFeature, onFilterByCapacity, onFilterByAvailablity } from './helpers/filters'
import { initialRoom } from './helpers/rooms'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // retrieves the token from local storage if valid, else will be null
    roomData: null,
    userBookings: null,
    calendarDate: new Date(),
    selectedBooking: null,
    filterParams: filterParams,
    capacityParams: capacityParams,
    floorParam: null,
    availabilityParam: null,
    timeFilterParams: [],
    filteredData: null,
    checked: null,
    currentRoom: null,
    error: null,
    disableRecurring: true
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
    console.log('selectedBooking', selectedBooking)
    this.setState(() => ({ selectedBooking }))
  }

  onCloseBooking = () => {
    this.setState(() => ({ selectedBooking: null }))
  }

  // Makes a booking by updating the database and the React state
  onMakeBooking = ({ startDate, endDate, businessUnit, purpose, roomId, recurringData }) => {
    const bookingData = { startDate, endDate, businessUnit, purpose, roomId }
    const existingBookings = this.state.currentRoom.bookings

    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking(
        { startDate, endDate, businessUnit, purpose, roomId, recurringData },
        existingBookings
      )
        .then(updatedRoom => {
          // If the new booking is successfully saved to the database
          alert(`${updatedRoom.name} successfully booked.`)
          updateStateRoom(this, updatedRoom, this.loadMyBookings, this.onResetFilteredData)
        })
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      alert(
        'Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future.'
      )
      console.log(err)
    }
  }

  // Deletes a booking from the database and updates the React state
  onDeleteBooking = (roomId, bookingId) => {
    deleteBooking(roomId, bookingId)
      .then(updatedRoom => {
        alert('Booking successfully deleted')
        updateStateRoom(
          this,
          updatedRoom,
          this.loadMyBookings,
          this.onResetFilteredData
        )
      })
      .catch(error => console.error(error.message))
  }

  setRoom = id => {
    const room = this.state.roomData.find(room => room._id === id)
    this.setState({ currentRoom: room })
  }

  onResetFloorParams = () => {
		this.setState({floorParam: null})
	}

	onResetAvailabilityParam = () => {
		this.setState({availabilityParam: null})
	}

  onResetFeatureParams = () => {
    let filterParams = this.state.filterParams
    filterParams.forEach(param => param.value = false)
    this.setState({filterParams: filterParams})
  }

  onResetCapacityParams = () => {
    let capacityParams = this.state.capacityParams
    capacityParams.forEach(param => param.value = false)
    this.setState({capacityParams: capacityParams})
  }

  onResetFilterParams = () => {
    this.onResetFeatureParams()
		this.onResetCapacityParams()
		this.onResetFloorParams()
		this.onResetAvailabilityParam()
  }

  onResetFilteredData = () => {
    const roomData = this.state.roomData
    this.setState({ filteredData: roomData })
    this.render()
  }

  // setting the feature filter parameters
  onToggleFeature = feature => {
    // Get the filter parameters
    let filterParams = this.state.filterParams
    // Find the filter parameter that matches the the passed parameter
    let featureParam = filterParams.find(param => param.name === feature)
    // Toggle the value of the parameter, eg if false, set to true
    featureParam.value = !featureParam.value
    // Set state with the updated filter parameters
    this.setState({ filterParams: filterParams })
  }

  // setting the capacity filter parameters
  onToggleCapacity = capacity => {
    // Get the capacity parameters
    let capacityParams = this.state.capacityParams
    // Find the capacity parameter that matches the the passed parameter
    let capacityParam = capacityParams.find(param => param.id === capacity)
    // Toggle the value of the parameter, eg if false, set to true
    capacityParam.value = !capacityParam.value
    // Set state with the updated capacity parameters
    this.setState({ capacityParams: capacityParams })
  }

  // changing the boolean value for the display attribute for the recurring date input
  onToggleRecurring = (value) => {
    let disableRecurring
    if (value === 'none') {
      disableRecurring = true
    } else {
      disableRecurring = false
    }
    this.setState({disableRecurring: disableRecurring})
  }

  onSetFloorParam = value => {
		this.setState({ floorParam: value })
  }

  onSetAvailabilityParam = availability => {
    this.setState({ availabilityParam: availability })
  }

  onSetTimeFilterParams = (params, index) => {
    let timeFilterParams = this.state.timeFilterParams
    timeFilterParams[index] = params
    this.setState({timeFilterParams: timeFilterParams})
  }

  onFilterAll = (floor, availability) => {
    let roomData = this.state.roomData
    let filteredData = []
    const floorParam = this.state.floorParam
    const featureParams = this.state.filterParams
    const capacityParams = this.state.capacityParams
    const availabilityParam = this.state.availabilityParam
    const timeFilterParams = this.state.timeFilterParams
    const date = this.state.currentDate

    // Send all room data and the selected floor, return filtered floors and store in filteredData
    filteredData = onFilterByFloor(floorParam, roomData)
    // Send the previously filtered data along with the feature params
    filteredData = onFilterByFeature(featureParams, filteredData)
    // Send the previously filtered data along with the capacity params
    filteredData = onFilterByCapacity(capacityParams, filteredData)
    // Send the previously filtered data along with the availability
    filteredData = onFilterByAvailablity(availabilityParam, filteredData)
    // Send the previously filtered data along with the selested time frame
    // filteredData = onFilterByTime(date, timeFilterParams, filteredData)
    // set state to the room data, passed through all filter functions
    this.setState({ filteredData: filteredData })
    // reset filter variables stored in state
    this.onResetFilterParams()
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
  }

  render() {
    const {
      decodedToken,
      currentRoom,
      userBookings,
      roomData,
      calendarDate,
      selectedBooking,
      filteredData,
      filterParams,
			capacityParams,
			floorParam,
      availabilityParam,
      disableRecurring
    } = this.state
    const signedIn = !!decodedToken
    const signOut = this.onSignOut
    const loadMyBookings = this.loadMyBookings
    const onDeleteBooking = this.onDeleteBooking
    const setCalendarDate = this.setCalendarDate

    const requireAuth = render => () =>
      signedIn ? render() : <Redirect to="/" />

    return (
      <Router>
        <div id="app" className="App">
          <Fragment>
              {/* <RoomSelector setRoom={this.setRoom} roomData={currentRoom} /> */}
              <Switch>
                <Route path="/" exact render={() => (!!decodedToken && signedIn ?
                  (<Redirect to="/bookings" />) :
                  (<div className="container__main">
                    <h2>Sign in</h2>
                    <div className="container__form">
                      <SignInForm onSignIn={this.onSignIn} />
                    </div>
                    <div className="container__google">
                      <h3>Or sign in with Google</h3>
                      <Button onClick={this.onBeginGoogleSignIn} className="button button--google" text={'Sign in with Google'} />
                    </div>
                  </div>)
                )} />

                <Route path="/bookings" exact render={requireAuth(() => (
                  <Fragment>
                    {!!decodedToken && !!roomData && (
                      <div className="wrapper">
                        <div className="header header__nav header--flex">
                          <h1 className="header__heading header__heading--main">Company Name Here</h1>
                          <NavBar
                            signOut={signOut}
                            loadMyBookings={loadMyBookings}
                            user={signedIn ? decodedToken.sub : null}
                          />
                        </div>
                        <div className="wrapper__content">
                          <div className="header__page">
                            <h2 className="header__heading header__heading--sub">Book a room | {moment(calendarDate).format('MMMM Do YYYY')}</h2>
                          </div>
                          <div className="sidebar">
                            <div className="sidebar__box">
                              <Calendar setCalendarDate={setCalendarDate} />
                            </div>
                            <div className="sidebar__box">
                              <FilterElement
                                onSetFloorParam={this.onSetFloorParam}
                                onToggleFeature={this.onToggleFeature}
                                onToggleCapacity={this.onToggleCapacity}
                                onSetAvailabilityParam={
                                  this.onSetAvailabilityParam
                                }
                                onFilterAll={this.onFilterAll}
                                onResetFilterParams={this.onResetFilterParams}
                                filterParams={filterParams}
                                capacityParams={capacityParams}
                                floorParam={floorParam}
                                availabilityParam={availabilityParam}
                                onSetTimeFilterParams={this.onSetTimeFilterParams}
                                date={calendarDate}
                              />
                            </div>
                            <div className="sidebar__box">
                              <Key />
                            </div>
                          </div>
                          <div className="content">
                            <RoomsList
                              rooms={filteredData}
                              onRoomSelect={this.onRoomSelect}
                              onShowBooking={this.onShowBooking}
                              date={calendarDate}
                              onSetRoom={this.setRoom}
                            />
                          </div>                        
                         </div>
                        <BookingModal
                          selectedBooking={selectedBooking}
                          onCloseBooking={this.onCloseBooking}
                          onDeleteBooking={onDeleteBooking}
                          roomData={roomData}
                          user={decodedToken.email}
                        />
                      </div>
                    )}
                  </Fragment>
                ))} />

                <Route path="/createbooking" exact render={requireAuth(
                  () => (
                    <Fragment>
                      {!!decodedToken &&
                        !!roomData &&
                        !!currentRoom && (
                          <div className="wrapper">
                            <header className="header header__nav header--flex">
                              <h1 className="header__heading header__heading--main">Company Name Here</h1>
                              <NavBar
                                signOut={signOut}
                                loadMyBookings={loadMyBookings}
                                user={signedIn ? decodedToken.sub : null}
                              />
                            </header>
                            <div className="wrapper__content">
                              <BookingForm
                                user={decodedToken.email}
                                roomData={currentRoom}
                                onMakeBooking={this.onMakeBooking}
                                date={calendarDate}
                                disableRecurring={disableRecurring}
                                updateCalendar={setCalendarDate}
                                onShowBooking={this.onShowBooking}
                                onToggleRecurring={this.onToggleRecurring}
                                calendarDate={calendarDate}
                              />
                            </div>
                              <BookingModal
                                selectedBooking={selectedBooking}
                                onCloseBooking={this.onCloseBooking}
                                onDeleteBooking={onDeleteBooking}
                                roomData={roomData}
                                user={decodedToken.email}
                              />
                        </div>
                      )}
                    </Fragment>
                  )
                )} />

                <Route path="/mybookings" exact render={requireAuth(() => (
                    <Fragment>
                      {!!decodedToken &&
                        !!roomData && (
                        <div className="wrapper">
                          <div className="header header__nav header--flex">
                            <h1 className="header__heading header__heading--main">Company Name Here</h1>
                            <NavBar
                              signOut={signOut}
                              loadMyBookings={loadMyBookings}
                              user={signedIn ? decodedToken.sub : null}
                            />
                          </div>
                            <MyBookings
                              roomData={roomData}
                              user={decodedToken.email}
                              userBookings={userBookings}
                              onDeleteBooking={onDeleteBooking}
                            />
                          </div>
                        )}
                    </Fragment>
                  ))} />

                <Route render={({ location }) => <h2>
                      {' '}
                      Page Not Found: {location.pathname}{' '}
                    </h2>} />
            </Switch>
          </Fragment>
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
        const room = this.state.roomData[0]
        this.setRoom(room._id)
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
