import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { diaryStateContext } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotionList";

const Diary = () => {
  const diaryList = useContext(diaryStateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetDiary) {
        //일기가 존재할 때
        setData(targetDiary);
      } else {
        //일기가 존재하지 않을 때
        alert("없는 일기 입니다");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id, navigate]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  }

  const curEmotionData = emotionList.find(
    (item) => item.emotion_id === data.emotion
  );
  return (
    <div className="DiaryPage">
      <Header
        headerText={`${getStringDate(new Date(data.date))}의 기록`}
        leftBtn={
          <Button
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightBtn={
          <Button
            text={"수정하기"}
            onClick={() => navigate(`/edit/${data.id}`)}
          />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              "diary_img_wrapper",
              `diary_img_wrapper_${data.emotion}`,
            ].join(" ")}
          >
            <img
              src={curEmotionData.emotion_img}
              alt={curEmotionData.emotion_description}
            />
            <div className="emotion_description">
              {curEmotionData.emotion_description}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
