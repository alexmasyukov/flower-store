import React from 'react'
import Img from 'react-image'
import styles from './Photo.module.sass'


const Photo = ({ src = '' }) => (
  <Img
    className={styles.photo}
    src={src}
    crossOrigin="anonymous"
    loader={(
      <div>Loading...</div>
    )}
  />
)

//   .container {
//   animation:anim 2s;
//   animation-duration:3s;
// }
// @keyframes anim {
//   from {opacity: 0;}
//   to {opacity: 1;}
// }

export default Photo