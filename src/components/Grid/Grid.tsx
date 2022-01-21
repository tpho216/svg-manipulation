import React, {useRef} from 'react';
import "./Grid.css";

export const Grid : React.FC = () => {

    const handleClick = (event : any) => {
        console.log("Grid clicked", event);
        // console.log(`ClientX : ${event.clientX}, ClientY : ${event.clientY}`);
        var pos = getGridPosition(event);
        createRectAt(pos);
    }

    const createRectAt = (pos : any) => {
        var rect = document.createElementNS(pos.svg.namespaceURI, "rect");
        console.log(`snap x ${Math.floor(pos.x / 10) * 10} snap y ${Math.floor(pos.y / 10) * 10}`);
        rect.setAttribute("x", String(Math.floor(pos.x / 10) * 10));
        rect.setAttribute("y", String(Math.floor(pos.y / 10) * 10));
        rect.setAttribute("width", "10");
        rect.setAttribute("height", "10");
        rect.setAttribute("fill", "blue");
        pos.svg.appendChild(rect);
    }

    const getGridPosition = (event : any) => {
        var svg = event.nativeEvent.target.ownerSVGElement;
        var pt = svg.createSVGPoint();
        pt.x = event.nativeEvent.clientX;
        pt.y = event.nativeEvent.clientY;
        console.log(`pt before transformed`, pt);

        //converts screen coordinates to element co-ordinates
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());
        console.log(`pt transformed`, pt);

        return {svg: svg, x: pt.x, y: pt.y}
    }


    return (
        <svg viewBox="0 0 100 100" >
            <g>
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray"
                              strokeWidth="0.2"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" onClick={handleClick}/>
            </g>
        </svg>
    )
}
