import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets/assets";
import { FundCard } from ".";
interface Campaign {
  title: string;
  description: string;
  length?: number;
  owner: string;
  deadline: Date;
  pid: number;
  image: string;
  target: string;
}
interface CampaignProps {
  title: string;
  campaigns: Campaign;
  isLoading: boolean;
}

const DisplayCampaigns: React.FC<CampaignProps> = ({
  title,
  campaigns,
  isLoading,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loading"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
