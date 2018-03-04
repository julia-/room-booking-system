import React from 'react'

function SignInForm({ onSignIn }) {
  return (
    <form className="form--signin"
      onSubmit={event => {
        event.preventDefault()
        const elements = event.target.elements
        const email = elements.email.value
        const password = elements.password.value
        onSignIn({ email, password })
      }}
    >
      <div className="form__group">
        <label for="email" className="form__label form__label--padding">Email</label>
        <input id="email" type="email" name="email" className="form__input" />
      </div>
      <div className="form__group">
        <label for="password" className="form__label form__label--padding">Password</label>
        <input id="password" type="password" name="password" className="form__input" />
      </div>
      <button className="button button__form--submit">Sign in</button>
    </form>
  )
}

export default SignInForm
