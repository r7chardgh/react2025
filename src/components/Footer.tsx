import React from 'react'
const Footer = () => {
  return (
    <footer className='fixed left-0 bottom-0 w-full bg-gray-600 py-2'>用心製造 | © Copyright {new Date().getFullYear()} <a target='_blank' href='https://richardtsang.vercel.app/' className='text-white active:text-white'>Richard Tsang</a></footer>
  )
}

export default Footer