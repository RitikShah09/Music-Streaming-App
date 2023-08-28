import React from 'react'

const TextInput = ({label, placeholder, value, setValue,labelClassName }) => {
  return (
    <div className="flex flex-col space-y-2 w-full mt-1">
      <label className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border border-gray-400 border-solid rounded placeholder-gray-500"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
