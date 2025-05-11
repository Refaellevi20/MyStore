import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supportService } from '../services/support.service.local'
import { userService } from '../services/user.service.local'
import { FaSearch, FaCalendar, FaEnvelope, FaPhone, FaUser, FaClock } from 'react-icons/fa'

export function AdminSupportDashboard() {
  const [supportRequests, setSupportRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAdminStatus()
    console.log('AdminSupportDashboard mounted')
  }, [])

  async function checkAdminStatus() {
    try {
      const user = userService.getLoggedinUser()
      console.log('Current user:', user) // Debug log
      
      if (!user || !user.isOwner) {
        console.log('Not an admin, redirecting...') // Debug log
        navigate('/')
        return
      }
      
      setIsAdmin(true)
      loadSupportRequests()
    } catch (err) {
      console.error('Error checking admin status:', err)
      navigate('/')
    }
  }

  async function loadSupportRequests() {
    try {
      const requests = await supportService.getRequests()
      setSupportRequests(requests)
    } catch (err) {
      console.error('Error loading support requests:', err)
    }
  }

  // If not admin, don't render the dashboard
  if (!isAdmin) return null

  const filteredRequests = supportRequests.filter(request => {
    const matchesSearch = 
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (dateFilter === 'all') return matchesSearch
    
    const requestDate = new Date(request.createdAt)
    const now = new Date()
    
    switch(dateFilter) {
      case 'today':
        return matchesSearch && requestDate.toDateString() === now.toDateString()
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        return matchesSearch && requestDate > weekAgo
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
        return matchesSearch && requestDate > monthAgo
      default:
        return matchesSearch
    }
  })

  return (
    <div className="admin-support-dashboard">
      <div className="dashboard-header">
        <h1>Support Requests Dashboard</h1>
        
        <div className="filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filter">
            <FaCalendar />
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="requests-grid">
        {filteredRequests.map(request => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="user-info">
                <FaUser />
                <h3>{request.firstName} {request.lastName}</h3>
              </div>
              <span className={`status ${request.status}`}>
                {request.status}
              </span>
            </div>

            <div className="request-details">
              <div className="detail-item">
                <FaEnvelope />
                <p>{request.email}</p>
              </div>
              <div className="detail-item">
                <FaPhone />
                <p>{request.phone}</p>
              </div>
              <div className="detail-item">
                <FaClock />
                <p>{new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="request-content">
              <h4>{request.subject}</h4>
              <p>{request.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 