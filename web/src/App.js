import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'

class App extends Component {
  onSignIn = ({email, password}) => {
    // console.log({email, password})
    signIn({ email, password })
      .then((data) => {
        console.log('signed in', data)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>app</h1>
        <SignInForm onSignIn={ this.onSignIn } />
      </div>
    );
  }
}

export default App;
