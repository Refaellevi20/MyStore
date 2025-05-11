import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHeadset, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export function AppFooter() {
  const navigate = useNavigate()

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section about-section">
          <div className="logo">ToyLand</div>
          <p>Bringing joy and imagination to children worldwide through our carefully curated selection of toys and games.</p>
        </div>
        
        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            {/* <li>Blog</li> */}
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div className="footer-section support-section">
          <h3>Need Help?</h3>
          <button 
            className="support-btn"
            onClick={() => navigate('/support')}
          >
            <FaHeadset /> Get Support
          </button>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ToyLand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 