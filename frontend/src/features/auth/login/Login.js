import React from 'react'

import './login.css'

const Login = () => {
  return (
    <div className='main'>
      <div className="l-section">
        <h1>Login</h1>
        <form>
          <input type="text" id='email' name='email' placeholder='Username'/>
          <input type="text" id='password' name='password' placeholder='Password'/>
          <button type='submit' >LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Login