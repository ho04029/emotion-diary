import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { diaryReducerContext } from "./../App";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_description: "완전 좋음",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
  },
  {
    emotion_id: 2,
    emotion_description: "좋음",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
  },
  {
    emotion_id: 3,
    emotion_description: "그럭 저럭",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
  },
  {
    emotion_id: 4,
    emotion_description: "나쁨",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
  },
  {
    emotion_id: 5,
    emotion_description: "완전 나쁨",
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(1);
  const [content, setContent] = useState("");

  const { onCreate, onEdit } = useContext(diaryReducerContext);
  const contentRef = useRef();
  const navigate = useNavigate();

  const emotionHandler = (emotionId) => {
    setEmotion(emotionId);
  };

  const submitHandler = () => {
    if (content.length < 1) {
      contentRef.current.focus();
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  //Edit컴포넌트에서만 사용됨
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <Header
        headerText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
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
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrpper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotion_id}
              {...item}
              onClick={emotionHandler}
              isSelected={item.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>일기 쓰기</h4>
        <div className="textarea_wrapper">
          <textarea
            placeholder="일기를 여기에 입력하세요"
            value={content}
            ref={contentRef}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <Button
            text={"취소하기"}
            onClick={() => {
              navigate(-1);
            }}
          />
          <Button text={"작성완료"} type={"positive"} onClick={submitHandler} />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
