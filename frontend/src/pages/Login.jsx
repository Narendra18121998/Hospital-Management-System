import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios';

const Login = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);
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
      const response = await axios.post("http://localhost:5000/api/login",{...input,role:"Patient"},{withCredentials:true,
      headers:{"Content-Type":"application/json"}})

          toast.success(response.data.message)
          setIsAuthenticated(true);
          navigate("/");
          setInput({email:"",password:"",confirmPassword:""})
        
    } 
    catch (error) {
      console.log('Error while fetching login API',error)
      toast.error(error.response.data.message)
    }
  }

  if(isAuthenticated){
    return <Navigate to='/' />
  }

  return (
    <>
        <div className='container form-component login-form'>
          <h2>Sign In</h2>
          <p>Please login to continue</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eveniet fugiat. Nemo perspiciatis laboriosam error!</p>

          <form onSubmit={handleLogin}>
              <input type="text" value={input.email} name="email" onChange={handleInput} placeholder='Email'/>
              <input type="password" value={input.password} name="password" onChange={handleInput} placeholder='Password'/>
              <input type="password" value={input.confirmPassword} name="confirmPassword" onChange={handleInput} placeholder='Confirm Password'/>

              <div style={{gap:"10px" ,justifyContent:"flex-end", flexDirection:"row"}}>
                  <p style={{marginBottom:"0"}}>Not Registered</p>
                  <Link to="/register" style={{textDecoration:"none",alignItems:"center"}}>Register Now</Link>
              </div>

              <div style={{justifyContent:"center" , alignItems:"center"}}>
                <button type='submit'>Login</button>
              </div>

          </form>
        </div>

    </>
  )
}

export default Login

