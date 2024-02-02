import React from "react";
import "../../src/App.css"
import Logo from "../../src/assets/Images/logo.ico"

const LoadingScreen = () => {
  return (
    <div className="loader">
      <div className="a">
        <div className="b">
        </div>
      </div>
      <div className="logo-container" >
        <img src={Logo} className="loading-logo" alt="logo" />
      </div>
    </div>
  )
};

export default LoadingScreen;
