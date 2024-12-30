import React from "react";

const InputField = ({ value, htmlFor, placeholder, name, handleChange, themeProperties, required, type = "text", pattern , address = false , disable = false}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={htmlFor}
        pattern={type === "tel" ? pattern : null}
        name={name}
        maxLength={type === "tel" ? 10 : null}
        value={value}
        onChange={handleChange}
        disabled={disable}
        className={` px-3 overflow-hidden py-[9px] ${address ? ' min-w-[480px]':'w-[192px]'} border rounded-lg focus:outline-none peer ${type === 'number' ? 'no-spinner' : ''}`}
        required={required}
      />
      <label
        htmlFor={htmlFor}
        className={`absolute left-3 text-nowrap text-gray-500 top-3 transition-all duration-200 transform ${value ? '-translate-y-8 -translate-x-2 opacity-100 text-[12px]' : 'peer-focus:-translate-y-8 peer-focus:text-[12px] peer-placeholder-shown:translate-y-0 text-[14px] '
        }`}
        style={{
          // color: value && themeProperties.textColorAlt,
        }}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputField;