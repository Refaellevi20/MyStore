import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';

export function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user from Redux store
  const user = useSelector((state) => state.userModule.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if it's holiday season
    const now = new Date();
    const month = now.getMonth();
    setIsHoliday(month === 11)

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    setIsUserMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHoliday ? 'holiday' : ''}`}>
      {isHoliday && <div className="snowflakes" aria-hidden="true">❅ ❆ ❅ ❆ ❅ ❆</div>}
      
      <div className="headerContent">
        <Link to="/" className="logo">
          <span>ToyLand</span>
        </Link>

    

        <div className="userActions">
          <Link to="/wishlist" className="iconButton">
            <FaHeart />
            <span className="tooltip">Wishlist</span>
          </Link>
          <Link to="/cart" className="iconButton cart-icon">
            <FaShoppingCart />
            <span className="tooltip">Cart</span>
            {/* Add cart items count if needed */}
            {/* <span className="cart-count">3</span> */}
          </Link>
          
          {user ? (
            <div className="user-menu-container">
              <div 
                className="user-info" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img 
                  src={user.imgUrl || 'default-avatar.png'} 
                  alt={user.fullname} 
                  className="user-avatar"
                />
                <span className="user-name">{user.fullname}</span>
              </div>
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <FaUser /> Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}