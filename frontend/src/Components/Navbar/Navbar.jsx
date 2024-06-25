import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.jpg'
import navProfile from '../../assets/Admin-profile.webp'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  let navigate=useNavigate();
  let islogin=localStorage.getItem('student-admin')
  function signout(){
    localStorage.setItem('student-admin',"")
    navigate(0);
  }
  return (
    <div className='navbar'>
      <img src={navlogo} alt=""  className='nav-logo'/>
      <div className='admin-profile'>
      <img src={navProfile} alt="" className='nav-profile'/>
      <h3 style={{color:'orange'}}>Admin {islogin!==""?islogin:" ?"}</h3>
      {
        islogin!==""?<button className='signout-btn' onClick={signout}>Signout</button>:<></>
      }
      </div>
    </div>
  )
}

export default Navbar