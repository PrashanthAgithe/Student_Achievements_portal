import React from 'react'
import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import add_achievement_logo from '../../assets/add_achievement_logo.png'
import all_achievement_logo from '../../assets/all_achievement_logo.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to='' className='nav-link'>
        <div className='sidebar-item'>
          <img src={all_achievement_logo} className='sidebar-logo'  alt="" /> 
          All Achievements
        </div>
        </NavLink>
      <NavLink to='addachievements' className='nav-link'>
        <div className='sidebar-item'>
          <img src={add_achievement_logo} className='sidebar-logo' alt="" /> 
          Add Achievement
        </div>
        </NavLink>
    </div>
  )
}

export default Sidebar