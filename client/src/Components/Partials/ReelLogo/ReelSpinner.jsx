import React from "react";
import PropTypes from 'prop-types';

// IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS
import "./_logo.css";

const ReelSpinner = ({ message }) => {
  return (
    <div className="body-wrapper">
      <div className="icon-wrapper">
        <div className="reel-logo-2">
          <div className="pole --pole1"></div>
          <div className="pole --pole2"></div>
          <div className="pole --pole3"></div>
          <div className="pole --pole4"></div>
          <div className="pole --pole5"></div>
          <div className="pole --pole6"></div>
          <div className="center"></div>
        </div>
        <div className="strap-1"></div>
      </div>
      {/* <span className="loading-text">{ message }</span> */}

      <h3 style={{ textAlign: "center" }}>{ message } Please search for another movie.</h3>
    </div>
  );
};

ReelSpinner.propTypes = {
  message: PropTypes.string
};

ReelSpinner.defaultProps = {
  message: 'Loading...'
};

export default ReelSpinner;
