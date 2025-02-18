import { useState, useEffect } from 'react'
import { StarRating } from './StarRating'
import { reviewService } from '../services/reviews.service.local'

export function ToyReviews({ toyId }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, text: '' })
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    loadReviews()
  }, [toyId])

  const loadReviews = async () => {
    try {
      const reviews = await reviewService.getByToyId(toyId)
      setReviews(reviews)
      calculateAverageRating(reviews)
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

  return (
    <div className="toy-reviews">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        <div className="average-rating">
          <StarRating value={averageRating} readonly={true} />
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
                <span className="reviewer-name">{review.userName}</span>
              </div>
              <StarRating value={review.rating} readonly={true} />
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 