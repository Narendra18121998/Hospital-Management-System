import React, { useContext,useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [docAvatar,setDocAvatar] = useState("")
  const[docAvatarPreview,setDocAvatarPreview]=useState("");
  const[doctorDepartment,setDoctorDepartment]=useState("");
  const {isAuthenticated}=useContext(Context)

  const handleAvatar=(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setDocAvatarPreview(reader.result)
      setDocAvatar(file);
    }
  }
  
  const departmentsArray=[
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT"
  ]

  const navigate=useNavigate();

  const handleAddNewDoctor=async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName",firstName)
      formData.append("lastName",lastName)
      formData.append("email",email)
      formData.append("phone",phone)
      formData.append("nic",nic)
      formData.append("dob",dob)
      formData.append("gender",gender)
      formData.append("password",password)
      formData.append("doctorDepartment",doctorDepartment)
      formData.append("docAvatar",docAvatar)
    

      const response = await axios.post("http://localhost:5000/api/doctor/addnew",formData,{withCredentials:true,
      headers:{"Content-Type":"multipart/form-data"}})
    
      toast.success(response.data.message)
      navigate("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
    } 
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  
  }

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }

  return (
    <>
        <section className='page'>
        <div className='container add-doctor-form'>
        <img src="/logo.png" alt="logo" className='logo'/>
        <h1 className='form-title'>Register New Doctor</h1>
      

        <form onSubmit={handleAddNewDoctor}>

          <div className="first-wrapper">
            <div>
              <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt="Doctor Avatar" />
              <input type="file" onChange={handleAvatar}/>
            </div>


          <div>
                <input type="text" placeholder='First Name' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder='Last Name' value={lastName}  onChange={(e)=>setLastName(e.target.value)}
                />
      
                <input type="text" placeholder='Email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                <input type="number" placeholder='Phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>

                <input type="number" placeholder='NIC' value={nic}  onChange={(e)=>setNic(e.target.value)}/>
                <input type="date" placeholder='Date of Birth' value={dob}  onChange={(e)=>setDob(e.target.value)}/>

                <select value={gender}  onChange={(e)=>setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

            <input type="password" placeholder='Password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>

            <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {
                departmentsArray.map((depart,index)=>{
                  return (
                    <option value={depart} key={index}>{depart}</option>
                  )
                })
              }
            </select>
            <button type='submit'>Register New Doctor</button>
          </div>

        </div>

          </form>
        </div>
        </section>
    </>
  )
}

export default AddNewDoctor



