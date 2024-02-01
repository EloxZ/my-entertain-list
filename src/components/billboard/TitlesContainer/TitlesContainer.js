import React, { useEffect, useRef } from 'react'
import Title from '../Title/Title'

export default function TitlesContainer(props) {
    const divRef = useRef(null);
    const titles = loadTitles(props.titles?.results, props.selectedTitle, props.setSelectedTitle, props.setCurrentSection);

    useEffect(()=>{
        scrollToTop(divRef);
    }, [props.titles]);
    
    
    return (
        <div ref={divRef} id={props.id} className='titles-container bg-darker-haiti rounded-md p-12 flex gap-8 flex-wrap overflow-y-auto'>
            {titles}
        </div>
    )
}

function loadTitles(results, selectedTitle, setSelectedTitle, setCurrentSection) {
    const titlesList = [];
    if (results) {
        for (const result of results) {
            titlesList.push(
                <Title
                    data={result}
                    key={result.id}
                    posterPath={result.poster_path}
                    isSelected={selectedTitle?.id === result.id ?? false}
                    setSelectedTitle={setSelectedTitle}
                    setCurrentSection={setCurrentSection}
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