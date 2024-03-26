import React, { useContext,useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Register = () => {
  const {isAuthenticated}=useContext(Context)
  const[input,setInput] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    nic:"",
    dob:"",
    gender:"",
    password:""
  })

  const handleInput=(e)=>{
    const{name,value} = e.target;
    setInput({...input,[name]:value})
  }

  const navigate=useNavigate();

  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patient/register",input,{withCredentials:true,
      headers:{"Content-Type":"application/json"}})
      toast.success(response.data.message)
      setInput({firstName:"",lastName:"",email:"",phone:"",nic:"",dob:"",gender:"",password:""})
      navigate("/");
    } 
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  
  }

  if(isAuthenticated){
    return <Navigate to="/" />
  }

  return (
    <>
      <div className='container form-component register-form'>
        <h2>Sign Up</h2>
        <p>Please sign up to continue</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ducimus eveniet illo animi explicabo dolorum.</p>

        <form onSubmit={handleRegister}>
              <div>
                <input type="text" placeholder='First Name' value={input.firstName} name="firstName" onChange={handleInput}/>
                <input type="text" placeholder='Last Name' value={input.lastName} name="lastName" onChange={handleInput}
                />
              </div>
              <div>
                <input type="text" placeholder='Email' value={input.email} name="email" onChange={handleInput}/>
                <input type="number" placeholder='Phone' value={input.phone} name="phone" onChange={handleInput}/>
              </div>
              <div>
                <input type="number" placeholder='NIC' value={input.nic} name="nic" onChange={handleInput}/>
                <input type="date" placeholder='Date of Birth' value={input.dob} name="dob" onChange={handleInput}/>
              </div>
              <div>
                <select value={input.gender} name="gender" onChange={handleInput}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="password" placeholder='Password' value={input.password} name="password" onChange={handleInput}/>
              </div>

              <div style={{gap:"10px" ,justifyContent:"flex-end", flexDirection:"row"}}>
                  <p style={{marginBottom:"0"}}>Already Registered?</p>
                  <Link to="/login" style={{textDecoration:"none",alignItems:"center"}}>Login Now</Link>
              </div>

              <div style={{justifyContent:"center" , alignItems:"center"}}>
                <button type='submit'>Register</button>
              </div>

          </form>
      </div>
    </>
  )
}

export default Register




