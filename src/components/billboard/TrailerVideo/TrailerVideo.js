import React from 'react'
import styles from './TrailerVideo.module.css';

export default function TrailerVideo(props) {
    console.log(props.trailer);
  return (
    <div className={styles.trailerVideo}>
        <iframe className="w-screen" allow="fullscreen; autoplay" src={"https://www.youtube.com/embed/" + props.trailer.key + "?rel=0&autoplay=1"} frameborder="0" height="100%" width="100%"></iframe>
    </div>
  )
}
