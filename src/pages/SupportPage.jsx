import React, { useState } from 'react'
import { supportService } from '../services/support.service.local' 
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function SupportPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await supportService.submitSupportRequest(formData)
      showSuccessMsg('Support request submitted successfully!')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      showErrorMsg('Failed to submit support request')
    }
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="support-page">
      <h1>Contact Support</h1>
      <p>Please fill out the form below and we'll get back to you shortly.</p>

      <form onSubmit={handleSubmit} className="support-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  )
} 