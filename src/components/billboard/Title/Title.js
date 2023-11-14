import React from 'react'
import Image from 'next/image'

export default function Title(props) {
    const HEIGHT = 213;
    const WIDTH = HEIGHT * 0.675;
    let image;
    let titleText = "Probando";

    if (props.imgSrc) {
        image = <Image width={WIDTH} height={HEIGHT} src={props.imgSrc}/>;
        titleText = "";
    }

    return (
        <div className='bg-white rounded-md text-black hover-outline-electric-violet cursor-pointer' style={{width:WIDTH, height:HEIGHT}}>
            <div className='mt-4 px-4 text-center break-words'>{titleText}</div>
            {image}
        </div>
        
    )
}
