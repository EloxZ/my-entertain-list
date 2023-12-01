import React from 'react'
import Image from 'next/image'

export default function Title(props) {
    const HEIGHT = 213;
    const WIDTH = HEIGHT * 0.675;
    const titleName = (props.data?.title)? props.data.title : props.data?.name;
    let titlePoster;

    const onSelected = () => {
        if (props.isSelected) {
            props.setCurrentSection("info");
        } else {
            props.setSelectedTitle({...props.data});
        }
        
    }

    if (props.posterPath) {
        titlePoster = <Image alt={titleName} className="rounded-md" width={WIDTH} height={HEIGHT} src={"https://image.tmdb.org/t/p/w500" + props.posterPath}/>;
    } else {
        titlePoster = <div className='text-center break-words text-white px-2 h-full flex flex-col justify-center'>
            {titleName}
        </div>
    }

    return (
        <div onClick={onSelected} className={'bg-gray-800 rounded-md hover-outline-electric-violet cursor-pointer ' + ((props.isSelected)? "selected-title" : "")} style={{width:WIDTH, height:HEIGHT}}>
            {titlePoster}
        </div> 
    )
}
