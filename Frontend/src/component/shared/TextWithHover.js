import React from "react";

const TextWithHover = ({ displayText}) => {
  return (
      <div
        className=
           "text-gray-500 text-lg font-semibold hover:text-white cursor-pointer"
      >
        {displayText}
      </div>
  );
};

export default TextWithHover;
