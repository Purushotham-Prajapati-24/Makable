import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (prompt.trim()) {
      navigate('/livepreview', { state: { initialPrompt: prompt } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='relative z-10 h-screen w-full'>
        <Navbar />
        <div className='h-[70%] w-[70%] flex flex-col justify-center items-center  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <h1 className='text-white text-center pt-20 font-bold text-5xl'>Build Something Makeable</h1>
            <p className=' text-center text-xl p-2 pb-5 text-zinc-300'>Create apps and websites by chatting with AI</p>
            <div className='relative w-[80%] bg-[#272725] rounded-3xl p-2 flex items-center'>
                <input className='w-full bg-transparent text-white p-2 rounded-3xl border-none focus:outline-none'
                  placeholder='Ask Makeble to Create Web Application '
                  type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full disabled:bg-gray-800 disabled:cursor-not-allowed"
                  disabled={!prompt.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home
