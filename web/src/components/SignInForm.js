import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form className="sign-in-form"
      onSubmit={ (event) => {
        event.preventDefault()
        const elements = event.target.elements
        const email = elements.email.value
        const password = elements.password.value
        onSignIn({email, password})
      }}
    >
      <h2>Sign In</h2>
      <div className="time-selector">
        <label>
          {'Email: '}
          <input 
            type="email"
            name="email"
          />
        </label>

        <label>
          {'Password: '}
          <input 
            type="password"
            name="password"
          />
        </label>
      </div>  
      <button className="custom-button filter-button">Sign In</button>
    </form>
  )
}

export default SignInForm