import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../images/log.png";
import axios from "axios";
import { toast } from "react-toastify";
import confetti from "react-canvas-confetti";

const Login = () => {
  const launchConfetti = () => {
    var end = Date.now() + 15 * 1000;
    var colors = ["#4CAF50", "#FFC107"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const navigate = useNavigate();
  const [inp, setInp] = useState({ email: "", password: "" });
  const [reset, setReset] = useState(inp);
  const { email, password } = inp;

  const handleInput = (e) => {
    let { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setInp(reset);
    try {
      const { data } = await axios.post("http://localhost:3000/login", inp);
      const { message, token, username } = data;

      if (token) {
        localStorage.setItem("access-token", token);
        localStorage.setItem("username", username);
        toast.success("Login Successful!");
        navigate("/user_dashboard");
        launchConfetti();
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="w-screen h-[91vh] flex">
      <div className="w-[60%] h-full flex items-center justify-center">
        <img src={image} alt="Login Illustration" className="w-[70%] h-auto" />
      </div>
      <div className="w-[40%] h-full flex items-center justify-center flex-col">
        <div className="w-[80%] max-w-md bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back!</h1>
          <form onSubmit={handleForm} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              value={email}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              value={password}
              onChange={handleInput}
              required
            />
            <div className="text-right">
              <Link
                to="/reset"
                className="text-sm text-gray-600 underline hover:text-gray-200 transition-all duration-300"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-teal-800 text-white rounded-md shadow hover:bg-teal-900 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-teal-800 underline hover:text-teal-600 transition-all duration-300"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
