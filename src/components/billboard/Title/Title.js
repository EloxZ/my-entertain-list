import React from 'react'
import Image from 'next/image'

export default function Title(props) {
    const HEIGHT = 213;
    const WIDTH = HEIGHT * 0.675;
    let titlePoster;

    const onSelected = () => {
        if (props.isSelected) {
            // go to title page
        } else {
            props.setSelectedTitle({...props.data});
        }
        
    }

    if (props.posterPath) {
        titlePoster = <Image alt={props.title} className="rounded-md" width={WIDTH} height={HEIGHT} src={"https://image.tmdb.org/t/p/w500" + props.posterPath}/>;
    } else {
        titlePoster = <div className='text-center break-words text-white px-2 h-full flex flex-col justify-center'>
            {props.title}
        </div>
    }

    return (
        <div onClick={onSelected} className={'bg-gray-800 rounded-md hover-outline-electric-violet cursor-pointer ' + ((props.isSelected)? "selected-title" : "")} style={{width:WIDTH, height:HEIGHT}}>
            {titlePoster}
        </div> 
    )
}
