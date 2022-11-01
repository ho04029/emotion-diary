import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortSelectOption = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];
const filterSelectOption = [
  { value: "all", name: "전체" },
  { value: "good", name: "기분 좋은 날" },
  { value: "bad", name: "기분 나쁜 날" },
];

const MenuControl = React.memo(({ value, option, onChange }) => {
  return (
    <select
      className="MenuControl"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {option.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const [sort, setSort] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const getDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return item.emotion <= 3;
      } else if (filter === "bad") {
        return item.emotion > 3;
      }
    };
    const compare = (a, b) => {
      if (sort === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => filterCallback(item));
    const sortedList = filterList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <MenuControl
            value={sort}
            onChange={setSort}
            option={sortSelectOption}
          />
          <MenuControl
            value={filter}
            onChange={setFilter}
            option={filterSelectOption}
          />
        </div>
        <div className="right_col">
          <Button
            text={"일기 쓰기"}
            onClick={() => {
              navigate("/new");
            }}
            type={"positive"}
          />
        </div>
      </div>

      {getDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
