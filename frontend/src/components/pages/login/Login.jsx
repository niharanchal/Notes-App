import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from "../../../images/log.png"
import paper from "../../../images/paper.jpg"
import axios from 'axios'
import { toast } from 'react-toastify'
import confetti from 'react-canvas-confetti'



const Login = () => {
    const launchConfetti=()=>{
        var end = Date.now() + (15 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
    }
    const navigate=useNavigate()
    const [inp,setInp]=useState({
        email:"",
        password:""
    })
    const [reset,setReset]=useState(inp)
    let {email,password}=inp
    const handleInput=(e)=>{
        let {name,value}=e.target
        setInp({...inp,[name]:value})
    }
    const handleForm=async(e)=>{
        e.preventDefault()
        // console.log(data);
        setInp(reset)
        try {
            const {data}=await axios.post("http://localhost:3000/login",inp)
            console.log(data);
            
        // data.message=="login Successfull"?toast.success("Login Successfull"):toast.error("Invalid Credential")
        // console.log(data);
        const {message,token,username}=data
        // console.log(username);
        
        // console.log(username.username);
        const first_name=username
        console.log(first_name);
        
        
        if(token){
            localStorage.setItem("access-token",token)
            localStorage.setItem("username",first_name)
            toast.success("Login Successfull")
            navigate("/user_dashboard")
            launchConfetti()
        }
        else{
            toast.error("Invalid Credential")
        }
        } catch (error) {
            toast.error("Login Failed")
        }
    }
  return (
    <div className='w-screen h-[91vh] flex'>
        <div className='w-[60%] h-[100%] flex items-center justify-center'>
            <img src={image} alt="" className='w-[65%] h-[55%]' />
            {/* image */}
            
        </div>
        <div className='w-[40%] h-[100%] flex items-center justify-center flex-col '>
           <div className='w-[70%] h-[65%]  shadow-2xl shadow-black flex flex-col bg-blue-300 '>
                <div className='w-[100%] h-[25%]  flex items-center justify-center'>
                    <h1 className='text-3xl font-mono font-semibold'>Login</h1>
                </div>
                <form action=""  className='w-[100%] h-[65%]  flex items-center justify-center flex-col' onSubmit={handleForm}>
                    <input type="email" placeholder='Email' className='w-[75%]  px-2 py-2 rounded-[7px]  outline-none' name='email' value={email} onChange={handleInput} required /> <br />
                    <input type="password" placeholder='Password' className='w-[75%] px-2 py-2 rounded-[7px] outline-none' name='password' value={password} onChange={handleInput} required /> 
                    <div className='w-[75%]'>
                        <h3 className='text-end text-blue-950'><Link to="/reset">Forgot Password</Link></h3>
                    </div> <br />
                    <div className='w-[75%]  flex items-center justify-center'>
                        <button className='w-full h-full  py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-[1s] font-semibold'>Submit</button>
                    </div>
                    <div className='w-[75%] flex items-start'>
                        <h3>Don't have an account?<span className='font-bold text-blue-950'><Link to='/register'>Register here</Link></span> </h3>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Login
