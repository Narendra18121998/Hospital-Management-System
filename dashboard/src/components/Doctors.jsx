import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';
import axios from 'axios'

const Doctors = () => {
  const {isAuthenticated} = useContext(Context)
  const [doctors,setDoctors] = useState([]);
  
  useEffect(()=>{
    const fetchDoctors=async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/doctors",{withCredentials:true})
        setDoctors(response.data.doctors);
      } 
      catch (error) {
        console.log("Error while fetching all doctors",error)  
      }
    }
    fetchDoctors();
  },[])

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }
  return (
    <>
        <section className='page doctors'>
          <h1>Doctors</h1>
          <div className="banner">
            {
              doctors && doctors.length>0 ? (doctors.map((doctor,index)=>{
                return (
                  <div className="card" key={index}>
                    <img src={doctor.docAvatar && doctor.docAvatar.url} alt="Doctor Avatar" />
                    <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>

                    <div className="details">
                      <p>Email:<span>{doctor.email}</span></p>
                      <p>Phone:<span>{doctor.phone}</span></p>
                      <p>DOB:<span>{doctor.dob.substring(0,10)}</span></p>
                      <p>Department:<span>{doctor.doctorDepartment}</span></p>
                      <p>NIC:<span>{doctor.nic}</span></p>
                      <p>Gender:<span>{doctor.gender}</span></p>
                    </div>
                  </div>
                )
              })) : <h1>No Registerd doctors found</h1>
            }
          </div>
        </section>
    </>
  )
}

export default Doctors



