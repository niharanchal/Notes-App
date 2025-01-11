import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import paper from "../../../images/reset.jpg"

const ResetPassword = () => {
    const navigate=useNavigate()
 const [inp,setInp]=useState({
    email:"",
    password:"",
    confirmpassword:""
 })
 const {email,password,confirmpassword}=inp
 const [reset,setReset]=useState(inp)
 const handleInput=(e)=>{
    let {name,value}=e.target
    setInp({...inp,[name]:value})
 }
 const handleForm=async(e)=>{
    e.preventDefault()
    // console.log(data);
    setInp(reset)

    const {data}=await axios.put("http://localhost:3000/reset",inp)
    console.log(data);
    toast.success("Password Reset Successfully",{position:"top-right"})
    navigate("/login")
    
 }

  return (
    <div className='w-screen h-[91vh] flex items-center justify-center  '>
        <div className='w-[35%] h-[60%] flex items-center justify-center flex-col shadow-2xl shadow-black bg-blue-300'>
            <div className='w-full h-[25%] flex items-center justify-center'>
                <h1 className='text-3xl font-mono font-semibold'>Reset Your Password</h1>
            </div>
            <form action="" className='w-full h-[75%] flex items-center justify-center flex-col ' onSubmit={handleForm}>
                <input type="email" placeholder='Email' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='email' value={email} onChange={handleInput} required/> <br />
                <input type="password" placeholder='Password' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='password' value={password} onChange={handleInput} required /> <br />
                <input type="password" placeholder='Confirm Password' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='confirmpassword' value={confirmpassword} required onChange={handleInput}/><br />
                <div className='w-[75%]  flex items-center justify-center'>
                        <button className='w-full h-full  py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-[1s] font-semibold '>Reset Password</button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword
