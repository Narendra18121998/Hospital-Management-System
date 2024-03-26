import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';
const MessageForm = () => {
  const [input,setInput] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    message:""
  })

  const handleInput=(e)=>{
    const {name,value} = e.target;
    setInput({
      ...input,[name]:value
    })
  }

  const handleMessage=async(e)=>{
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/api/message/send',
      input, 
      {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      }
    )

      console.log(response)
      if(response.status===200){
        toast.success(response.data.message)
        setInput({firstName:"",lastName:"",email:"",phone:"",message:""})
      }
    }

    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      
    } 
  }

  return (
    <>
      <div className='container form-component message-form'>
        <h2>Send us a message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input type="text" placeholder='First Name' value={input.firstName} name="firstName" onChange={handleInput}/>

            <input type="text" placeholder='Last Name' value={input.lastName} name="lastName" onChange={handleInput}/>
          </div>

          <div>
          <input type="text" placeholder='Email' value={input.email} name="email" onChange={handleInput}/>

          <input type="number" placeholder='Phone' value={input.phone} name="phone" onChange={handleInput}/>
          </div>

          <textarea rows="7" placeholder="Message" value={input.message} name="message" onChange={handleInput}></textarea>

          <div style={{justifyContent:"center" ,alignItems:"center"}}>
              <button type='submit'>Send</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default MessageForm