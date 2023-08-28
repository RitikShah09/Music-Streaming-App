import React from 'react'

const PasswordInput = ({ label, placeholder }) => {
  return (
    <div>
      <div className="flex flex-col space-y-2 w-full mt-1">
        <label className="font-semibold">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          className="p-2 border border-gray-400 border-solid rounded placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
