import React, { useState } from "react";
import { logo, sun } from "../assets/assets";
import { navlinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";

interface IconProps {
  styles?: string;
  name?: string;
  imageUrl: string;
  isActive?: string | undefined;
  disabled?: boolean;
  handleClick?: () => void;
}

interface LinkType {
  name: string;
  imageUrl: string;
  link: string;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imageUrl,
  isActive,
  disabled,
  handleClick,
}) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imageUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imageUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState("dashboard");
  return (
    <div className="hidden md:flex justify-between items-center sticky flex-col top-5 h-93vh">
      <Link to={"/"}>
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imageUrl={logo}
          name={isActive}
          isActive={isActive}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link: LinkType) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setisActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles={`bg-[#1c1c24] shadow-secondary`} imageUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
