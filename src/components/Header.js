import React from "react";

const Header = ({ leftBtn, rightBtn, headerText }) => {
  return (
    <header className="header">
      <div className="leftSide">{leftBtn}</div>
      <div className="headerText">{headerText}</div>
      <div className="rightSide">{rightBtn}</div>
    </header>
  );
};

export default Header;
