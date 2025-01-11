import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from "../../images/logo.png"

const Navbar = () => {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.clear()
    toast.success("Logout Successfully")
    navigate("/login")
  }

  const username=localStorage.getItem("username")
  // console.log(username);
  const first_letter=username?.split(" ").map((e)=>e[0]).join("").toUpperCase()
  // console.log(first_letter);
  
  const user=localStorage.getItem("access-token")
  return (
    <nav className='w-screen h-16 shadow-lg shadow-black flex justify-between'>
        <div className='w-[15%] h-[100%] ps-4 flex items-center justify-center font-mono italic text-[20px]'><Link to='/'><img src={logo} alt="" className='w-[45%] h-[30%] '/></Link></div>
        <div className='w-[15%] h-[100%] flex items-center justify-center'>
            {/* <button className='border-[2px] border-black bg-black text-white px-1'><Link to="/register">Register</Link></button> */}
            {
              user ? <div className='w-[100%] h-[100%] flex items-center gap-[40px]'>
                 <div className='w-[15%] h-[50%] rounded-full bg-blue-900 flex items-center justify-center cursor-pointer hover:bg-blue-950 text-white font-semibold transition-[all 2s]'>{first_letter}</div>
                <button className='border-[2px] border-black bg-blue-800 text-white px-1 ' onClick={logout}>Logout</button>
              </div>:<button className='border-[2px] border-black bg-blue-800 text-white px-1'><Link to="/login">Login</Link></button>
            }
            
            
        </div>
      
    </nav>
  )
}

export default Navbar
