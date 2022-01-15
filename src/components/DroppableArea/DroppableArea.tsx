import React, {useContext, useEffect, useRef, useState} from 'react';
import {CursorContext} from "../Provider/CursorContextProvider";
import './DroppableArea.css';

const DroppableArea : React.FC = () => {
    const { cursor ,setCursor } = useContext(CursorContext);
    const dropAreaRef = useRef(null);
    const svgRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [dropX, setDropX] = useState(0);
    const [dropY, setDropY] = useState(0);

    const handleMouseDown = (event : any) => {
        console.log("event.X: ", event.clientX);
        console.log("event.Y: ", event.clientY);

        const dropArea = document.querySelector('.dropArea');

        const dropAreaBBox = dropArea?.getBoundingClientRect();

        if (dropAreaBBox) {
            console.log("dropArea X", dropAreaBBox.x);
            console.log("dropArea Y", dropAreaBBox.y);

            const mousePosInDropArea =  {
                x : event.clientX - dropAreaBBox.x,
                y: event.clientY - dropAreaBBox.y
            }

            console.log("mousePosInDropArea X: ", mousePosInDropArea.x);
            console.log("mousePosInDropArea Y: ", mousePosInDropArea.y);


            const dropAreaElem = dropAreaRef.current;

            setDropX(mousePosInDropArea.x-25);
            setDropY(mousePosInDropArea.y-25);
        }
    }

    const handleMouseOver = (event : any) => {
        console.log("Mouse over");
        setHovered(!hovered);
    }


    return (
        <svg ref={svgRef}>
            <rect
                  className={hovered ? 'dropArea-active' : 'dropArea'}
                  ref={dropAreaRef}
                  onMouseOver={handleMouseOver}
                  onMouseDown={handleMouseDown}
                  width="100" height="100" fill="#050"/>
            <rect width="30" height="30" x={dropX} y={dropY}/>
        </svg>)
}

export default DroppableArea;

