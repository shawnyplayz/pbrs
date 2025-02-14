'use client'

import Image from 'next/image'
import { Button } from './ui/Button'
import logo from '../public/assets/pbrs_logo.png'

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent z-50">
      {/* Centered Container */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-8 py-4 border-b-[1px] border-[#6C6C6C]">
        {/* Logo */}
        <div className="flex items-center border-b-0">
          <Image src={logo} width={200} height={200} alt="PBRS-Image" />
        </div>

        {/* Navigation Links - Centered */}
        <ul className="hidden md:flex gap-12 text-white font-medium font-poppins">
          {['Home', 'About Us', 'Properties', 'Contact Us'].map((item) => (
            <li
              key={item}
              className="relative cursor-pointer after:content-[''] after:block after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:mt-1 hover:after:scale-x-100"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Button */}
        <Button>Book a Site Tour</Button>
      </div>
    </nav>
  )
}

export default Navbar
