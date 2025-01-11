import React, { useState } from 'react'
import register from "../../../images/register.png"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const navigate=useNavigate()
    const [inp,setInp]=useState({
        username:"",
        email:"",
        number:"",
        age:"",
        password:""
    })
    const [reset,setReset]=useState(inp)

    let {username,email,number,age,password}=inp
    const handleInput=(e)=>{
        let {name,value}=e.target
        setInp({...inp,[name]:value})
    }
    const handleForm=async(e)=>{
        e.preventDefault()
        // console.log(data);
        setInp(reset)
        const {data}=await axios.post("http://localhost:3000/register",inp)
        // data.message=="User register successfully"?toast.success("Regirstation Successfull"):toast.error("Invalid Credential")
        // toast.success("Registered Successfully")
        if (data.message=="User register successfully"){
            toast.success("Regirstation Successfull")
            
            navigate("/login")   
        }
        else{
            toast.error("Already have an account")
        }
           
        
    }
  return (
    <div>
       <div className='w-screen h-[91vh] flex '>
        <div className='w-[60%] h-[100%] flex items-center justify-center'>
            <img src={register} alt="" className='w-[65%] h-[65%] '/>
            {/* image */}
            
        </div>
        <div className='w-[40%] h-[100%] flex items-center justify-center flex-col'>
            <div className='w-[70%] h-[75%]  shadow-2xl shadow-black flex flex-col bg-blue-300'>
                <div className='w-[100%] h-[20%]  flex items-center justify-center'>
                    <h1 className='text-3xl font-mono font-semibold'>Register</h1>
                </div>
                <form action="" className='w-[100%] h-[80%]  flex items-center justify-center flex-col' onSubmit={handleForm}>
                    <input type="text" placeholder='Name' className='w-[75%] px-2 py-2 outline-none border-2 border-black rounded-[7px]' name='username' value={username} onChange={handleInput} required/> <br />
                    <input type="email" placeholder='Email' className='w-[75%] px-2 py-2 outline-none border-2 border-black rounded-[7px]' name='email' value={email} onChange={handleInput} required/> <br />
                    <input type="number" placeholder='Number' className='w-[75%] px-2 py-2 outline-none border-2 border-black rounded-[7px]' name='number' value={number} onChange={handleInput} required/> <br />
                    <input type="number" placeholder='Age' className='w-[75%] px-2 py-2 outline-none border-2 border-black rounded-[7px]' name='age' value={age} onChange={handleInput} required/> <br />
                    <input type="password" placeholder='Password' className='w-[75%] px-2 py-2 outline-none border-2 border-black rounded-[7px]'name='password' value={password} onChange={handleInput} required/> <br />
                    <div className='w-[75%]  flex items-center justify-center'>
                        <button className='w-full h-full  py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-[1s]  font-semibold'>Register</button>
                    </div>
                </form>
            </div>

        </div>
        </div>
        <ToastContainer/>
    </div>

  )
}

export default Register
