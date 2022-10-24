import { useState,useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../Context/AppProvider"

import styles from '../Styles/SignIn.module.css'

export const LogIn = () => {

  const {SignIn} = styles

  const { setLogin} = useContext(AppContext)

  const navigate = useNavigate()

  const initialState = {
    email: '',
    password: ''
  }

  const [valuesLogIn, setvaluesLogIn] = useState(initialState);

  const { email, password } = valuesLogIn

  useEffect(() => {
    if(localStorage.token){
      setLogin(localStorage.getItem('token'))
      navigate('/tasks',{replace:true})
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setvaluesLogIn(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    logInToken()
    console.log(valuesLogIn);
  }

  const logInToken = async () => {
    
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_WEB_API_KEY}`, {
      method: 'POST',
      'Content-type': 'application/json',
      body: JSON.stringify({ ...valuesLogIn, returnSecureToken: true })
    })
    const data = await res.json()
    console.log(data);
    if(data.registered){
      localStorage.setItem('token', JSON.stringify(data))
      // setLogin(data)
      navigate('/tasks',{replace:true})
    }

  }

  return (
    <form className={SignIn} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type='text' name='email' value={email} onChange={handleChange} placeholder='Email'/>
      <input type='text' name='password' value={password} onChange={handleChange} placeholder='Password'/>
      <button type='submit'>LogIn</button>
    </form>
  )
}
