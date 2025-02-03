import { useSelector } from 'react-redux'
import { PreviewImageSlider } from '../slide/PreviewImageSlider'
import { PreviewInfo } from './PreviewInfo'

export function ToyPreview({ toy,}) {
  const user = useSelector((state) => state.userModule.user)
  const isLiked = !!user
    ? toy?.likedByUsers?.find((miniUser) => miniUser._id === user._id)
    : false

  const imgUrls = toy.imgUrls
  const { price, reviews, type, capacity } = toy

  const {
    loc: { address: location },
  } = toy




  const info = { price, reviews, location, type, capacity }
  return (
    <article className='preview'>
      <PreviewImageSlider
        imgUrls={imgUrls}
        user={user}
        // openModal={openModal}
        isLiked={isLiked}
        toyId={toy._id}
      />
      <PreviewInfo info={info} />
    </article>
  )
}
