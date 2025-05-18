import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl my-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -right-3 -top-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10"
            >
              <FaTimes className="text-gray-600 text-lg" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal 