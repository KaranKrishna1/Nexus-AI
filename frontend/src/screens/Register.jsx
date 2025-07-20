import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'

const Register = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [gender, setGender] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    
    function submitHandler(e) {

        e.preventDefault()
        setLoading(true);
        setToastMsg('');

        axios.post('/users/register', {
            email,
            password,
            gender,
            name
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            setToastMsg('Registration successful!');
            navigate('/')
        }).catch((err) => {
            setToastMsg(err.response?.data?.message || 'Registration failed');
        }).finally(() => {
        setLoading(false);
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
        <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-3xl px-8 py-10 w-full max-w-md border border-white/20">
        <div className="flex items-center justify-start gap-5 mb-6">
            <img
                src="/logo.png"
                alt="Website Logo"
                className="w-20 h-auto drop-shadow-xl"
            />

            <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Create Account</h2>
            <p className="text-sm text-slate-100 mt-1 ml-1">Join us and explore !</p>
            </div>
        </div>

    <form onSubmit={submitHandler} className="space-y-5">
      <div>
        <label className="block text-white text-sm mb-1" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 hover:bg-white/30
          "
        />
      </div>

      <div>
        <label className="block text-white text-sm mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 hover:bg-white/30"
        />
      </div>

      <div>
        <label className="block text-white text-sm mb-1" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 hover:bg-white/30"
        />
      </div>

      <div>
        <label className="block text-white text-sm mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white/10 hover:bg-white transition-all duration-200"
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

    <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
>
        {loading ? (
        <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Registering...
        </>
        ) : (
        'Register'
        )}
    </button>
    </form>
    {toastMsg && (
        <div className="mt-4 px-4 py-2 bg-white/20 text-white text-sm rounded-md shadow backdrop-blur-md transition-all duration-300">
            {toastMsg}
        </div>
    )}

    <p className="mt-6 text-center text-sm text-white">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-200 hover:underline font-semibold">
        Login
      </Link>
    </p>
  </div>
</div>
    )
}

export default Register