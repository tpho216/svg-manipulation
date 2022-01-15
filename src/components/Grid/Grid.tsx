import React, {useRef} from 'react';
import "./Grid.css";

export const Grid : React.FC = () => {
    const svgRectElem = useRef(null);


    const startDrag = (event: any, draggedElem: any) => {
        console.log(event, draggedElem)
    }




    return (
        <svg viewBox="0 0 30 20">
            <rect x="0" y="0" width="30" height="20" fill="#fafafa"/>
            <rect ref={svgRectElem}
                  onMouseDown={(e: any) => startDrag(e, svgRectElem)} className="draggable" x="4" y="5" width="8" height="10" fill="#007bff"/>
            <rect x="18" y="5" width="8" height="10"   fill="#888"/>
        </svg>


    )
}
