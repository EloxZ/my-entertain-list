import React from 'react'
import styles from './TitleOverview.module.css';
import Image from 'next/image';
import { MovieGenres } from '@/utils/title-filter';
import WhiteButton from '@/components/global/WhiteButton/WhiteButton';
import ElectricButton from '@/components/global/ElectricButton/ElectricButton';

export default function TitleOverview(props) {
  let backgroundImage;
  let overviewData;
  let trailerButton;
  const title = (props.selectedTitle?.title)? props.selectedTitle.title : props.selectedTitle?.name;
  const releaseDate = (props.selectedTitle?.release_date)? props.selectedTitle.release_date : props.selectedTitle?.first_air_date;
  const HEIGHT = 213;
  const WIDTH = HEIGHT * 0.675;
  if (props.selectedTitle) {
    if (props.isTrailerAvailable) {
      trailerButton =
        <WhiteButton
        text={(props.currentSection === "trailer")? "◼ Trailer" : "▶ Trailer"}
        className="h-9"
        onClick={()=>{
          if (props.currentSection === "trailer") {
            props.setCurrentSection("titles");
          } else {
            props.setCurrentSection("trailer");
          }
        }}
      />
    }
    overviewData =
    <div className='overview-wrapper'>
      <div className='flex gap-10 justify-center'>
        <div className='overview-header'>
          <img className="rounded-md" alt={title} src={"https://image.tmdb.org/t/p/w500" + props.selectedTitle.poster_path} width={WIDTH} height={HEIGHT}/>
          <div className="flex justify-between mt-2 text-xl" style={{maxWidth:WIDTH}}>
            <div>{props.selectedTitle.vote_average?.toString().slice(0,3) + " ★"}</div>
            <div>{releaseDate?.toString().slice(0,4)}</div>
          </div>
        </div>
        <div className='overview-info w-2/3 flex flex-col'>
          <p className='text-4xl'>{title}</p>
          <p className='mt-4 max-h-48 pr-4 overflow-y-auto text-justify'>{props.selectedTitle.overview}</p>
        </div>
      </div>
      <div className='flex mt-4 px-14 justify-between items-baseline gap-4'>
        <div className='flex gap-2 overflow-y-auto whitespace-nowrap'>
          {loadGenres(props.selectedTitle.genre_ids)}
        </div>
        <div className='flex gap-2 whitespace-nowrap'>
          <WhiteButton 
            text={(props.currentSection === "info")? "✖ Info" : "✚ Info"} 
            className="h-9"
            onClick={()=>{
              if (props.currentSection === "info") {
                props.setCurrentSection("titles");
              } else {
                props.setCurrentSection("info");
              }
            }}
          />
          {trailerButton}
          <ElectricButton
            text={(props.currentSection === "list")? "Nevermind" : "Add To List"}
            className="h-9 small-button"
            onClick={()=>{
              if (props.currentSection === "list") {
                props.setCurrentSection("titles");
              } else {
                props.setCurrentSection("list");
              }
            }}
          />
        </div>
        
        
      </div>
    </div>
    backgroundImage = <img className="min-w-full absolute -top-32" src={"https://image.tmdb.org/t/p/original" + props.selectedTitle.backdrop_path} fill="true"/>
  }
  
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
    if (MovieGenres[genre]) {
      genresList.push(<div key={genre} className='bg-black py-1 px-2 rounded'>{MovieGenres[genre].name}</div>);
    }
    
  }
  return genresList;
}
