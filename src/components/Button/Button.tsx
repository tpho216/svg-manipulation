import React, {useContext, useCallback, useState} from "react";
import { CursorContext } from "../Provider/CursorContextProvider";
import useCursorHandlers from "../hooks/useCursorHandlers";
import './Button.css'
const Button = () => {
    const {cursor, setCursor} = useContext(CursorContext);
    const cursorHandlers = useCursorHandlers();
    const [displaySVG, setDisplaySVG] = useState(false);
    const toggleCursor = useCallback(() => {
        setCursor(({active}) => ({active: !active}));
    },[])

    const handleMouseDown = (event : any) => {
        console.log("event.X: ", event.clientX);
        console.log("event.Y: ", event.clientY);
        setDisplaySVG(!displaySVG);
    }

    return (
    <div>
        <button
        onMouseEnter={toggleCursor}
        onMouseLeave={toggleCursor}
        onMouseDown={handleMouseDown}
    >

        HOVER ME
    </button>
        {
            displaySVG ?
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
                </svg>
                :
                null
        }


    </div>
    )
}

export default Button;
