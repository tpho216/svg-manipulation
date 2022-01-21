import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import Cursor from "./components/Cursor/Cursor";
import CursorContextProvider from "./components/Provider/CursorContextProvider";
import Button from "./components/Button/Button";
import DroppableArea from "./components/DroppableArea/DroppableArea";
import {Grid} from "./components/Grid/Grid";
import {SpecialGrid} from "./components/SpecialGrid/SpecialGrid";
import SingleRowGrid from "./components/SingleRowGrid/SingleRowGrid";

function App() {

  return (
    <div className="App">
        <CursorContextProvider>
            <Cursor/>
            {/*<Button/>*/}
            {/*<DroppableArea/>*/}
            {/*<Grid/>*/}
            {/*<SpecialGrid/>*/}
            <SingleRowGrid/>
        </CursorContextProvider>

    </div>
  );
}

export default App;
