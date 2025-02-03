import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard, FaLock, FaRegCreditCard } from 'react-icons/fa'

export function Payment() {
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      localStorage.removeItem('cart') // Clear cart after successful payment
      navigate('/payment/success')
    } catch (error) {
      console.error('Payment failed:', error)
      // Show error message
    } finally {
      setIsProcessing(false)
    }
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  }

  return (
    <div className="payment-container">
      <div className="payment-layout">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.imageUrl} alt={item.toyName} />
                <div className="item-details">
                  <h4>{item.toyName}</h4>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="total-section">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-header">
            <FaLock /> Secure Payment
          </div>

          <div className="form-group">
            <label>
              <FaRegCreditCard /> Card Number
            </label>
            <input 
              type="text" 
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails(prev => ({
                ...prev,
                cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
              }))}
              placeholder="1234 5678 9012 3456"
              pattern="\d{16}"
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
                pattern="\d{3}"
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
              <>Processing...</>
            ) : (
              <>
                <FaCreditCard /> Pay ${calculateTotal()}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}