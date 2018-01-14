import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'

class App extends Component {
  onSignIn = ({email, password}) => {
    console.log({email, password})
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
