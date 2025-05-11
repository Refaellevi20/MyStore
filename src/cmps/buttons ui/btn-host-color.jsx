import { useEffect, useRef } from 'react'
import classes from './btn-host-color.module.scss'

export function BtnHostColor({ children, ...props }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    // Only add mousemove listener on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      const handleMouseMove = (ev) => {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = ((ev.clientX - rect.left) * 100) / buttonRef.current.clientWidth
        const y = ((ev.clientY - rect.top) * 100) / buttonRef.current.clientHeight

        buttonRef.current.style.setProperty('--mouse-x', x)
        buttonRef.current.style.setProperty('--mouse-y', y)
      }
      
      buttonRef.current.addEventListener('mousemove', handleMouseMove)
      const btn = buttonRef.current

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [buttonRef])

  return (
    <div className="parent-container">
      <button 
        ref={buttonRef} 
        {...props} 
        className={`${classes.btnHost} pointer`}
      >
        {children}
      </button>
    </div>
  )
}
