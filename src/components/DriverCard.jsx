import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const DriverCard = ({ driver }) => {
  const { name, photo, address, contact, numberPlate } = driver;

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Image Section */}
        <div className="relative h-72 sm:h-76 lg:h-80 overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4">
          <div className="mb-2 sm:mb-3">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <FaUser className="text-green-600 w-3 h-3 sm:w-4 sm:h-4" />
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">{name}</h3>
            </div>

            <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{address}</p>
              </div>

              <div className="flex items-center gap-2">
                <FaPhone className="text-green-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{contact || 'Not available'}</p>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-600 mb-1">Number Plate</p>
              <p className="text-sm font-bold text-blue-800" style={{ fontFamily: 'Noto Sans Devanagari, Arial, sans-serif' }}>
                {numberPlate || 'Unavailable'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DriverCard; 