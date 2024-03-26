import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Appointment from './pages/Appointment'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context } from './main'
import Footer from './components/Footer'

const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context)
  
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/patient/details" , {withCredentitals:true})
        setIsAuthenticated(true);
        setUser(response.data.user);
      } 
      catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  },[isAuthenticated])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position='top-center'/>
      </BrowserRouter>
    </>
  )
}

export default App
