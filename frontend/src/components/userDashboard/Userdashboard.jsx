import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MdOutlineEditCalendar, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const Userdashboard = () => {
  const [notes, setNotes] = useState(null);

  const getUserNotes = async () => {
    const token = localStorage.getItem('access-token');
    try {
      const { data } = await axios.get('http://localhost:3000/get-notes', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNotes(data.data);
    } catch (error) {
      toast.error('Error fetching notes');
    }
  };

  useEffect(() => {
    getUserNotes();
  }, []);

  const handleDeleteNote = async (ele) => {
    const token = localStorage.getItem('access-token');
    try {
      if (!token) {
        toast.error('Authentication token missing');
      } else {
        await axios.delete(`http://localhost:3000/delete-note/${ele._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Note deleted successfully');
        getUserNotes();
      }
    } catch (error) {
      toast.error('Error deleting note');
    }
  };

  return (
    <div className="w-screen h-[91vh] flex items-start justify-start p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-[92%] h-full flex items-start justify-start gap-6 flex-wrap">
        {notes?.map((e, index) => (
          <div
            key={index}
            className="w-[23%] bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h1 className="w-full px-4 py-3 text-lg font-semibold border-b border-gray-600">
              Subject: <span className="font-normal">{e.subject}</span>
            </h1>
            <h3 className="w-full px-4 py-3 border-b border-gray-600">
              Title: <span className="font-normal">{e.title}</span>
            </h3>
            <p className="w-full px-4 py-3 text-sm text-gray-300">
              Content: {e.content}
            </p>
            <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-b-lg">
              <Link
                to="/update_note"
                state={e}
                className="text-2xl text-blue-500 hover:text-blue-400"
              >
                <MdOutlineEditCalendar />
              </Link>
              <button
                className="text-2xl text-red-500 hover:text-red-400"
                onClick={() => handleDeleteNote(e)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[8%] h-full flex items-end justify-center">
        <Link to="/create_note" className="text-6xl text-blue-500 hover:text-blue-400">
          <IoIosAddCircle />
        </Link>
      </div>
    </div>
  );
};

export default Userdashboard;
