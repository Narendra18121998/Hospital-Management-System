import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
const About = () => {
  return (
    <>
       <Hero title={"Welcome to the ZeeCare Medical Institute | Your Trusted Healthcare Provider"} imageUrl={"/about.png"}/>
       <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default About

