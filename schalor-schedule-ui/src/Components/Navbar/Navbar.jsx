import * as React from "react"
import "./Navbar.css"
import NavLinks from "./NavLinks"
// import {Link} from "react-router-dom"

export default function Navbar({isLoggedIn, user, setUser, handleOnLogout}) {
  return (
    <nav className="navbar">
      <NavLinks
        isLoggedIn = {isLoggedIn}
        user={user}
        setUser={setUser}
        handleOnLogout={handleOnLogout}
         />    
    </nav>
  )
} 