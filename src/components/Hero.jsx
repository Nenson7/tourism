import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="container-fluid p-0 mb-5">
      <div className="position-relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="position-relative"
          style={{ height: '100vh', minHeight: '500px' }}
        >
          <div
            className="position-absolute w-100 h-100"
            style={{
              background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
              zIndex: 1
            }}
          />
          <div
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage: 'url("/images/hero-bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          <div className="position-relative z-2 d-flex align-items-center justify-content-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-white mb-4"
                  >
                    Enjoy Your Vacation With Us
                  </motion.h1>
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white mb-5"
                  >
                    Discover amazing destinations and create unforgettable memories
                  </motion.p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="position-relative"
                  >
                    <div className="bg-white p-4 rounded">
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="input-group">
                            <span className="input-group-text bg-transparent">
                              <FaMapMarkerAlt className="text-primary" />
                            </span>
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder="Where to?"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-group">
                            <span className="input-group-text bg-transparent">
                              <FaCalendarAlt className="text-primary" />
                            </span>
                            <input
                              type="date"
                              className="form-control border-0"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <select className="form-select border-0">
                            <option selected>Duration</option>
                            <option>1 Day</option>
                            <option>2 Days</option>
                            <option>3 Days</option>
                            <option>4 Days</option>
                            <option>5 Days</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <button className="btn btn-primary w-100">
                            <FaSearch className="me-2" />
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 