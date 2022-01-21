import React, {useContext, useEffect, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import {CursorContext} from "../Provider/CursorContextProvider";
import './Cursor.css';

const Cursor : React.FC = () => {
    const { clientX, clientY } = useMousePosition();
    const {cursor, setCursor} = useContext(CursorContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.body.removeEventListener("mouseenter",   handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                pointerEvents: "none"
            }}
        >
            <svg
                className="cursor"
                width={50}
                height={50}
                viewBox="0 0 50 50"
                style={{
                    position: "absolute",
                    left: clientX,
                    top: clientY,
                    // transform: `translate(-50%, -50%) scale(${cursor.active ? 2.5 : 1})`,
                    transform: `translate(-50%, -50%)`,
                    stroke: cursor.active ? "black" : "white",
                    strokeWidth: 1,
                    // fill: cursor.active ? "rgba(255,255,255,.5)" : "black",
                    transition: "transform .2s ease-in-out",
                    // TODO: extra check on clientX needed here
                    // because mouseleave event not always firing
                    // when slowly exiting left side of browser
                    opacity: isVisible && clientX > 1 ? 1 : 0,
                }}
            >
                {
                    cursor.active ?  <rect width="40" height="38" fill="blue"/> : null
                }
            </svg>
            <p>{clientX}</p>
            <p>{clientY}</p>
        </div>
    );
};

export default Cursor;
