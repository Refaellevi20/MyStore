import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaCreditCard, FaArrowLeft } from 'react-icons/fa'

export function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <button 
          className="continue-shopping" 
          onClick={() => navigate('/toy')}
        >
          <FaArrowLeft /> Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <span className="item-count">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.toyName} />
                </div>
                
                <div className="item-details">
                  <h3>{item.toyName}</h3>
                  <p className="item-price">${item.price}</p>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              <FaCreditCard />
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <button 
              className="continue-shopping"
              onClick={() => navigate('/toy')}
            >
              <FaArrowLeft /> Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {isCheckingOut && (
        <div className="checkout-modal">
          <div className="modal-content">
            <h3>Complete Your Purchase</h3>
            {/* Add your payment form here */}
            <div className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <input 
                    type="password" 
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>

              <button 
                className="pay-btn"
                onClick={() => {
                  // Handle payment processing
                  localStorage.removeItem('cart')
                  navigate('/payment-success')
                }}
              >
                Pay ${calculateTotal()}
              </button>
              
              <button 
                className="cancel-btn"
                onClick={() => setIsCheckingOut(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}