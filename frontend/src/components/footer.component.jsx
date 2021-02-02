import React, { Component } from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="mbr-small-footer mbr-section mbr-section-nopadding"
      id="footer1-32"
      //   style="background-color: rgb(0, 0, 0); padding-top: 1.75rem; padding-bottom: 1.75rem;"
    >
      <div className="container">
        <p className="text-xs-center">
          Copyright <AiOutlineCopyrightCircle /> 2020 CROISSANCE TECHNOLOGIES
        </p>
      </div>
    </footer>
  );
};

export default Footer;
