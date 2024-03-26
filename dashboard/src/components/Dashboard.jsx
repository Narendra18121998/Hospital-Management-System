import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from "react-toastify"
import {GoCheckCircleFill} from "react-icons/go";
import {AiFillCloseCircle} from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Dashboard = () => {
  const{isAuthenticated,admin} = useContext(Context)
  const [appointments,setAppointments]=useState([]);
  
  useEffect(()=>{
    const fetchAppointments=async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/appointment/get/appointments",{withCredentials:true})
        setAppointments(response.data.appointments);
      } 
      catch (error) {
        console.log('Error occured while fetching appointments',error)
        setAppointments([]);  
      }
    }
    fetchAppointments();
  },[])

  const handleUpdateStatus=async(appointmentId,status)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/appointment/update/${appointmentId}` ,{status},{withCredentials:true})

      setAppointments(prevAppointments=>
          prevAppointments.map(appointment=>{
            if(appointment._id===appointmentId){
              return {...appointment,status}
            }
            return appointment;
          })
      )

      toast.success(response.data.message)
    }

    catch (error) {
      console.log(`Error while handling UpdateAppointmentStatus`,error)  
    }
}



  const handleDelete=async(appointmentId)=>{
      try {
        const response = await axios.delete(`http://localhost:5000/api/appointment/delete/${appointmentId}` , {withCredentials:true})

        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment._id !== appointmentId)
      );
        toast.success(response.data.message)
      }

      catch (error) {
        console.log(`Error while handling DeleteAppointment`,error)
        toast.error(error.response.data.message)  
      }
  }


  if(!isAuthenticated){
    return <Navigate to="/login" />
  }


  return (
    <>
      <section className='dashboard page'>
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docing" />
            <div className='content'>
              <div>
                <p>Hello,</p>
                <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
              </div>

              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae ipsam voluptate esse nulla deleniti accusantium doloremque atque autem tempora voluptatum nihil, totam illo veritatis ipsum aliquid dolor quia sint minima.</p>
            </div>

          </div>


          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>

          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{20}</h3>
          </div>

        </div>

        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Appointment Date</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited Before</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {
                appointments && appointments.length>0 ? (
                  appointments.map(appointment=>{
                    return (
                      <tr key={appointment._id}>
                        <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                        <td>{appointment.appointment_date}</td>
                        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                        <td>{appointment.department}</td>
                        <td>

                          <select className={appointment.status==="Pending" ? "value-pending" : appointment.status==="Accepted" ? "value-accepted" : "value-rejected"} value={appointment.status} onChange={(e)=>{handleUpdateStatus(appointment._id ,e.target.value)}}>
                            <option value="Pending" className='value-pending'>Pending</option>
                            <option value="Rejected" className='value-rejected'>Rejected</option>
                            <option value="Accepted" className='value-accepted'>Accepted</option>

                            </select>
                        </td>

                        <td>{appointment.hasVisited===true ? <GoCheckCircleFill className='green'/> : <AiFillCloseCircle className='red' />}</td>

                        <td><MdOutlineDeleteOutline onClick={()=>handleDelete(appointment._id)}/></td>
                      </tr>
                    )
                  })
                ) : (<h1> No Appointments Available</h1>) 
              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard



