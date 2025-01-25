import React, { useState } from "react";
import register from "../../../images/register.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({
    username: "",
    email: "",
    number: "",
    age: "",
    password: "",
  });
  const [reset, setReset] = useState(inp);

  const { username, email, number, age, password } = inp;

  const handleInput = (e) => {
    let { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setInp(reset);
    try {
      const { data } = await axios.post("http://localhost:3000/register", inp);
      if (data.message === "User register successfully") {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error("Already have an account");
      }
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="w-screen h-[91vh] flex">
      <div className="w-[60%] h-full flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-green-200 rounded-full opacity-50 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-teal-300 rounded-full opacity-30 blur-2xl animate-bounce"></div>
        <img
          src={register}
          alt="Register Illustration"
          className="w-[70%] h-auto relative z-10 animate__animated animate__fadeIn animate__delay-1s"
        />
      </div>
      <div className="w-[40%] h-full flex items-center justify-center flex-col">
        <div className="w-[80%] max-w-md bg-white shadow-xl rounded-xl p-8 animate__animated animate__fadeIn animate__delay-2s">
          <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
          <form onSubmit={handleForm} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={username}
              onChange={handleInput}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={handleInput}
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={number}
              onChange={handleInput}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={age}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={handleInput}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-teal-700 text-white rounded-md shadow hover:bg-teal-800 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
