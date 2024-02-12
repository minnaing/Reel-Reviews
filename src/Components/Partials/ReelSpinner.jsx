import React from "react";

// IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS
import "./partials.css";

const ReelSpinner = () => {
  return (
    <div className="body-wrapper">
      <div className="icon-wrapper">
        <div className="reel">
          <div className="pole --pole1"></div>
          <div className="pole --pole2"></div>
          <div className="pole --pole3"></div>
          <div className="pole --pole4"></div>
          <div className="pole --pole5"></div>
          <div className="pole --pole6"></div>
          <div className="center"></div>
        </div>
        <div className="strap"></div>
      </div>
      <span className="loading-text">Loading...</span>

      <h3 style={{ textAlign: "center" }}>No trailer available. Please search for another movie.</h3>
    </div>
  );
};

export default ReelSpinner;
