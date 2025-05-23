'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { ReactNode, useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

interface DropdownProps {
  icon: StaticImageData | string | ReactNode
  options: string[]
  withBorder?: boolean
  onSelect?: (selected: string) => void
}

const Dropdown = ({ icon, options, withBorder = false, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (onSelect) onSelect(selectedOption)
  }, [selectedOption, onSelect])

  useEffect(() => {
    const handleCloseDropdowns = () => setIsOpen(false)

    if (isMobile && isOpen) {
      window.dispatchEvent(new Event('dropdown-close-all'))
    }

    window.addEventListener('dropdown-close-all', handleCloseDropdowns)
    return () => {
      window.removeEventListener('dropdown-close-all', handleCloseDropdowns)
    }
  }, [isOpen, isMobile])

  return (
    <div
      className={`relative flex-1 ${withBorder ? 'border-l border-r border-white/30' : ''} w-full md:w-auto`}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <div
        className="flex items-center justify-between w-full pr-[20px] pl-[20px] py-2 cursor-pointer text-black md:text-white transition rounded-lg bg-white md:bg-transparent"
        onClick={() => isMobile && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          {typeof icon === 'string' || icon instanceof Object ? (
            icon ? (
              <Image src={icon as StaticImageData} width={20} height={20} alt="icon" />
            ) : null
          ) : (
            icon
          )}
        </div>
        <span>{selectedOption}</span>
        <div>{isOpen ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 w-full mt-2 z-60 border border-white/30 rounded-lg overflow-hidden
  ${
    isMobile
      ? 'bg-white text-black w-full shadow-lg'
      : 'bg-white/10 md:bg-gray-400 lg:bg-gray-400 backdrop-blur-md text-white'
  }`}
          >
            <div className="max-h-60 overflow-y-auto scroll-smooth">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`group px-4 py-2 transition-all duration-200 cursor-pointer border-b border-white/10
                ${
                  isMobile
                    ? 'hover:bg-gray-100 hover:text-black'
                    : 'hover:bg-white/20 hover:pl-6 rounded-md'
                }`}
                  onClick={() => {
                    setSelectedOption(option)
                    setIsOpen(false)
                  }}
                >
                  <span className="truncate">{option}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
