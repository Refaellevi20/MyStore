import { useSelector } from 'react-redux'
import { NavMenu } from '../cmps/NavMenu'
import levixLogo from '../assets/imgs/levix.png'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa'

export function AppHeader({ onQuickBuy, onSelectImages }) {
  const user = useSelector((state) => state.userModule.user)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)

      if (location.pathname.includes('/toy/')) {
        const toyInfo = document.querySelector('.toy-info')
        if (toyInfo && headerRef.current) {
          const buttonGroup = toyInfo.querySelector('.button-group')
          if (buttonGroup) {
            const headerHeight = headerRef.current.offsetHeight
            const buttonGroupRect = buttonGroup.getBoundingClientRect()
            setShowButtons(buttonGroupRect.top <= headerHeight)
          }
        }
      } else {
        setShowButtons(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  const handleQuickBuyClick = (e) => {
    e.preventDefault()
    if (onQuickBuy) onQuickBuy()
  }

  const handleSelectImagesClick = (e) => {
    e.preventDefault()
    if (onSelectImages) onSelectImages()
  }

  return (
    <header ref={headerRef} className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content main-layout">
        <div className="logo-container" style={{ 
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
          paddingLeft: '1rem',
          backgroundColor: 'white',
        }}>
          <img 
            src={levixLogo} 
            alt="Ctera Logo" 
            className="company-logo"
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: 'white', 
              cursor: 'pointer',
              borderRadius: '25px',
              height: '62px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
        
        {location.pathname.includes('/toy/') && (
          <div className={`header-buttons ${showButtons ? 'visible' : ''}`}>
            <button 
              className="quick-buy" 
              onClick={handleQuickBuyClick}
            >
              <FaCreditCard /> Buy Now
            </button>
            <button 
              className="select-images" 
              onClick={handleSelectImagesClick}
            >
              <FaShoppingCart /> Select Images
            </button>
          </div>
        )}

        {user && (
          <div className="user-info" style={{ cursor: 'pointer' }}>
            <NavMenu />
          </div>
        )}
      </div>
    </header>
  )
} 