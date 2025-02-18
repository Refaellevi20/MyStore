import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service.local'
import { useNavigate } from 'react-router-dom'

export function RelatedToys({ currentToy }) {
  const [relatedToys, setRelatedToys] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadRelatedToys()
  }, [currentToy])

  const loadRelatedToys = async () => {
    try {
      // In real app, implement proper filtering in service
      const toys = await toyService.query()
      const filtered = toys
        .filter(toy => toy._id !== currentToy._id)
        .filter(toy => toy.labels?.some(label => currentToy.labels?.includes(label)))
        .slice(0, 4)
      setRelatedToys(filtered)
    } catch (err) {
      console.error('Error loading related toys:', err)
    }
  }

  return (
    <div className="related-toys">
      <h3>Related Toys</h3>
      <div className="related-toys-grid">
        {relatedToys.map(toy => (
          <div 
            key={toy._id} 
            className="related-toy-card"
            onClick={() => navigate(`/toy/${toy._id}`)}
          >
            <img src={toy.imgUrls[0]} alt={toy.name} />
            <h4>{toy.name}</h4>
            <p className="price">${toy.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 