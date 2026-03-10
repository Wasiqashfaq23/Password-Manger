import React from 'react'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Passwords from './Components/Dashboard/Dashboard'
import Dashboard from './Components/Dashboard/Dashboard'
const App = () => {
  return (
    <>
    <Dashboard/>
    <Passwords/>
    <Login/>
    <Signup/>
    </>
  )
}

export default App