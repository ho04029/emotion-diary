import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";

const dummy = [
  { id: 1, content: "오늘의 일기", emotion: 1, date: 1666076471461 },
  { id: 2, content: "오늘의 일기2", emotion: 2, date: 1666076471462 },
  { id: 3, content: "오늘의 일기3", emotion: 3, date: 1666076471463 },
  { id: 4, content: "오늘의 일기4", emotion: 4, date: 1666076471464 },
  { id: 5, content: "오늘의 일기5", emotion: 5, date: 1666076471465 },
];

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
        item.id === data.id ? { ...data } : item
      );
      break;
    }
    default:
      return state;
  }

  return newState;
};

export const diaryStateContext = React.createContext();
export const diaryReducerContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummy);
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
  const onEdit = (data) => {
    dispatch({ type: "EDINT", data });
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
              <Route path="/Edit" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </diaryReducerContext.Provider>
    </diaryStateContext.Provider>
  );
}

export default App;
