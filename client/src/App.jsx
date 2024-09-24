import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Router } from 'react-router-dom'
import ApplicationViews from './ApplicationView'

function App() {

  return (
    <BrowserRouter>
      <ApplicationViews/>
    </BrowserRouter>
  )
}

export default App
