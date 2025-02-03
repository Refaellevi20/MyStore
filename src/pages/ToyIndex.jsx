import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ToyList } from '../cmps/toy/ToyList' 
import { loadtoys } from '../store/toy/toy.action'
import { useLoginModal } from '../hooks/useLoginModal'
import { LoginSignup } from '../cmps/LoginSignup'

export function ToyIndex() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const user = useSelector((storeState) => storeState.userModule.user)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const { LoginModal, openLoginModal, closeLoginModal } = useLoginModal()

  const filterBy = {
    category: searchParams.get('category'),
    location: searchParams.get('location'),
    startDate: new Date().setDate(new Date().getDate() + 1),
    endDate: new Date().setDate(new Date().getDate() + 4),
  }

  useEffect(() => {
    if (!toys || !toys.length) loadtoys(filterBy)
  }, [searchParams])

  function handleChange({ field, value }) {
    setSearchParams((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onAddToy() {
    if (!user) {
      openLoginModal(<LoginSignup closeModal={closeLoginModal} />)
    } else if (user.isOwner) {
      navigate('/toy/edit')
    }
  }

  return (
    <section style={{ position: 'relative' }}>
      <button 
        className="add-toy-btn"
        onClick={onAddToy}
      >
        {user?.isOwner ? 'Add New Toy' : 'Login to Add Toy'}
      </button>
      
      {!!toys && <ToyList toys={toys} isOwner={user?.isOwner} />}
      <LoginModal />
    </section>
  )
}