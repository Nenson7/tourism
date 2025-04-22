import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-dark px-5 d-none d-lg-block">
      <div className="row gx-0">
        <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
          <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
            <small className="me-3 text-light">
              <FaMapMarkerAlt className="me-2" />
              123 Street, New York, USA
            </small>
            <small className="me-3 text-light">
              <FaPhoneAlt className="me-2" />
              +012 345 6789
            </small>
            <small className="text-light">
              <FaEnvelope className="me-2" />
              info@example.com
            </small>
          </div>
        </div>
        <div className="col-lg-4 text-center text-lg-end">
          <div className="d-inline-flex align-items-center" style={{ height: '45px' }}>
            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#">
              <FaTwitter />
            </a>
            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#">
              <FaFacebookF />
            </a>
            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#">
              <FaLinkedinIn />
            </a>
            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#">
              <FaInstagram />
            </a>
            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href="#">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 