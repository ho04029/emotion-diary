import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const DiaryItem = ({ id, content, emotion, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={["img_wrapper", `img_wrapper_${emotion}`].join(" ")}
      >
        <img
          alt={emotion}
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        />
      </div>
      <div onClick={goDetail} className="content_wrapper">
        <div className="date">{strDate}</div>
        <div className="content">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
