import React, { useEffect, useRef } from 'react'
import Title from '../Title/Title'

export default function TitlesContainer(props) {
    const divRef = useRef(null);
    const titles = loadTitles(props.titles?.results, props.selectedTitle, props.setSelectedTitle);

    useEffect(()=>{
        scrollToTop(divRef);
    }, [props.titles]);
    
    
    return (
        <div ref={divRef} id={props.id} className='bg-darker-haiti rounded-md h-full p-12 flex gap-8 flex-wrap overflow-y-auto'>
            {titles}
        </div>
    )
}

function loadTitles(results, selectedTitle, setSelectedTitle) {
    const titlesList = [];
    if (results) {
        for (const result of results) {
            titlesList.push(
                <Title
                    data={result}
                    key={result.id}
                    title={result.title}
                    posterPath={result.poster_path}
                    isSelected={selectedTitle?.id === result.id ?? false}
                    setSelectedTitle={setSelectedTitle}
                />
            );
        }
    }

    return titlesList;
}

function scrollToTop(divRef) {
    if (divRef.current) {
        divRef.current.scrollTop = 0;
    }
}