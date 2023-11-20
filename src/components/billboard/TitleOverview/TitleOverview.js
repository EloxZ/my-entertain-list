import React from 'react'
import styles from './TitleOverview.module.css';
import Image from 'next/image';
import { MovieGenres } from '@/utils/title-filter';

export default function TitleOverview(props) {
  let backgroundImage;
  let overviewData;
  const HEIGHT = 213;
  const WIDTH = HEIGHT * 0.675;
  if (props.selectedTitle) {
    console.log(props.selectedTitle);
    overviewData = <div className='overview-wrapper'>
      <div className='overview-header'>
        <img className="rounded-md" alt={props.selectedTitle.title} src={"https://image.tmdb.org/t/p/w500" + props.selectedTitle.poster_path} width={WIDTH} height={HEIGHT}/>
        <div className="flex justify-between mt-2 text-xl" style={{maxWidth:WIDTH}}>
          <div>{props.selectedTitle.vote_average.toString().slice(0,3) + " ★"}</div>
          <div>{props.selectedTitle.release_date.toString().slice(0,4)}</div>
        </div>
      </div>
      <div className='overview-info w-2/3 flex flex-col'>
        <p className='text-4xl'>{props.selectedTitle.title}</p>
        <p className='mt-4 max-h-30 pr-4 overflow-y-auto text-justify'>{props.selectedTitle.overview}</p>
        <div className='flex gap-2 mt-4'>
          {loadGenres(props.selectedTitle.genre_ids)}
        </div>
      </div>
    </div>
    backgroundImage = <img className="min-w-full absolute -top-32" src={"https://image.tmdb.org/t/p/original" + props.selectedTitle.backdrop_path} fill="true"/>
  }
  
  <Image src="" />
  return (
    <div className={styles.titleOverview}>
      {backgroundImage}
      {overviewData}
      
    </div>
  )
}

function loadGenres(genres) {
  const genresList = [];
  for (const genre of genres) {
    genresList.push(<div key={genre} className='bg-black py-1 px-2 rounded'>{MovieGenres[genre].name}</div>);
  }
  return genresList;
}
