import React from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";
import { useState } from 'react';

const Login = () => {
  const{isAuthenticated,setIsAuthenticated} = useContext(Context);
  const[input,setInput] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })

  const navigate = useNavigate();

  const handleInput=(e)=>{
    const{name,value} = e.target;
    setInput({...input,[name]:value})
  }

  
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login",{...input,role:"Admin"},{withCredentials:true,
      headers:{"Content-Type":"application/json"}})

      
          toast.success(response.data.message)
          setIsAuthenticated(true)
          navigate("/");
          setInput({email:"",password:"",confirmPassword:""})
          
    
    } 
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  if(isAuthenticated){
    return <Navigate to='/' />
  }

  return (
    <>
      <div className="container form-component">
        <img src="/logo.png" alt="logo"  className="logo"/>
        <h1 className="form-title">Welcome to Zeecare</h1>
        <p>Only admins are allowed to access to these resources</p>
          <form onSubmit={handleLogin}>
              <input type="text" value={input.email} name="email" onChange={handleInput} placeholder='Email'/>
              <input type="password" value={input.password} name="password" onChange={handleInput} placeholder='Password'/>
              <input type="password" value={input.confirmPassword} name="confirmPassword" onChange={handleInput} placeholder='Confirm Password'/>

              <div style={{justifyContent:"center" , alignItems:"center"}}>
                <button type='submit'>Login</button>
              </div>

          </form>
        </div>

    </>
  )
}

export default Login



