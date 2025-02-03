import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCreditCard, FaArrowLeft } from 'react-icons/fa'
import { utilService } from '../services/util.service'

export function QuickPayment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toy, selectedImage } = location.state || {}
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })

  if (!toy || !selectedImage) {
    return navigate('/toy')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to success page with purchase details
      navigate('/payment-success', {
        state: {
          toy,
          selectedImage
        }
      })
    } catch (error) {
      console.error('Payment failed:', error)
      // Handle error - maybe show an error message
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="quick-payment-page">
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      <div className="payment-container">
        <div className="product-summary">
          <img src={selectedImage} alt={toy.name} />
          <div className="product-info">
            <h2>{toy.name}</h2>
            <p className="price">${toy.price}</p>
          </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <FaCreditCard />
            <h3>Payment Details</h3>
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input 
              type="text"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails(prev => ({
                ...prev,
                cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
              }))}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-group">
            <label>Card Holder Name</label>
            <input 
              type="text"
              value={paymentDetails.cardHolder}
              onChange={(e) => setPaymentDetails(prev => ({
                ...prev,
                cardHolder: e.target.value
              }))}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input 
                type="text"
                value={paymentDetails.expiryDate}
                onChange={(e) => setPaymentDetails(prev => ({
                  ...prev,
                  expiryDate: e.target.value
                }))}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input 
                type="password"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails(prev => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                }))}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-payment ${isProcessing ? 'processing' : ''}`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="processing-text">Processing...</span>
            //   <TruckLoader />

            ) : (
                <span className="price">pay:{utilService.formatCurrency(toy.price)}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 