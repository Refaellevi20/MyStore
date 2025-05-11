import { useNavigate, useLocation } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'
// import { useModal } from '../../customHooks/useModal'
import { utilService } from '../../services/util.service'

export function ToyList({ toys, isOwner }) {
  const navigate = useNavigate()
  const currLocation = useLocation()

  const handleClick = (toyId) => {
    const searchStr = utilService.setAnyBlankParamsWithDefaults(
      currLocation.search
    )
    navigate(`/toy/${toyId}${searchStr}`)
  }

  function onEditToy(ev, toyId) {
    ev.stopPropagation() // Prevent triggering the parent onClick
    navigate(`/toy/edit/${toyId}`)
  }

  return (
    <ul className='card-grid toy-list clean-list main-layout'>
      {toys.map((toy) => {
        return (
          <li
            key={toy._id}
            onClick={() => handleClick(toy._id)}
            className='toy-list-item'
          >
            <ToyPreview toy={toy} />
            {isOwner && (
              <button 
                className="edit-btn" 
                onClick={(ev) => onEditToy(ev, toy._id)}
              >
                Edit
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
