import axios from 'axios'
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateNote = () => {
    const navigate=useNavigate()
    const [notes,setNotes]=useState({
        title:"",
        content:"",
        subject:""
    })
    const {title,content,subject}=notes
    const [reset,setReset]=useState(notes)
    const handleInput=(e)=>{
        const {name,value}=e.target
        setNotes({...notes,[name]:value})
    }
    const createNote=async()=>{
        const token=localStorage.getItem("access-token")
        const {data}=await axios.post("http://localhost:3000/create-note",notes,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        }) 
        setNotes(reset)
        // console.log(data);   
        toast.success("Note Created Successfully")
        navigate("/user_dashboard")
    }
    const handleForm=async(e)=>{
        e.preventDefault()
        createNote()
    }
  return (
    <div className='w-screen h-[91vh] flex items-center justify-center flex-col'>
        <div className='w-[35%] h-[70%] shadow-2xl shadow-black bg-blue-300'>
            <div className='w-full h-[20%] flex items-center justify-center'>
                <h1 className='text-3xl font-mono font-semibold'>Create Note</h1>
            </div>
            <form action="" onSubmit={handleForm} className='w-full h-[75%] flex items-center justify-center flex-col ' >
                <input type="text" placeholder='Subject' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='subject' value={subject} onChange={handleInput} required/> <br />
                <input type="text" placeholder='Title' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='title' value={title} onChange={handleInput} required/> <br />
                <textarea type="text" placeholder='Content' rows="5" cols="20" className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='content' value={content} required onChange={handleInput} /><br />
                <div className='w-[75%]  flex items-center justify-center'>
                    <button className='w-full h-full  py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-[1s] font-semibold '>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateNote
