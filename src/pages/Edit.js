import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParmas] = useSearchParams();

  const id = searchParams.get("id");
  const method = searchParams.get("method");

  return (
    <div>
      <Button
        text={"홈"}
        onClick={() => {
          navigate("/");
        }}
      />
      <Button
        text={"뒤로가기"}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Button
        text={"파람바꾸기"}
        onClick={() => {
          console.log(id + method);
          setSearchParmas({ who: "linda" });
        }}
      />
    </div>
  );
};

export default Edit;
