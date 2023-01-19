import React from "react";
import "../Styles/footer.css";

const Footer = () => {
  return (
    <>
      <div
        className="footerBody"
        style={{ position: "absolute", bottom: "0", width: "100vw" }}
      >
        <div className="footerInnerBody">
          <h4>Report Error</h4>
          <h4>Suggestion</h4>
          <h4>Complaint</h4>
          <h4>About_US</h4>
        </div>
      </div>
    </>
  );
};

export default Footer;
