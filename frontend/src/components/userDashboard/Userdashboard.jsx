import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Userdashboard = () => {
  const navigate=useNavigate()
  const [notes,setNotes]=useState(null)
  const getUserNotes=async()=>{
    const token=localStorage.getItem("access-token")
    const {data}=await axios.get("http://localhost:3000/get-notes",{
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json'
      }
    })
    // console.log(data);
    setNotes(data.data)
  }
  useEffect(()=>{
    getUserNotes()
  },[])

  const handleDeleteNote=async(ele)=>{
    const token=localStorage.getItem("access-token")
    // console.log(token);
    
   try {
    if(!token){
      toast.error("There is no token")
    }
    else{
      const {data}=await axios.delete(`http://localhost:3000/delete-note/${ele._id}`,{
         headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
      })

    }
   } catch (error) {
    // console.log("error in catch block");
    
   }
    // console.log("Deleted in UserDashboard");
    
  }
  return (
    <div className='w-screen h-[91vh] flex items-start justify-start p-3'>
      
      <div className='w-[92%] h-[100%] flex items-start justify-start gap-2 flex-wrap '>
      {
        notes?.map((e,index)=>(
          <div key={index} className='w-[23%] bg-slate-800 rounded text-white  '>
            <h1 className='w-[100%] h-[20%] px-2 py-1'>Subject:-<span>{e.subject}</span></h1> <hr />
            <h3 className='w-[100%] h-[20%] px-2 py-1'>Title:-{e.title}</h3> <hr />
            <p className='w-[100%] h-[50%] px-2 py-1'>Content:-{e.content}</p>
             <div className='w-[100%] flex items-end justify-between'>
               <h1 className='text-2xl px-2 py-1 hover:text-green-600'><Link to="/update_note" state={e}><MdOutlineEditCalendar /></Link></h1>
               <button className='text-2xl px-2 py-1 hover:text-red-600' onClick={()=>{handleDeleteNote(e)}}><MdDelete /></button>
             </div>
          </div>
        ))
      }
      </div>
      <div className='w-[8%] h-[100%] flex items-end justify-center'>
          <h1 className='text-6xl'><Link to='/create_note'><IoIosAddCircle /></Link></h1>
      </div>
    </div>
  )
}

export default Userdashboard
