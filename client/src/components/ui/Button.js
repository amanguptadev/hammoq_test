import React from "react";
import PropTypes from "prop-types";

const Button = ({ text,  type }) => (
  <button type={type} className="bg-blue-600 w-full py-2 text-white hover:bg-blue-700">
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: "button",
};

export default Button;
