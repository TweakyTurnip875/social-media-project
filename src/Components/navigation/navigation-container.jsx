import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationContainer = (props) => {
  return (
    <div className="navigation-container">
      <div className="nav-wrapper">
        <div className="left">
        <div className="nav-link">
            <NavLink exact to="/" activeClassName="nav-link-active">
              home
            </NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/about" activeClassName="nav-link-active">
              about
            </NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/contact" activeClassName="nav-link-active">
              contact
            </NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/chat-home" activeClassName="nav-link-active">
              Chat Home
            </NavLink>
          </div>

        </div>
        
        <div className="right">
          Launch High School
        </div>
        
      </div>
      
    </div>
  )
}
export default NavigationContainer;