import React, { useEffect, useState } from 'react'
import './Addachievement.css'
import upload_area from '../../assets/upload_area.svg'
import {useForm} from 'react-hook-form';
import Achievement from '../Achievement/Achievement'
import { useNavigate } from 'react-router-dom';
const Addachievement = () => {
  let {register,handleSubmit,formState:{errors},reset }=useForm();
  let [image,setimage]=useState(false);
  let [achievements,setachievements]=useState([]);
  const [selectedValues, setSelectedValues] = useState({ department: "", category: "" });
  let navigate=useNavigate();
  function imagehandler(e){
    setimage(e.target.files[0]);
  }
  async function getachievements(){
    await fetch('http://localhost:4000/allachievements')
    .then(res=>res.json())
    .then((data)=>setachievements(data))
  }
  function getselectedachievements(event){
    let newselectedval={};
    if(event.target.name==='department')
      newselectedval.department=event.target.value;
    if(event.target.name==='category')
      newselectedval.category=event.target.value;
    setSelectedValues({...selectedValues,...newselectedval})
  }
  async function addachievement(achievementDetails){
    console.log(achievementDetails);
    let responsedata;
    let formData=new FormData();
    formData.append('image',image);
    await fetch('http://localhost:4000/upload',{
      method:"POST",
      headers:{
        Accept:'application/json',
      },
      body:formData
    }).then((resp)=>resp.json()).then((data)=>{responsedata=data})
    if(responsedata.success){
      achievementDetails.image=responsedata.image_url;
      console.log(achievementDetails);
      await fetch('http://localhost:4000/addachievement',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(achievementDetails),
      }).then((res=>res.json())).then((data)=>{
        if(data.success){
          reset();
          setimage(false);
          navigate(0);
          getachievements();
        }else{
          alert('Failed');
        }
      })
    }
  }
  useEffect(()=>{
    getachievements();
  },[]);
  return (
    <div className='addachievement-outerdiv'>
    <div className='addachievement'>
      <form onSubmit={handleSubmit(addachievement)}>
      <div className="addachievement-fields">
        <p>Achievement title</p>
        <input type="text" name='title' placeholder='Type here' {...register("title",{required:true,maxLength:24,minLength:4})} />
      </div>
      <div className="addachievement-flex">
      <div className="addachievement-fields">
        <p>Student Name</p>
        <input type="text" name='title' placeholder='Type here' {...register("name",{required:true,maxLength:18,minLength:4})} />
      </div>

      <div className="addachievement-fields-f">
        <div>
        <p>Department</p>
        <select name="department" className={errors.category?.type==='required'?"addachievement-selector required":"addachievement-selector"} {...register('department',{required:true})} onChange={getselectedachievements} defaultValue="" >
          <option value=""  >--select--</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
          <option value="EEE">EEE</option>
        </select>
        </div>
      </div>

      <div className="addachievement-fields-f">
        <div>
        <p>Category</p>
        <select name="category" className={errors.category?.type==='required'?"addachievement-selector required":"addachievement-selector"} {...register('category',{required:true})} onChange={getselectedachievements} defaultValue="">
          <option value=""  >--select--</option>
          <option value="Academic">Academic</option>
          <option value="Sports">Sports</option>
          <option value="Cultural">Cultural</option>
        </select>
        </div>
      </div>
      </div>
      <div className="addachievement-fields">
      <p>Description</p>
        <textarea {...register("description")} className='description-box' id="description" rows="8"
        {...register("description",{required:true})}></textarea>
      </div>
      <div className="addachievement-fields">
      <p>Image</p>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className="uploading-img" alt="" />
        </label>
        <input onChange={imagehandler} type="file" name="image" id="file-input" hidden/>
      </div>
      <div className='addachievement-btn-div'>
      <button type='submit' className='addachievement-btn'>ADD</button>
      </div>
      </form>
      </div>
      <div className='achievements-main'>
      {
          achievements.map((item,i)=>{
            if((item.department===selectedValues.department || selectedValues.department==="") && (item.category===selectedValues.category || selectedValues.category===""))
            return <div className='allachievements-item'>
             <Achievement key={i} data={item}/>
            </div>
          }
          )
      }
      </div>
    </div>
  )
}

export default Addachievement