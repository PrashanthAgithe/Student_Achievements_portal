import React,{ useEffect, useState } from 'react'
import './Allachievements.css'
import Achievement from '../Achievement/Achievement'
const Allachievements = () => {
  let [all_achievements,setall_achievements]=useState([]);
  async function fetachievements(){
    await fetch('http://localhost:4000/allachievements')
    .then(res=>res.json())
    .then((data)=>setall_achievements(data))
  }
  async function removeachievement(i){
    let achievement={...all_achievements[i]};
    let response;
    await fetch('http://localhost:4000/removeachievement',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(achievement)
    })
    .then(res=>res.json()).then(data=>response=data)
    console.log(response)
    if(response.success){
      let temp_achievements=[...all_achievements];
      temp_achievements.splice(i,1);
      setall_achievements(temp_achievements);
    }else{
      alert('Not Removed')
    }
  }
  useEffect(()=>{
    fetachievements()
  },[])
  return (
    <div className='allachievements'>
      <h1>Student Achievements</h1>
      <div className='achievements-main'>
      {
          all_achievements.map((item,i)=>
            <div className='allachievements-item'>
             <Achievement key={i} data={item}/>
             <button onClick={()=>removeachievement(i)}>Remove</button>
            </div>
          )
      }
      </div>
    </div>
  )
}

export default Allachievements