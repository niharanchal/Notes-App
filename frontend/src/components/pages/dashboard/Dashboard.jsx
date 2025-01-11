import React from 'react'
import book from "../../../images/book.png"
import {Cursor, useTypewriter} from "react-simple-typewriter"

const Dashboard = () => {
    const [text]=useTypewriter({
        words:['Dream It','Believe It','Achieve It'],
        loop:{}
    })
  return (
    <main className='w-screen h-[91vh] flex '>
        <div className='w-[60%] h-[100%] flex items-center justify-center flex-col'>
            {/* <h1 className='text-3xl italic font-mono font-semibold'>When you change your thoughts, <br />remember to also change your world.</h1> */}
            <h1 className='text-3xl italic font-mono font-semibold '>Welcome to Quick Note !!</h1>
            <br />
            <span className='text-2xl  font-mono font-medium '>{text}</span>
            <Cursor/>
        </div>
        <div className='w-[40%] h-[100%] flex items-center justify-center'>
            <img src={book} alt="" className='w-[70%] h-[65%]'/>
        </div>
      
    </main>
  )
}

export default Dashboard
