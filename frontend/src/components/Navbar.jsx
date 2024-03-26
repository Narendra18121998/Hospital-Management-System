import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';
import axios from 'axios';
import {toast} from "react-toastify";
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
    const [show,setShow] = useState(false);
    const {isAuthenticated,setIsAuthenticated} = useContext(Context)
    const navigate = useNavigate();
    
    const handleLogout=async()=>{
        try {
           const response =  await axios.get("http://localhost:5000/api/patient/logout", {withCredentials:true})
           if(response.status===200){
                toast.success(response.data.message);
                setIsAuthenticated(false);
           }
        } 
        catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    };

    const handleLogin=()=>{
        navigate("/login")
    }

  return (
    <>
        <nav className='container'>
            <div className="logo"><img src="/logo.png" alt="logo" className='logo-img'/></div>

            <div className={show ? "navLinks showmenu":"navLinks"}>
                <div className="links">
                    <Link to='/' onClick={()=>setShow(!show)}>Home</Link>
                    <Link to='/appointment' onClick={()=>setShow(!show)}>Appointment</Link>
                    <Link to='/about' onClick={()=>{setShow(!show)}}>About Us</Link>
                </div>
                {
                    isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>Logout</button>) :(<button className='loginBtn btn' onClick={handleLogin}>Login</button>)
                }
            </div>

            <div className='hamburger' onClick={()=>setShow(!show)}>
                <GiHamburgerMenu />
            </div>
        </nav>
    </>
  )
}

export default Navbar

