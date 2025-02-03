import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaPrint, FaDownload, FaHome, FaTimes, FaSearch } from 'react-icons/fa'

export function PaymentSuccess() {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    
    // Create new order from the purchase
    if (location.state?.toy) {
      const newOrder = {
        orderNumber: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        purchaseDate: new Date().toLocaleDateString(),
        toy: {
          name: location.state.toy.name,
          price: location.state.toy.price,
          image: location.state.selectedImage
        },
        status: 'completed'
      }

      // Add new order to existing orders
      const updatedOrders = [newOrder, ...existingOrders]
      
      // Save to localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
      
      // Update state
      setOrders(updatedOrders)
    } else {
      // If no new purchase, just show existing orders
      setOrders(existingOrders)
    }
  }, [location.state])

  const handlePrint = () => {
    window.print()
  }

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.toy.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Orders History</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderNumber}>
                <td>{order.orderNumber}</td>
                <td>{order.purchaseDate}</td>
                <td>{order.toy.name}</td>
                <td>${order.toy.price}</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-details-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setSelectedOrder(null)}
            >
              <FaTimes />
            </button>

            <div className="modal-header">
              <FaCheckCircle className="success-icon" />
              <h2>Order Details</h2>
            </div>

            <div className="order-details">
              <div className="order-info">
                <div className="info-row">
                  <span>Order Number:</span>
                  <strong>{selectedOrder.orderNumber}</strong>
                </div>
                <div className="info-row">
                  <span>Purchase Date:</span>
                  <strong>{selectedOrder.purchaseDate}</strong>
                </div>
                <div className="info-row">
                  <span>Status:</span>
                  <span className={`status ${selectedOrder.status}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="product-summary">
                <img 
                  src={selectedOrder.toy.image} 
                  alt={selectedOrder.toy.name} 
                />
                <div className="product-info">
                  <h3>{selectedOrder.toy.name}</h3>
                  <p className="price">${selectedOrder.toy.price}</p>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={handlePrint} className="print-btn">
                <FaPrint /> Print Receipt
              </button>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}