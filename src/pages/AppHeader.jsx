import { useSelector } from 'react-redux'
import { NavMenu } from '../cmps/NavMenu'
import levixLogo from '../assets/imgs/levix.png'
import { useEffect, useState } from 'react'


export function AppHeader() {
  const user = useSelector((state) => state.userModule.user)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
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
        
        {user && (
          <>
            <div className="user-info" style={{ cursor: 'pointer' }}>
              <NavMenu />
            </div>
          </>
        )}
      </div>
    </header>
  )
} 