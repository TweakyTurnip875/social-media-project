import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationContainer = (props) => {
  return (
    <div className="navigation-container">
      <div className="nav-wrapper">
        <div className="left">
          <NavLink exact to="/">
            home
          </NavLink>
          <NavLink to="/posts">
            posts
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </div>
        <div className="right">
          Welcome
        </div>
      </div>
    </div>
  )
}
export default NavigationContainer;