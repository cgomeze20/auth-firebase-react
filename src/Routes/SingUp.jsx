import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../Styles/SignUp.module.css'

export const SingUp = () => {

  const { SignUp } = styles


  const initialState = {
    email: '',
    password: ''
  }

  const [valuesSignUp, setvaluesSignUp] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault()
    singUpToken()
  }

  const singUpToken = async () => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_WEB_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...valuesSignUp, returnSecureToken: true })
    })
    const data = await response.json()
    console.log(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setvaluesSignUp(prev => ({ ...prev, [name]: value }))
    console.log(valuesSignUp)
  }

  return (
    <form  className={SignUp} onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <input type='text' value={valuesSignUp.email} onChange={handleChange} name='email' placeholder='Email' />
        <input type='text' value={valuesSignUp.password} onChange={handleChange} name='password' placeholder='Password' />
        <button>Sign Up</button>
      </form>
  )
}
