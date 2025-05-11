import { useState, useEffect } from 'react'
import { userService } from '../services/user/user.service.local.js'
import { ImgUploader } from './ImgUploader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.actions.js'
import { BtnSquareColorRed } from './buttons ui/btn-square-color.jsx'
import { BtnGestColor } from './buttons ui/btn-gest-color.jsx'
import { useNavigate } from 'react-router-dom'
import { BtnHostColor } from './buttons ui/btn-host-color.jsx'
import levixLogo from '../assets/imgs/levix.png'

export function LoginSignup({ closeModal }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  // const user = useSelector((state) => state.userModule.user)
  const navigate = useNavigate() //^ optional
  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onLogin(ev = null) {
    console.log('onLogin')
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    const user = await login(credentials)
    showSuccessMsg(`Welcome: ${user.fullname}`)
    try {
      closeModal()
    } catch (err) {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
      // showErrorMsg('Cannot login')
    }
    clearState()
    closeModal()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    if (!credentials.imgUrl) { credentials.imgUrl = 'https://robohash.org/mat.png?size=50x50&set=set4' }
    signup(credentials)
    clearState()
    closeModal()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="company-info">
          <div className="company-logo">
            <img src = {levixLogo}
              // src="https://images.seeklogo.com/logo-png/47/1/ctera-networks-logo-png_seeklogo-477488.png" 
              alt="Ctera Logo" 
            />
          </div>
          <div className="company-description">
            <h2>Welcome to Ctera</h2>
            <p>Leading the way in innovative enterprise solutions across Israel. Our commitment to excellence drives digital transformation for businesses nationwide.</p>
            <ul className="company-highlights">
              <li>✓ Enterprise Solutions</li>
              <li>✓ Digital Innovation</li>
              <li>✓ Technical Excellence</li>
            </ul>
          </div>
        </div>

        <div className="auth-section">
          {!isSignup ? (
            <form className='login-form' onSubmit={onLogin}>
              <h3>Sign In</h3>
              <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                minLength="3"
                autoFocus
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                minLength="3"
              />
              <BtnSquareColorRed className="login-btn">Login</BtnSquareColorRed>
            </form>
          ) : (
            <form className='signup-form' onSubmit={onSignup}>
              <h3>Create Account</h3>
              <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
                minLength="3"
              />
              <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                minLength="3"
                autoFocus
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                minLength="3"
              />
              <ImgUploader onUploaded={onUploaded} />
              <BtnSquareColorRed className='sing-up'>Signup!</BtnSquareColorRed>
            </form>
          )}
        <div>
          <div className='demo-login-btns'>
            <BtnHostColor onClick={() => {
              credentials.username = 'host'
              onLogin()
            }}>
              Demo: Login as Host
            </BtnHostColor>
            </div>
            <BtnGestColor onClick={() => {
              credentials.username = 'guest'
              onLogin()
            }}>
              Demo: Login as Guest
            </BtnGestColor>
          </div>

          <div className='sign-up-btn-container'>
            <button className='btn-link' onClick={toggleSignup}>
              {!isSignup ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


