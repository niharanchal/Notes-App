import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateNote = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState({
    title: '',
    content: '',
    subject: '',
  });
  const { title, content, subject } = notes;
  const [reset, setReset] = useState(notes);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value });
  };

  const createNote = async () => {
    const token = localStorage.getItem('access-token');
    try {
      const { data } = await axios.post('http://localhost:3000/create-note', notes, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNotes(reset);
      toast.success('Note Created Successfully');
      navigate('/user_dashboard');
    } catch (error) {
      toast.error('Failed to create note');
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    createNote();
  };

  return (
    <div className="w-screen h-[91vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-[35%] h-[70%] shadow-2xl shadow-black bg-blue-300 rounded-lg">
        <div className="w-full h-[20%] flex items-center justify-center">
          <h1 className="text-3xl font-mono font-semibold text-gray-800">Create Note</h1>
        </div>
        <form onSubmit={handleForm} className="w-full h-[75%] flex items-center justify-center flex-col space-y-4">
          <input
            type="text"
            placeholder="Subject"
            className="w-[75%] px-4 py-2 rounded-lg border-2 border-gray-600 outline-none bg-gray-100 text-gray-800"
            name="subject"
            value={subject}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            placeholder="Title"
            className="w-[75%] px-4 py-2 rounded-lg border-2 border-gray-600 outline-none bg-gray-100 text-gray-800"
            name="title"
            value={title}
            onChange={handleInput}
            required
          />
          <textarea
            placeholder="Content"
            rows="5"
            className="w-[75%] px-4 py-2 rounded-lg border-2 border-gray-600 outline-none bg-gray-100 text-gray-800"
            name="content"
            value={content}
            onChange={handleInput}
            required
          />
          <button className="w-[75%] py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all duration-300 font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
