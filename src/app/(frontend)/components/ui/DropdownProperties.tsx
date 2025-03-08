'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

interface DropdownProps {
  label: string
  options: string[] | null // Allow options to be null while loading
  iconSrc: string
  onChange: (option: string) => void
}

const DropdownProperties: React.FC<DropdownProps> = ({ label, options, iconSrc, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(label)

  return (
    <div className="relative bg-[#9DD67B36] p-2 rounded-lg border border-[#71AE4C] mb-4 cursor-pointer">
      <div
        className="flex justify-between items-center p-2 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={iconSrc} alt="Icon" className="w-4 h-4" />
        <span className="absolute left-1/2 transform -translate-x-1/2 text-[#000000] text-[12px]">
          {selected}
        </span>
        <FaChevronDown
          size={12}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute left-0 top-full w-full bg-white border border-[#71AE4C] rounded-lg shadow-md mt-1 overflow-hidden z-10"
          >
            {options === null ? (
              // Dotted Loader
              <div className="flex justify-center items-center py-4">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-[#9DD67B] rounded-full mx-1"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-[#9DD67B] rounded-full mx-1"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-[#9DD67B] rounded-full mx-1"
                />
              </div>
            ) : (
              options.map((option, index) => {
                const optionText = String(option) // Ensure option is a string

                return (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`p-2 text-[12px] transition-all cursor-pointer ${
                      optionText.includes('available')
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-[#9DD67B] hover:text-white'
                    }`}
                    onClick={() => {
                      if (!optionText.includes('available')) {
                        setSelected(optionText)
                        setIsOpen(false)
                        onChange(optionText)
                      }
                    }}
                  >
                    {optionText}
                  </motion.li>
                )
              })
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownProperties
