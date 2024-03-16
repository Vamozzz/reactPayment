import React, { CSSProperties, ChangeEvent, FC, useState } from "react";

interface inputType {
  label?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  htmlFor?: string;
  placeholder?: string;
  innerHtml?: string;
  inputType?:string;
  customStyle?:CSSProperties;
}

const CustomInput: FC<inputType> = ({
  label,
  value,
  onChange,
  error,
  htmlFor,
  placeholder,
  innerHtml,
  inputType,
  customStyle,
}) => {
  const [isFocused,setFocused] = useState(false)
  return (
    <div className={`flex  gap-4 justify-center items-center pl-10 border-2 px-3 overflow-hidden  gap-2 rounded-[5px] w-full ${isFocused ? "bg-[#F1F2F5]" :""} `} onFocus={()=> setFocused(!isFocused)} style={customStyle}>
      <label htmlFor={htmlFor} className="text-[32px] font-light">
        {label}
      </label>
      <input
        value={value}
        type={inputType}
        name={htmlFor}
        id={htmlFor}
        onChange={onChange}
        placeholder={placeholder}
        className={`${isFocused ? "bg-[#F1F2F5]" :""} outline-none rounded-[5px] max-w-[220px]  ${ 
          error ? " border  border-[#EE4B2B]" : " "
        } `}
        style={customStyle}
      />
      {error && (
        <label htmlFor={htmlFor} className="text-[#EE4B2B]">
          {error}
        </label>
      )}
      {innerHtml && (
        <label
          dangerouslySetInnerHTML={{ __html: innerHtml }}
          htmlFor={htmlFor}
          className="text-[#EE4B2B]"
        ></label>
      )}
    </div>
  );
};

export default CustomInput;
