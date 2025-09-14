import React from 'react'
import star from '../assets/star.png'

const Navbar = () => {
  return (
    <div className='text-white flex items-center justify-around gap-12 px-7 py-9 h-16  w-full relative '>
      <div className='flex items-center gap-2'>
        <img src={star} alt="star icon" className='h-8 w-8' />
        <h1 className='text-3xl cursor-default font-bold'>Makeable.Ai</h1>
      </div>
      
      
      <div className='flex gap-5'>
      <a href="">Community</a>
      <a href="">Pricing</a>
      <a href="">Enterprise</a>
      <a href="">Learn</a>
      <a href="">Launched</a> 
      </div>
      <div className='flex items-center gap-2'>
        <div className='h-7 w-7 rounded-md bg-blue-600'></div>
        Profile 
      </div>

    </div>
  )
}

export default Navbar
