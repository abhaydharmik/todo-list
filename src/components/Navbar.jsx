import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-violet-500 text-white px-2 py-2'>
        <div className="logo">
            <span className="font-bold text-2xl mx-8">iTask</span>
        </div>
        <ul className='flex gap-7 mx-8'>
            <li className='cursor-pointer hover:shadow-lg transition-all duration-100'>Home</li>
            <li className='cursor-pointer hover:shadow-lg transition-all duration-100'>Your Task</li>
        </ul>    
    </nav>
  )
}

export default Navbar