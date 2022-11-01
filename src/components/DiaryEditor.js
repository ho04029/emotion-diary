import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { diaryReducerContext } from "./../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotionList";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

const DiaryEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(1);
  const [content, setContent] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(diaryReducerContext);
  const contentRef = useRef();
  const navigate = useNavigate();

  const emotionHandler = useCallback((emotionId) => {
    setEmotion(emotionId);
  }, []);

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

  const removeHandler = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate(-1, { replace: true });
    }
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
        rightBtn={
          isEdit && (
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={removeHandler}
            />
          )
        }
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
