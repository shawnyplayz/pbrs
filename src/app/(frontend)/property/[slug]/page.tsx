import Breadcrumbs from '../../components/ui/Breadcrumbs'
import PropertyGallery from '../../components/ui/PropertyGallery'
import PropertyInfo from '../../components/ui/PropertyInfo'
import PropertyAgent from '../../components/ui/PropertyAgent'
import PropertyDescription from '../../components/ui/PropertyDescription'
import PropertyFeatures from '../../components/ui/PropertyFeatures'
import { IoIosArrowRoundBack } from 'react-icons/io'

const PropertyPage = () => {
  return (
    <div className="mx-auto">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto p-6">
        <button className="text-gray-700 flex items-center">
          <IoIosArrowRoundBack size={30} />
          Back
        </button>
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-b border-gray-300 pb-10">
          <div className="w-full">
            <PropertyGallery />
          </div>
          <div className="w-full">
            <PropertyInfo />
          </div>
        </div>

        {/* Features & Property Agent Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 relative overflow-hidden">
          <div className="md:col-span-2">
            <PropertyDescription />
            <PropertyFeatures />
          </div>

          {/* Floating Property Agent */}
          <div className="relative">
            <PropertyAgent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage
