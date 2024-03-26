import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const navigate = useNavigate();
    const [doctors,setDoctors] = useState([])
    const[doctorFirstName,setDoctorFirstName]=useState("");
    const[doctorLastName,setDoctorLastName]=useState("");
    const[department,setDepartment]=useState("Pediatrics");
    const[hasVisited,setHasVisited]=useState("");
    const[appointmentDate,setAppointmetDate]=useState()
    const[input,setInput] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        nic:"",
        dob:"",
        gender:"",
        address:""
      })

      const handleInput=(e)=>{
        const{name,value} = e.target;
        setInput({...input,[name]:value})
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

      useEffect(()=>{
        const fetchDoctors = async()=>{
            const response = await axios.get("http://localhost:5000/api/doctors",{withCredentials:true})
            setDoctors(response.data.doctors);
        }
        fetchDoctors();
      },[])

      const handleAppointment=async(e)=>{
        e.preventDefault();
        try {
            const hasVisitedBoolean = Boolean(hasVisited);
            const response = await axios.post("http://localhost:5000/api/appointment/post",{...input,doctor_firstName:doctorFirstName,doctor_lastName:doctorLastName,hasVisited:hasVisitedBoolean,department,appointment_date:appointmentDate} ,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
            toast.success(response.data.message);
            navigate("/")
        } 
        catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
      }

  return (
    <>
         <div className='container form-component appointment-form'>
        <h2>Appointment</h2>

        <form onSubmit={handleAppointment}>
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
                <input type="date" placeholder='Appointment Date' value={appointmentDate} onChange={(e)=>setAppointmetDate(e.target.value)} />
              </div>


                <div>
                    <select value={department} onChange={(e)=>{
                        setDepartment(e.target.value);
                        setDoctorFirstName("");
                        setDoctorLastName("")
                        }}>
                        {
                            departmentsArray.map((depart,index)=>{
                                return (
                                    <option value={depart} key={index}>{depart}</option>
                                )
                            })
                        }
                    </select>

                    <select value={`${doctorFirstName} ${doctorLastName}`} onChange={(e)=>{
                        //console.log(e.target.value);
                        const [firstName,lastName] = e.target.value.split(" ");
                        setDoctorFirstName(firstName)
                        setDoctorLastName(lastName)
                    }}
                    disabled={!department}
                    >
                        <option value="">Select Doctor</option>
                        {
                             doctors.filter((doctor)=>doctor.doctorDepartment===department).map((doctor,index)=>{
                                return (
                                    <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                )
                             })
                            
                        }
                    </select>
                </div>


                <textarea rows="10" value={input.address} name="address" onChange={handleInput} placeholder='Address' />

                <div style={{gap:"10px" ,justifyContent:"flex-end", flexDirection:"row"}}>
                  <p style={{marginBottom:"0"}}>Have you visited before?</p>
                  <input type="checkbox" checked={hasVisited} onChange={(e)=>setHasVisited(e.target.checked)}style={{flex:"none",width:"25px"}}/>
                </div>

              <div style={{justifyContent:"center" , alignItems:"center"}}>
                <button type='submit'>Get Appointment</button>
              </div>

          </form>
      </div>
    </>
  )
}

export default AppointmentForm



