

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import guest from '../assets/imgs/guest.svg'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'
import { MenuHeader } from './MenuHeader.jsx'
import { useLoginModal } from '../hooks/useLoginModal.jsx'
import { LoginSignup } from './LoginSignup.jsx'

export function NavMenu() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const notifications = useSelector((storeState) => storeState.userModule.notifications)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()
  const navRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavbarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function handleLogout() {
    try {
      await logout()
      setNavbarOpen(false)
      // After successful logout, open login modal
      openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function handleToggle() {
    setNavbarOpen((prev) => !prev)
  }

  return (
    <>
      <LoginModal />
      <nav className='nav-menu' onClick={handleToggle} ref={navRef}>
        {notifications.length > 0 && (
          <div className='notification-badge'>{notifications.length}</div>
        )}
        <div className='menu-btn'>
          <MenuHeader />
          <div className='menu-avatar'>
            <img 
              src={user?.imgUrl || guest} 
              alt={user?.fullname || 'Guest'} 
            />
          </div>
        </div>
        {navbarOpen && (!user ? (
          <div className='menu-links'>
            <Link onClick={() =>
              openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
            }>
              Log in
            </Link>
            {/* <NavLink to="/about/development">About Me</NavLink> */}
          </div>
        ) : (
          <div className='menu-links'>
            {user.isOwner && (
              <NavLink to="/admin/support">Support</NavLink>
            )}
            {/* <NavLink to="/About">More About Us</NavLink> */}
            <button onClick={handleLogout}>Log out</button>
          </div>
        ))}
      </nav>
    </>
  )
}

 {/* <button onClick={onAddStay}>
              {user.isOwner ? 'Add Another Stay' : 'Become a host (Add stay)'}
            </button> */} //^ another way to do it