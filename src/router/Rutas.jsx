import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import { AppProvider } from '../Context/AppProvider'
import { LogIn } from '../Routes/LogIn'
import { Settings } from '../Routes/Settings'
import { SingUp } from '../Routes/SingUp'
import { Tasks } from '../Routes/Tasks'

export const Rutas = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route paht='/' element={<App />}>
            <Route index element={<LogIn />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SingUp />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
