import { useState, useEffect } from 'react'
import { StarRating } from './StarRating'
import { reviewService } from '../services/reviews.service.local'
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export function ToyReviews({ toyId }) {
  const user = useSelector((state) => state.userModule.user)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, text: '' })
  const [averageRating, setAverageRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const REVIEWS_PER_PAGE = 4
  const [expandedReviews, setExpandedReviews] = useState({})

  useEffect(() => {
    loadReviews()
  }, [toyId, currentPage])

  const loadReviews = async () => {
    try {
      const allReviews = await reviewService.getByToyId(toyId)
      const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE
      const endIndex = startIndex + REVIEWS_PER_PAGE
      
      setTotalPages(Math.ceil(allReviews.length / REVIEWS_PER_PAGE))
      setReviews(allReviews.slice(startIndex, endIndex))
      calculateAverageRating(allReviews)
    } catch (err) {
      console.error('Error loading reviews:', err)
    }
  }

  const calculateAverageRating = (reviewsList) => {
    if (!reviewsList?.length) return 0
    const sum = reviewsList.reduce((acc, review) => acc + review.rating, 0)
    setAverageRating(Number((sum / reviewsList.length).toFixed(1)))
  }

  const handleRatingChange = (newRating) => {
    setNewReview(prev => ({ ...prev, rating: newRating }))
  }

  const handleSubmitReview = async (ev) => {
    ev.preventDefault()
    
    try {
      const reviewToAdd = {
        ...reviewService.getEmptyReview(),
        ...newReview,
        toyId
      }
      
      const savedReview = await reviewService.addReview(reviewToAdd)
      setReviews(prev => [...prev, savedReview])
      calculateAverageRating([...reviews, savedReview])
      setNewReview({ rating: 5, text: '' })
    } catch (err) {
      console.error('Error submitting review:', err)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      // window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewService.remove(reviewId)
      const updatedReviews = reviews.filter(review => review._id !== reviewId)
      setReviews(updatedReviews)
      calculateAverageRating(updatedReviews)
    } catch (err) {
      console.error('Error deleting review:', err)
    }
  }

  const canDeleteReview = (review) => {
    if (!user) return false
    if (user.isOwner) return true
    return review.byUser?._id === user._id || review.userId === user._id
  } 

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    return (
      <div className="pagination">
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-dots">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
            <button
              className="pagination-button"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    )
  }

  return (
    <div className="toy-reviews">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        <div className="average-rating">
          <StarRating value={averageRating}  style={{display: 'flex', alignItems: 'center'}} />
          <span className="rating-text">
            {averageRating} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmitReview} className="review-form">
        <div className="rating-input">
          <label>Your Rating:</label>
          <StarRating 
            value={newReview.rating} 
            onChange={handleRatingChange}
            interactive={true}
          />
        </div>
        <textarea
          value={newReview.text}
          onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
          placeholder="Write your review..."
          required
          minLength={10}
          maxLength={500}
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <img 
                  src={review.avatar} 
                  alt={review.userName} 
                  className="reviewer-avatar"
                />
                <div className="reviewer-details">
                  <span className="reviewer-name">{review.userName}</span>
                  <StarRating value={review.rating} readonly={true} />
                </div>
              </div>
              <div className="review-actions">
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                {canDeleteReview(review) && (
                  <button 
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(review._id)}
                    title="Delete Review"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
            <div>
              <p className={`review-text ${expandedReviews[review._id] ? 'expanded' : ''} ${review.text.length > 150 ? 'has-more' : ''}`}>
                {review.text}
              </p>
              {review.text.length > 150 && (
                <button 
                  className="read-more-btn"
                  onClick={() => toggleReviewExpansion(review._id)}
                >
                  {expandedReviews[review._id] ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  )
} 