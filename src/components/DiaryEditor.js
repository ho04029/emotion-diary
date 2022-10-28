import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_description: "완전 좋음",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      <Header
        headerText={"새로운 일기 쓰기"}
        leftBtn={<Button text={"뒤로 가기"} onClick={() => navigate(-1)} />}
      />
      <section>
        <h4>날짜 선택하기</h4>
        <div className="input_date_box">
          <input
            type="date"
            className="input_date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </section>
      <section>
        <div className="emotion_list_wrpper">
          {emotionList.map((item) => (
            <EmotionItem key={item.emotion_id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
