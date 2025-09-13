import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && prompt.trim()) {
      navigate('/livepreview', { state: { initialPrompt: prompt } });
    }
  };

  return (
    <div className='relative z-10 h-screen w-full'>
        <Navbar />
        <div className='h-[70%] w-[70%] flex flex-col justify-center items-center  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <h1 className='text-white text-center pt-20 font-bold text-5xl'>Build Something Makeable</h1>
            <p className=' text-center text-xl p-2 pb-5 text-zinc-300'>Create apps and websites by chatting with AI</p>
            <div className='w-[80%] bg-[#272725] h-35 rounded-3xl p-4'>
                <input className='w-[100%] bg-transparent text-white p-2 rounded-3xl border-none focus:outline-none'
                  placeholder='Ask Makeble to Create Web Application '
                  type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleKeyDown}
                />
                

            </div>
        </div>
    </div>
  )
}

export default Home
