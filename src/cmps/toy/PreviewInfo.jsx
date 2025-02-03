import { useLocation } from 'react-router'
import { utilService } from '../../services/util.service'
import { RatingReview } from '../RatingReview'

export function PreviewInfo({ info }) {
  // const url = useLocation()
  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        {/* <RatingReview reviews={info.reviews} /> */}
      </p>
      {/* <p className='text-grey'>{info.type}</p> */}
      {/* <p className='text-grey'>
        {/wishlist$/.test(url.pathname) && `${info.capacity} beds`}
      </p> */}
      <p className='text-bold'>
        {utilService.formatCurrency(info.price)}{' '}
        <span > night</span>
      </p>
    </>
  )
}
