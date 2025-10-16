import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloComponent from './HelloComponent.tsx'

function App() {


  return (
    <>
      <HelloComponent name="김일" age={5} />
    </>
  )
}

export default App
