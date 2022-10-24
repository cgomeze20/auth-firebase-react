import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Rutas } from './router/rutas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Rutas/>
  </React.StrictMode >
)
