import React, { useState } from "react";
import PropTypes from "prop-types";

const InputField = ({ value, label, placeholder, type, name, onChange,stylesName,checked,disabled }) => {
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  if(type=="radio"){
    return (
      <div className={stylesName}>
      <input
          type={type}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          checked={checked}
          disabled={disabled}
        />
    </div>
    );
  }

  return (
    <div className={"form-group "+ stylesName}>
      {label && <label htmlFor="app-input-field" className="text-sm">{label}</label>}

      {type === "textarea" ? (
        <textarea
          className={"form-control"}
          placeholder={placeholder}
          value={value}
          defaultValue={value}
          onChange={handleChange}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          disabled={disabled}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  stylesName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};

InputField.defaultProps = {
  value: "",
  label: "",
  name: "",
  placeholder: "",
  type: "text",
  stylesName:""
};

export default InputField;
