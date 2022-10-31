import React, { useContext, useEffect, useState } from "react";

import { diaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(diaryStateContext);
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        1
      ).getTime();

      setData(
        diaryList.filter((item) => item.date >= firstDay && item.date < lastDay)
      );
      console.log(lastDay);
    }
  }, [curDate, diaryList]);

  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1} 월`;

  const increaseDate = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseDate = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  return (
    <div>
      <Header
        leftBtn={<Button text={"<"} onClick={decreaseDate} />}
        rightBtn={<Button text={">"} onClick={increaseDate} />}
        headerText={headerText}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
