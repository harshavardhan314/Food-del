import React from 'react'
import './signup.css'
const Signup = () => {
  return (
    <div className='sign-up'>

        <h1>Sign up</h1>
        <div className="sign-up-content">
            <input type="text" name="" id="" placeholder='Your name' />
            <input type="email" placeholder='Your email' />
            <input type="password" name="" id="" placeholder='Password' />

            <div className="button">
                <button>Create account</button>
            </div>
            <input type="checkbox" />
            <p>
                By continuning.I agree terms of use & privacy policy.
            </p>
            <p>Already have an account ?</p>
            <p>Login here</p>
        </div>

    </div>
  )
}

export default Signup