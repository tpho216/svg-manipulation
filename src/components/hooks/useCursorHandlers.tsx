import { useContext, useCallback} from "react";
import { CursorContext} from "../Provider/CursorContextProvider";

const useCursorHandlers = (options : any  = {}) => {
    const {cursor, setCursor} = useContext(CursorContext);

    const toggleCursor = () => {
        setCursor(({active}) => ({active: !active}));
    }


    const onMouseEnter = useCallback(event => {
        console.log("mouse enter");
        if (options.onMouseEnter) {
            options.onMouseEnter(event)
        }
        toggleCursor();
    }, []);

    const onMouseLeave = useCallback(event => {
        console.log("mouse leave");
        if (options.onMouseLeave) {
            options.onMouseLeave(event);
        }
        toggleCursor();
    }, []);

    return { onMouseEnter, onMouseLeave}
}

export default useCursorHandlers;
