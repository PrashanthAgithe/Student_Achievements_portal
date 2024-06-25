import React, { useEffect, useState } from 'react'
import './LoginAndRegister.css'
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
const LoginAndRegister = (props) => {
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors},clearErrors}=useForm();
  let [classe,setclasse]=useState('login-hide');
  let [err,seterr]=useState('')
  let [opaquepage,setpage]=useState('registerdiv');
  let [containerclass,setcontainerclass]=useState('loginAndRegister-container-login');
  function setopaquepage(){
    clearErrors();
    seterr('');
    if(opaquepage==='registerdiv') {
      setpage('logindiv');
      setcontainerclass('loginAndRegister-container-register')
    }
    else {
      setpage('registerdiv');
      setcontainerclass('loginAndRegister-container-login')
    }
  }
  async function loginandregister(userDetails){
    console.log(userDetails)
    if(opaquepage==='registerdiv'){
      let responsedata;
      await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userDetails),
      }).then(res=>res.json()).then(data=>responsedata=data)
      console.log(responsedata);
      if(responsedata.success){
        localStorage.setItem('student-admin',responsedata.name);
        setclasse('login-hide');
        props.fun('admin-main')
      }else{
        seterr(responsedata.message)
      }
    }else{
      let responsedata;
      await fetch('http://localhost:4000/register',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userDetails),
      }).then(res=>res.json()).then(data=>responsedata=data)
      console.log(responsedata);
      if(responsedata.success){
        setopaquepage();
      }else if(responsedata.error==='Admin already exist') {
        seterr(responsedata.error)
      }
    }
    // navigate(0);
  }
  useEffect(()=>{
    let result=localStorage.getItem('student-admin')
    // console.log(result)
    if(result==="") {
      props.fun('admin-main-blur')
      setclasse('login');
    }
  },[])
  return (
    <div className={classe}>
      <form onSubmit={handleSubmit(loginandregister)}>
      <div className={containerclass}>
        <div className='loginAndRegister-header'>
        <div className={opaquepage} onClick={setopaquepage}>
        </div>
          <h1>Register</h1>
          <h1>Login</h1>
        </div>
        <div className='loginAndRegister-fields'>
          <div>
          {
            err!==''?<p className='errordisplay'>{err}</p>:<></>
          }
          <input  type="text" name='name' placeholder='Username' {...register('username',{required:true})} className={errors.username?.type==='required'?"required":"input"}/>
          {/* {
            errors.username?.type==='required'?<p className='errordisplay'>Please enter username</p>:<></>
          } */}
          </div>
          {
            opaquepage==='logindiv'?<div>
              <input  type="email" name='email' placeholder='Email' {...register('email',{required:true})} className={errors.email?.type==='required'?"required":"input"}/>
            {/* {
              errors.email?.type==='required'?<p className='errordisplay'>Please enter email</p>:<></>
            } */}
            </div>:<></>
          }
          <div>
          <input  type="password" name='password' placeholder='Password'  {...register('password',{required:true})} className={errors.password?.type==='required'?"required":"input"} onPaste={(e)=>{e.preventDefault()}} onCopy={(e)=>{e.preventDefault()}} onCut={(e)=>{e.preventDefault()}}/>
          {/* {
            errors.password?.type==='required'?<p className='errordisplay'>Please enter password</p>:<></>
          } */}
          </div>
        </div>
        <div className="submitdiv">

        <button type='submit' className='submit-btn'>
        {
          opaquepage==='registerdiv'?"Login":"Register"
        }
        </button>
        {
          opaquepage==='logindiv'?<p className='loginAndRegister-login'>Already have an account? <span onClick={setopaquepage}>Login here</span></p>:<p className='loginAndRegister-login'>Don't have an account? <span onClick={setopaquepage}>Register here</span></p>
        }
        </div>
      </div>
      </form>
    </div>
  )
}

export default LoginAndRegister