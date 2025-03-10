import React from "react";
import "./components.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-icon">
        <i className="fas fa-phone"></i>
      </div>
      <div className="footer-icon active">
        <i className="fas fa-history"></i>
      </div>
      <div className="footer-icon">
        <i className="fas fa-user"></i>
      </div>
      <div className="footer-icon">
        <i className="fas fa-cog"></i>
      </div>
    </div>
  );
};

export default Footer;
