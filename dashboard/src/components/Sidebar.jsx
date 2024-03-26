import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {TiHome} from "react-icons/ti"
import {RiLogoutBoxFill} from "react-icons/ri"
import {AiFillMessage} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import {FaUserDoctor} from "react-icons/fa6"
import {MdAddModerator} from 'react-icons/md'
import {IoPersonAddSharp} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import axios from 'axios'

const Sidebar = () => {
  const [show,setShow] = useState(false);
  const {isAuthenticated,setIsAuthenticated} = useContext(Context)

  const navigate = useNavigate();
  const gotoHome=()=>{
    navigate("/")
    setShow(!show)
  }

  const gotoDoctorsPage=()=>{
    navigate("/doctors")
    setShow(!show)
  }

  const gotoAddNewDoctor=()=>{
    navigate("/doctor/addnew")
    setShow(!show)
  }

  const gotoAddNewAdmin=()=>{
    navigate("/admin/addnew")
    setShow(!show)
  }

  const gotoMessages=()=>{
    navigate("/messages")
    setShow(!show)
  }

  const handleAdminLogout=async()=>{
    try {
       const response =  await axios.get("http://localhost:5000/api/admin/logout", {withCredentials:true})
            toast.success(response.data.message);
            setIsAuthenticated(false);
    } 
    catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
};

  return (
    <>
        <nav style={!isAuthenticated ? {display:"none"} : {display:"flex"} } className={show?"show sidebar":"sidebar"}>
          <div className='links'>
              <TiHome onClick={gotoHome}/>
              <FaUserDoctor onClick={gotoDoctorsPage}/>
              <MdAddModerator onClick={gotoAddNewAdmin}/>
              <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
              <AiFillMessage onClick={gotoMessages}/>
              <RiLogoutBoxFill onClick={handleAdminLogout}/>
          </div>

          <div className='wrapper' style={!isAuthenticated ? {display:"none"} : {display:"flex"} } >
            <GiHamburgerMenu className='hamburger' onClick={()=>setShow(!show)} />
          </div>
        </nav>  
    </>
  )
}

export default Sidebar

