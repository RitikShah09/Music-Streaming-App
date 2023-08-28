import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active , targetLink, onClick}) => {
  return (
    <Link to={targetLink} className="block">
      <div
        className="flex items-center justify-start px-5 py-2 cursor-pointer"
        onClick={onClick}
      >
        <div>
          <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={27}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400"
          } text-sm font-semibold ml-5 hover:text-white`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
