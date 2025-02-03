import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.local'
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { utilService } from '../services/util.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState({})
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
          <button 
            className="buy-now-btn"
            onClick={handleBuyNow}
          >
            Select Images to Buy
          </button>
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