import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'
const Appointment = () => {
  return (
    <>
      <Hero title={"Welcome to the ZeeCare Medical Institute | Your Trusted Healthcare Provider"} imageUrl={"/signin.png"}/>
      <AppointmentForm />
    </>
  )
}

export default Appointment
