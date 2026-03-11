import Signup from '../Components/Signup/Signup'
import Login from '../Components/Login/Login'
import Dashboard from '../Components/Dashboard/Dashboard'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'

const App = () => {
  const [currPage, setCurrPage] = useState("login")
  async function handleRedirect() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-cookie`, {
      method: "GET",
      credentials: "include",
    })
    console.log(res.ok)
    if (res.ok) {
      setCurrPage("dashboard")
    } else {
      setCurrPage("login")
    }
    
  }
  useEffect(() => {
    (async()=>{
      await handleRedirect();
    })()
  }, [])
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