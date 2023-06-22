import React from "react";
import PropTypes from "prop-types";
import "./homeTemplate.scss";
import Logo from "../../resources/others/logo-metrobank.svg";

const HomeTemplate = (props) => {
  return (
    <div className="home-template">
      <div className="logo">
        <img src={Logo} alt="logo-metrobank" />
      </div>
    </div>
  );
};

HomeTemplate.propTypes = {};

export default HomeTemplate;
