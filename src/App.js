import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      const targetId = action.targetId;
      newState = state.filter((item) => item.id !== targetId);
      break;
    }
    case "EDIT": {
      const data = action.data;
      newState = state.map((item) =>
        item.id === action.targetId ? { ...data } : item
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const diaryStateContext = React.createContext();
export const diaryReducerContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDINT",
      targetId,
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };
  return (
    <diaryStateContext.Provider value={data}>
      <diaryReducerContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </diaryReducerContext.Provider>
    </diaryStateContext.Provider>
  );
}

export default App;
