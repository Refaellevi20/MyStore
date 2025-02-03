import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.local'
import { savetoy } from '../store/toy/toy.action'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ImgUploader } from '../cmps/ImgUploader'

export function EditToy() {
  const navigate = useNavigate()
  const { toyId } = useParams()
  const user = useSelector((storeState) => storeState.userModule.user)
  
  const [toy, setToy] = useState(toyService.getEmptytoy())

  useEffect(() => {
    if (!user?.isOwner) {
      showErrorMsg('Only admins can access this page')
      navigate('/')
      return
    }

    loadToy()
  }, [])

  async function loadToy() {
    if (toyId) {
      try {
        const loadedToy = await toyService.getById(toyId)
        setToy(loadedToy)
      } catch (err) {
        console.log('Had issues loading toy', err)
        navigate('/toy')
      }
    }
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    setToy((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onUploaded(imgUrl) {
    setToy(prevToy => ({
      ...prevToy,
      imgUrls: [...(prevToy.imgUrls || []), imgUrl]
    }))
  }

  function onRemoveImage(indexToRemove) {
    setToy(prevToy => ({
      ...prevToy,
      imgUrls: prevToy.imgUrls.filter((_, index) => index !== indexToRemove)
    }))
  }

  async function onSaveToy(ev) {
    ev.preventDefault()
    if (!toy.imgUrls || toy.imgUrls.length === 0) {
      showErrorMsg('Must upload at least one image')
      return
    }
    
    try {
      await savetoy(toy)
      showSuccessMsg('Toy saved successfully')
      navigate('/toy')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save toy')
    }
  }

  const { name, price, labels, summary, imgUrls = [], type, capacity } = toy

  return (
    <section className="edit-toy">
      <h2>{toyId ? 'Edit Toy' : 'Add Toy'}</h2>
      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={type}
          onChange={handleChange}
          required
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={handleChange}
          required
        />

        <label htmlFor="labels">Labels (comma separated):</label>
        <input
          type="text"
          id="labels"
          name="labels"
          value={labels?.join(',') || ''}
          onChange={(e) => setToy({ ...toy, labels: e.target.value.split(',').map(l => l.trim()) })}
        />

        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          name="summary"
          value={summary}
          onChange={handleChange}
          required
        />

        <div className="image-upload-section">
          <label>Images:</label>
          <ImgUploader onUploaded={onUploaded} />
          
          <div className="uploaded-images">
            {imgUrls.map((url, index) => (
              <div key={index} className="image-preview">
                <img src={url} alt={`Toy ${index + 1}`} />
                <button 
                  type="button" 
                  onClick={() => onRemoveImage(index)}
                  className="remove-img-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">{toyId ? 'Update' : 'Add'} Toy</button>
      </form>
    </section>
  )
}