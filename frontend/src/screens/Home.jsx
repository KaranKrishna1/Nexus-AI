import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { user, logout } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState(null)
    const [ project, setProject ] = useState([])

    const navigate = useNavigate()

    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            setProject(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <main className="p-4 min-h-screen bg-[url('/bg3.jpg')] bg-cover bg-center">
            <div className="projects">

                <div className="absolute top-4 right-4 flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
                    <label htmlFor="avatar-upload" className="relative cursor-pointer">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-300 hover:ring-4 transition-all duration-300">
                        <img
                            src={
                                 user?.avatar ||
                                localStorage.getItem(`avatar_${user?.email || user?.id || user?.name || 'default_user'}`) ||
                            (user?.gender === 'Male'
                            ? '/male-avatar.png'
                            : user?.gender === 'Female'
                            ? '/female-avatar.png'
                            : '/user.png')
                            }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        />
                        </div>
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                        // Save avatar separately
                        const userKey = user?.email || user?.id || user?.name || 'default_user';
                        localStorage.setItem(`avatar_${userKey}`, reader.result);
                        setUser({ ...user, avatar: reader.result });
                        // Also update in context if user is logged in
                    if (user) {
                        setUser({ ...user, avatar: reader.result });
                    }
                };
                    reader.readAsDataURL(file);
                    }
                    }}
                />
                </label>

  <div className="text-right">
    <p className="text-xs text-slate-300">Welcome, {user.name}</p>
    <button
      onClick={() => {
        logout();
        navigate('/login');
      }}
      className="mt-5 px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      Logout
    </button>
  </div>
</div>

                <div className="projects "></div>
                    <img src="public/logo.png" // Replace with the correct path to your logo image
                    alt="Website Logo"
                    className="mb-4 w-32 h-auto drop-shadow-xl" // Tailwind classes for size and spacing
                />
                
                <div className="w-full flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="sproject p-4 border border-slate-300 rounded-md 
             text-white bg-black/40 text-white border border-cyan-300 hover:shadow-[0_0_10px_#0ff] transition duration-300">
                    Create New Project 
                    <i className="ri-link ml-2"></i>
                </button>  
                </div> <br /> <br /> 
                
                {
                    project.map((project) => (
                        
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                })
                            }}
                            className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-4  mb-4 shadow-lg hover:scale-95 transition-transform duration-300">
                            <h2
                                className='text-white text-lg font-semibold'
                            >{project.name}</h2>

                            <div className="flex gap-2 text-gray-300">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div> 

                        </div>  
                    )) 
                }  


            </div> 

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-md w-1/3"  
                    style={{ 
                        backgroundImage: "url('/inputbg1.jpg')", 
                        backgroundSize: 'cover',       // Make image cover the entire area
                        backgroundPosition: 'center',  // Center the image
                    }}>
                    
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
                            </div> <br />
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
    )
}

export default Home