import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {isAuthenticated} = useContext(Context);

  useEffect(()=>{
    const fetchMessages =async()=>{
        try {
          const response  = await axios.get("http://localhost:5000/api/message/get/allmessages" , {withCredentials:true})
          setMessages(response.data.messages);
        } 
        catch (error) {
          console.log("Error occured while fetching messages",error);
        }
    }
    fetchMessages();
  },[])

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }

  return (
    <>
      <section className='page messages'>
        <h1>Messages</h1>
        <div className="banner">
          {
            messages && messages.length > 0 ? ( messages.map((message,index)=>{
              return (
                <div className="card" key={index}>
                    <div className="details">
                      <p>FirstName:<span>{message.firstName}</span></p>
                      <p>LastName:<span>{message.lastName}</span></p>
                      <p>Email:<span>{message.email}</span></p>
                      <p>Phone:<span>{message.phone}</span></p>
                      <p>Message:<span>{message.message}</span></p>
                    </div>
                </div>
              )
            })
            )
            :(<h1>No Messages found</h1>)
          }
        </div>
      </section>
    </>
  )
}

export default Messages




