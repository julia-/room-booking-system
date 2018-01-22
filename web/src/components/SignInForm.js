import React from 'react'

function SignInForm({ onSignIn }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        const elements = event.target.elements
        const email = elements.email.value
        const password = elements.password.value
        onSignIn({ email, password })
      }}
    >
      <div className="form__group">
        <label className="form__label">
          {'Email'}
          <input type="email" name="email" className="form__input" />
        </label>
      </div>
      <div className="form__group">
        <label className="form__label">
          {'Password'}
          <input type="password" name="password" className="form__input" />
        </label>
      </div>
      <button className="button button__form--submit">Sign in</button>
    </form>
  )
}

export default SignInForm
