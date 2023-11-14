import React from 'react'
import LeftGroupButton from '../LeftGroupButton/LeftGroupButton'
import RightGroupButton from '../RightGroupButton/RightGroupButton'
import MidGroupButton from '../MidGroupButton/MidGroupButton';

export default function Pagination(props) {
    const pageButtons = loadPageButtons(props.pages, props.currentPage, props.setCurrentPage);

    return (
        <div className='flex'>
            <LeftGroupButton
                text="< Previous"
                isDisabled={props.currentPage == 1}
                onClick={() => previousPage(props.currentPage, props.setCurrentPage)}
            />
            {pageButtons}
            <RightGroupButton
                text="Next >"
                isDisabled={props.currentPage == props.pages}
                onClick={() => nextPage(props.currentPage, props.setCurrentPage)}
            />
        </div>
    )
}

function loadPageButtons(pages, currentPage, setCurrentPage) {
    const pageButtons = [];
    const ADJACENT_BUTTONS = 2;

    pageButtons.push(
        <MidGroupButton
            key={currentPage}
            text={currentPage}
            isSelected={true}
        />
    );

    for (let i=1; i<=ADJACENT_BUTTONS; i++) {
        if (currentPage-i > 1) {
            pageButtons.unshift(
                <MidGroupButton
                    key={currentPage-i}
                    text={currentPage-i}
                    onClick={()=>setCurrentPage(currentPage-i)}
                />
            );

            if (i == ADJACENT_BUTTONS && currentPage-i > 2) {
                pageButtons.unshift(
                    <MidGroupButton
                        key={"group"+i}
                        text="..."
                        isDisabled={true}
                    />
                );
            }
        }

        if (currentPage+i < pages) {
            pageButtons.push(
                <MidGroupButton
                    key={currentPage+i}
                    text={currentPage+i}
                    onClick={()=>setCurrentPage(currentPage+i)}
                />
            );

            if (i == ADJACENT_BUTTONS && currentPage+i < pages-1) {
                pageButtons.push(
                    <MidGroupButton
                        key={"group"+i}
                        text="..."
                        isDisabled={true}
                    />
                );
            }
        }
    }

    if (currentPage != 1) {
        pageButtons.unshift(
            <MidGroupButton
                key={1}
                text={1}
                onClick={()=>setCurrentPage(1)}
            />
        );
    }

    if (currentPage != pages) {
        pageButtons.push(
            <MidGroupButton
                key={pages}
                text={pages}
                onClick={()=>setCurrentPage(pages)}
            />
        );
    }

    return pageButtons;
}

function nextPage(currentPage, setCurrentPage) {
    setCurrentPage(currentPage+1);
}

function previousPage(currentPage, setCurrentPage) {
    setCurrentPage(currentPage-1);
}
