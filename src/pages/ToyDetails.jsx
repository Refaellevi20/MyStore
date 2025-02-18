import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.local'
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaShoppingCart, FaCreditCard } from 'react-icons/fa'
import { utilService } from '../services/util.service'
import { ToyReviews } from '../components/ToyReviews'
import { RelatedToys } from '../components/RelatedToys'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState({})
  const [isQuickBuyModal, setIsQuickBuyModal] = useState(false)
  const [selectedQuickBuyImage, setSelectedQuickBuyImage] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      console.error('Error loading toy:', err)
      navigate('/toy')
    }
  }

  const handleBuyNow = () => {
    setIsModalOpen(true)
  }

  const toggleImageSelection = (index) => {
    setSelectedImages(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const addToCart = () => {
    const selectedItems = Object.entries(selectedImages)
      .filter(([_, isSelected]) => isSelected)
      .map(([index]) => ({
        toyId: toy._id,
        toyName: toy.name,
        imageUrl: images[index],
        price: toy.price
      }))

    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
    localStorage.setItem('cart', JSON.stringify([...currentCart, ...selectedItems]))
    setIsModalOpen(false)
  }

  const calculateTotal = () => {
    const selectedCount = Object.values(selectedImages).filter(Boolean).length
    return (toy.price * selectedCount).toFixed(2)
  }

  const handleQuickBuy = () => {
    navigate('/quick-payment', {
      state: {
        toy,
        selectedImage: images[currentImageIndex]
      }
    })
  }

  const processQuickBuy = () => {
    // Here you would typically handle the payment processing
    const purchaseItem = {
      toyId: toy._id,
      toyName: toy.name,
      imageUrl: selectedQuickBuyImage,
      price: toy.price
    }
    // Add to purchase history or process payment
    setIsQuickBuyModal(false)
  }

  if (!toy) return <div>Loading...</div>

  const images = toy.imgUrls || [toy.img]

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <section className="toy-details">
      <div className="details-layout">
        {/* Mobile-Friendly Gallery Section */}
        <div className="gallery-container">
          <div className="main-image-container">
            {/* Swipe indicator for mobile */}
            <div className="swipe-indicator">
              <div className="dots">
                {images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className="image-slider">
              <button className="nav-btn prev" onClick={prevImage}>
                <FaArrowLeft />
              </button>
              <div className="main-image">
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${toy.name} - Main view`} 
                />
              </div>
              <button className="nav-btn next" onClick={nextImage}>
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Thumbnails - Hidden on mobile */}
          <div className="thumbnails-container desktop-only">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img src={img} alt={`${toy.name} - Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="toy-info">
          <h2>{toy.name}</h2>
          <span className="price">{utilService.formatCurrency(toy.price)}</span>
          <p className="labels">Labels: {toy.labels?.join(', ')}</p>
          <div className="toy-specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Type:</strong> {toy.type}</li>
              <li><strong>Capacity:</strong> {toy.capacity}</li>
              <li><strong>Location:</strong> {toy.loc.city}, {toy.loc.country}</li>
            </ul>
          </div>
          <div className="button-group">
            <button 
              className="buy-now-btn quick-buy"
              onClick={handleQuickBuy}
            >
              <FaCreditCard /> Buy Now
            </button>
            <button 
              className="select-images-btn"
              onClick={handleBuyNow}
            >
              <FaShoppingCart /> Select Images
            </button>
          </div>
        </div>

        {/* Add new sections */}
        <div className="toy-additional-info">
       

        

          {/* <div className="toy-amenities">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {toy.amenities?.map((amenity, idx) => (
                <div key={idx} className="amenity-item">
                  {amenity}
                </div>
              ))}
            </div>
          </div> */}

          {/* Add Reviews Component */}
          <ToyReviews toyId={toy._id} />

          {/* Add Related Toys Component */}
          {/* <RelatedToys currentToy={toy} /> */}
        </div>
      </div>

      {/* Purchase Modal */}
      {isModalOpen && (
        <div className="purchase-modal">
          <div className="modal-content">
            <h3>Select Images to Purchase</h3>
            <div className="images-grid">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`image-selection ${selectedImages[idx] ? 'selected' : ''}`}
                  onClick={() => toggleImageSelection(idx)}
                >
                  <img src={img} alt={`${toy.name} - ${idx + 1}`} />
                  <div className="selection-overlay">
                  <span className="price">{utilService.formatCurrency(toy.price)}</span>
                  {/* <span className="price">${toy.price.toLocaleString()}</span> */}

                  {selectedImages[idx] && <span className="selected-mark">✓</span>}
                  </div>
                </div>

              ))}
            </div>
            
            <div className="modal-footer">
              <p className="total">Total: ${calculateTotal()}</p>
              <div className="modal-buttons">
                <button className="add-to-cart-btn" onClick={addToCart}>
                  Add to Cart
                </button>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Buy Modal */}
      {isQuickBuyModal && (
        <div className="quick-buy-modal">
          <div className="modal-content">
            <h3>Quick Purchase</h3>
            <div className="selected-image">
              <img src={selectedQuickBuyImage} alt={toy.name} />
              <p className="price">${toy.price}</p>
            </div>

            <form className="payment-form" onSubmit={(e) => {
              e.preventDefault()
              processQuickBuy()
            }}>
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input 
                    type="password" 
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="process-payment-btn">
                Pay ${toy.price}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setIsQuickBuyModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Shopping Cart Button */}
      <button 
        className="cart-floating-btn" 
        onClick={() => navigate('/cart')}
      >
        <FaShoppingCart />
        <span className="cart-count">
          {JSON.parse(localStorage.getItem('cart') || '[]').length}
        </span>
      </button>
    </section>
  )
}