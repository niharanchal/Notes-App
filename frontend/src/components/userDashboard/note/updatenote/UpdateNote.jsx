import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateNote = () => {
    const navigate = useNavigate()
    const perticular_note = useLocation()
    const perticular_note_id = perticular_note.state._id
    
    const [notes, setNotes] = useState({
        title: "",
        content: "",
        subject: ""
    })
    const { title, content, subject } = notes
    
    useEffect(() => {
        setNotes(perticular_note.state)
    }, [perticular_note.state])

    const handleInput = (e) => {
        const { name, value } = e.target
        setNotes({ ...notes, [name]: value })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("access-token")

        try {
            if (!token) {
                toast.error("There is no token");
            } else {
                const { data } = await axios.put(`http://localhost:3000/update-note/${perticular_note_id}`, notes, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access-token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                toast.success("Update note successfully")
                navigate("/user_dashboard")
            }
        } catch (error) {
            toast.error("Failed to update the note")
        }
    }

    return (
        <div>
            <div className='w-screen h-[91vh] flex items-center justify-center flex-col bg-gradient-to-br from-gray-900 to-gray-800'>
                <div className='w-[35%] h-[70%] shadow-2xl shadow-black bg-blue-300'>
                    <div className='w-full h-[20%] flex items-center justify-center'>
                        <h1 className='text-3xl font-mono font-semibold'>Update Note</h1>
                    </div>
                    <form onSubmit={handleForm} className='w-full h-[75%] flex items-center justify-center flex-col'>
                        <input type="text" placeholder='Subject' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='subject' value={subject} onChange={handleInput} required /> <br />
                        <input type="text" placeholder='Title' className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='title' value={title} onChange={handleInput} required /> <br />
                        <textarea type="text" placeholder='Content' rows="5" cols="20" className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-black outline-none' name='content' value={content} required onChange={handleInput} /><br />
                        <div className='w-[75%] flex items-center justify-center'>
                            <button className='w-full h-full py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-[1s] font-semibold '>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateNote
