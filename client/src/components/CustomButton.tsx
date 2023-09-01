import React from "react";

interface CustomButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick: () => void;
  styles: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  btnType,
  title,
  handleClick,
  styles,
}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-white text-[16px] leading-[26px] px-4 rounded-[10px] min-h-[52px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
