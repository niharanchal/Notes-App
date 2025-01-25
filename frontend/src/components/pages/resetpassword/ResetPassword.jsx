import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });
  const { email, password, confirmpassword } = inp;
  const [reset, setReset] = useState(inp);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setInp(reset);

    const { data } = await axios.put("http://localhost:3000/reset", inp);
    toast.success("Password Reset Successfully", { position: "top-right" });
    navigate("/login");
  };

  return (
    <div className="w-screen h-[91vh] flex items-center justify-center">
      <div className="w-[35%] h-[60%] flex items-center justify-center flex-col bg-white shadow-lg rounded-xl">
        <div className="w-full h-[20%] flex items-center justify-center">
          <h1 className="text-3xl font-semibold">Reset Your Password</h1>
        </div>
        <form
          action=""
          className="w-full h-[80%] flex items-center justify-center flex-col gap-4"
          onSubmit={handleForm}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-[75%] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            value={email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-[75%] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            value={password}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-[75%] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleInput}
            required
          />
          <button
            type="submit"
            className="w-[75%] py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
