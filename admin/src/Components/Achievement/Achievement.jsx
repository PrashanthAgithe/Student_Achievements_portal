import React from 'react'
import './Achievement.css'
import { useNavigate } from 'react-router-dom';
const Achievement = (props) => {
  let navigate=useNavigate();
  function displayAchievemnt(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/achievement/${props.data.id}`,{state:props.data})
  }
  return (
    <div className='achievement' onClick={displayAchievemnt}>
      <img src={props.data.image} alt=""  />
      <p>{props.data.title}</p>
      <div className="achievement-name">
      <p>{props.data.name}</p>
      </div>
    </div>
  )
}

export default Achievement