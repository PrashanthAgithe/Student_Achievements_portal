import React from 'react'
import './Achievementpage.css'
import { useLocation,useNavigate } from 'react-router-dom'
const Achievementpage = (props) => {
  let {state}=useLocation();
  let navigate=useNavigate();
  async function removeachievement(){
    let response;
    await fetch('http://localhost:4000/removeachievement',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(state)
    })
    .then(res=>res.json()).then(data=>response=data)
    console.log(response)
    if(response.success){
      navigate('/allachievements')
    }else{
      alert('Not Removed')
    }
  }
  return (
    <div className='achievementdisplay'>
      <div className="achievementdisplay-left">
        <div className="achievementdisplay-img">
          <img className='achievementdisplay-main-img' src={state.image} alt="" />
        </div>
        <button onClick={()=>removeachievement()}>Remove</button>
      </div>
      <div className="achievementdisplay-right">
        <h1>{state.title}</h1>
        <div className="achievementdisplay-right-details">
          <div className="achievementdisplay-right-f">
            Student Name
            <hr />
            <span>{state.name}</span>
          </div>
          <div className="achievementdisplay-right-f">
            Deparment
            <hr />
            <span>{state.department}</span>
          </div>
          <div className="achievementdisplay-right-f">
            Category
            <hr />
            <span>{state.category}</span>
          </div>
        </div>
        <div className="achievementdisplay-right-description">
          {state.description}
        </div>
      </div>
    </div>
  )
}

export default Achievementpage