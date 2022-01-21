import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {CursorContext} from "../Provider/CursorContextProvider";
import './DroppableArea.css';

const DroppableArea : React.FC = () => {
    const { cursor ,setCursor } = useContext(CursorContext);
    const containerRef = useRef(null);
    const svgRef : any = useRef(null);
    const rectRef : any = useRef(null);
    const [hovered, setHovered] = useState(false);

    const [position, setPosition] = useState({
        x: 1000,
        y : 1000,
        coords : { x: 0, y: 0}
    })

    useEffect(() => {
        setTimeout(() => {
            const containerElem = containerRef.current;
            // console.log("useEffect containerElem: ", containerElem);
        }, 300)

    },[]);

    const handleMouseDown = (event : any) => {
        // console.log("mouse down...");
        // console.log("event.X: ", event.clientX);
        // console.log("event.Y: ", event.clientY);

        if (!cursor.active) {
            return;
        }

        const svgElem = svgRef.current;
        const dropAreaBBox = svgElem.getBoundingClientRect();
        if (dropAreaBBox) {
            // console.log("dropArea X", dropAreaBBox.x);
            // console.log("dropArea Y", dropAreaBBox.y);

            const mousePosInDropArea =  {
                x : event.clientX - dropAreaBBox.x,
                y: event.clientY - dropAreaBBox.y
            }

            setPosition(position => {
                return {
                    x: mousePosInDropArea.x-25,
                    y: mousePosInDropArea.y-25,
                    coords: {
                        x: event.pageX,
                        y: event.pageY,
                    },
            };
            });
            removeAttachment();

        }
    }


    const removeAttachment = useCallback(() => {
        setCursor(({active}) => ({active: false}));
    },[])


    const handleMouseUp = () => {
        // console.log("Mouse up...");
    }

    const handleMouseEnter = () => {
        // console.log("Mouse entered...");
        setHovered(true);
    }

    const handleMouseLeave = () => {
        // console.log("Mouse left...");
        setHovered(false)
    }

    const handleDraggableMouseDown = (event : any) => {
        console.log("Draggable mouse down...");
        console.log("event page x", event.pageX);
        // startDrag(event);
        document.addEventListener('mousemove', handleDraggableMouseMove.current);
    }

    const handleDraggableMouseMove = useRef((e : any) => {
        setPosition(position => {
            const xDiff = position.coords.x - e.pageX;
            const yDiff = position.coords.y - e.pageY;
            return {
                x: position.x - xDiff,
                y: position.y - yDiff,
                coords: {
                    x: e.pageX,
                    y: e.pageY,
                },
            };
        });
    });

    const handleDraggableMouseUp = () => {
        document.removeEventListener('mousemove', handleDraggableMouseMove.current);
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
                <rect
                      ref={rectRef}
                      className={'draggable'}
                      onMouseDown={handleDraggableMouseDown}
                      onMouseUp={handleDraggableMouseUp}
                      width="30" height="30" x={position.x} y={position.y}/>
            </svg>
        </div>
      )
}

export default DroppableArea;

