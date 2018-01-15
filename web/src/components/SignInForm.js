import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form 
      onSubmit={ (event) => {
        event.preventDefault()
        const elements = event.target.elements
        const email = elements.email.value
        const password = elements.password.value
        onSignIn({email, password})
      }}
    >
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
      <button>Sign In</button>
    </form>
  )
}

export default SignInForm