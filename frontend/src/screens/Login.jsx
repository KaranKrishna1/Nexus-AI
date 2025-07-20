import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post('/users/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
   <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
    <video
      src="/video5.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover -z-10"
    ></video>
      <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-3xl px-8 py-10 w-full max-w-md border border-white/20 animate-fade-in">
        <div className="flex items-center justify-center gap-4 mb-5">
          <img
            src="/logo.png"
            alt="Website Logo"
            className="w-16 h-16 drop-shadow-xl hover:scale-110 transition duration-300"
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Welcome Back</h2>
            <p className="text-sm text-slate-100 mt-1">Login to your account</p>
          </div>
        </div>


        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

        <button
            type="submit"
            className="relative w-full py-2 px-4 bg-gradient-to-br from-[#0f172a] via-[#2563eb] to-[#60a5fa] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(96,165,250,0.5)] 
             hover:shadow-[0_0_25px_rgba(96,165,250,0.9)] transition-all duration-300 ease-in-out 
             hover:scale-[1.03] group overflow-hidden">
            <span className="relative z-10">Login</span>

  
            <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] 
                   opacity-0 group-hover:opacity-20 blur-md transition duration-300"></span>

  
            <span className="absolute left-[-75%] top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                   transform -skew-x-12 transition-all duration-500 group-hover:left-0 group-hover:opacity-100 opacity-0"></span>
        </button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-200 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;