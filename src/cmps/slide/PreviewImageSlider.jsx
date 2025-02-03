// import { Heart } from '../ui/heart'
import { Slider } from '../slider/slider'
// import { onLiketoyOptimistic } from '../../store/toy/toy.action'
// import { LoginSignup } from '../login-signup'
import { useSelector } from 'react-redux'

export function PreviewImageSlider({ imgUrls, isLiked, openModal, toyId }) {
  // const user = useSelector((state) => state.userModule.user)

  // function onLiketoy(toyId) {
  //   if (!user) {
  //     openModal(<LoginSignup />)
  //   } else {
  //     onLiketoyOptimistic(toyId)
  //   }
  // }

  // const isLoggedin = user ? true : false

  return (
    <div className='image-slider almost-square-ratio'>
      <span className='heart'>
        {/* <Heart
          handleClick={() => onLiketoy(toyId)}
          isLiked={isLiked}
          isLoggedin={isLoggedin}
        /> */}
      </span>
      <Slider>
        {imgUrls.map((url, idx) => (
          <img key={idx} src={url} alt='toy' />
        ))}
      </Slider>
    </div>
  )
}
