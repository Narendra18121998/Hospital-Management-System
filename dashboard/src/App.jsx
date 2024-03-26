import React, { useContext,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Messages from './components/Messages'
import AddNewAdmin from './components/AddNewAdmin'
import AddNewDoctor from './components/AddNewDoctor'
import Doctors from './components/Doctors'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main';
import axios from 'axios'

const App = () => {
  const {isAuthenticated,setIsAuthenticated,setAdmin} = useContext(Context)

  useEffect(()=>{
    const fetchAdmin = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/admin/details" , {withCredentials:true})
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } 
      catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    }
    fetchAdmin();
  },[isAuthenticated])

  return (
    <>
        <BrowserRouter>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/doctor/addnew" element={<AddNewDoctor />} />
            <Route path="/admin/addnew" element={<AddNewAdmin/>} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/doctors" element={<Doctors/>} />
          </Routes>
          <ToastContainer position='top-center'/>
        </BrowserRouter>
    </>
  )
}

export default App



