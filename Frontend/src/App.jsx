import React from 'react'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Navbar from './Components/Navbar'
import { useState } from 'react'

const App = () => {
  const [currPage, setCurrPage] = useState("login")
  return (
    <>
      {(currPage === "login" || currPage === "signup") && (
        <Navbar setCurrPage={setCurrPage} />
      )}
      {currPage === "login" && <Login setCurrPage={setCurrPage} />}
      {currPage === "signup" && <Signup setCurrPage={setCurrPage} />}
      {currPage === "dashboard" && <Dashboard setCurrPage={setCurrPage} />}
    </>
  )
}

export default App