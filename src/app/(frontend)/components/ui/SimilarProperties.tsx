'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCar } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Define the type for property data
interface Property {
  image: string
  title: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  area: number
  garage: string
}

// Define props type
interface SimilarPropertiesProps {
  properties: Property[]
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({ properties }) => {
  return (
    <div className="my-12 bg-[#FAF9F9] px-4">
      <h2 className="mx-auto max-w-7xl text-2xl pt-10 pb-10 font-semibold text-left mb-6 text-[#000000]">
        Similar Properties You May Like
      </h2>

      {/* Centered Swiper */}
      <div className="mx-auto max-w-7xl pb-12">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {properties.map((property, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="border rounded-lg shadow-lg overflow-hidden bg-white mx-auto max-w-xs"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600 flex items-center justify-center gap-1 text-sm">
                    <FaMapMarkerAlt className="text-green-600" /> {property.location}
                  </p>
                  <p className="text-green-600 font-bold text-lg mt-2">{property.price}</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-700 mt-3">
                    <span className="flex items-center gap-1">
                      <FaBed /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {property.bathrooms} Baths
                    </span>
                  </div>
                  <div className="flex justify-center gap-4 text-sm text-gray-700 mt-1">
                    <span className="flex items-center gap-1">
                      <FaRulerCombined /> {property.area} sq ft
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCar /> {property.garage}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SimilarProperties
