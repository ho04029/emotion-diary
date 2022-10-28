import React from "react";

const EmotionItem = ({ emotion_img, emotion_description }) => {
  return (
    <div className="EmotionItem">
      <img src={emotion_img} alt={emotion_description} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default EmotionItem;
