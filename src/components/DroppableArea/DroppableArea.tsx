import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {CursorContext} from "../Provider/CursorContextProvider";
import './DroppableArea.css';

const DroppableArea : React.FC = () => {
    const { cursor ,setCursor } = useContext(CursorContext);
    const containerRef = useRef(null);
    const svgRef : any = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [dropX, setDropX] = useState(1000);
    const [dropY, setDropY] = useState(1000);

    useEffect(() => {
        setTimeout(() => {
            const containerElem = containerRef.current;
            console.log("useEffect containerElem: ", containerElem);
        }, 300)

    },[]);

    const handleMouseDown = (event : any) => {
        console.log("mouse down...");
        console.log("event.X: ", event.clientX);
        console.log("event.Y: ", event.clientY);


        const svgElem = svgRef.current;
        console.log("Mouse down svgBBox: ", svgElem.getBoundingClientRect());
        // const dropArea = document.querySelector('.dropArea');
        // console.log(dropArea);
        // const dropAreaBBox = dropArea?.getBoundingClientRect();
        const dropAreaBBox = svgElem.getBoundingClientRect();
        if (dropAreaBBox) {
            console.log("dropArea X", dropAreaBBox.x);
            console.log("dropArea Y", dropAreaBBox.y);

            const mousePosInDropArea =  {
                x : event.clientX - dropAreaBBox.x,
                y: event.clientY - dropAreaBBox.y
            }

            console.log("mousePosInDropArea X: ", mousePosInDropArea.x);
            console.log("mousePosInDropArea Y: ", mousePosInDropArea.y);
            toggleCursor();
            setDropX(mousePosInDropArea.x-25);
            setDropY(mousePosInDropArea.y-25);
        }
    }


    const toggleCursor = useCallback(() => {
        setCursor(({active}) => ({active: !active}));
    },[])


    const handleMouseUp = () => {
        console.log("Mouse up...");
    }

    const handleMouseEnter = () => {
        console.log("Mouse entered...");
        setHovered(true);
    }

    const handleMouseLeave = () => {
        console.log("Mouse left...");
        setHovered(false)
    }



    return (
        <div className="container" ref={containerRef}>
            <svg ref={svgRef} width="500" height="500">
                <rect
                    id="dropArea"
                    className={hovered ? 'dropArea-active' : 'dropArea'}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    width="200"
                    height="200"/>
                <rect width="30" height="30" x={dropX} y={dropY}/>
            </svg>
        </div>
      )
}

export default DroppableArea;

