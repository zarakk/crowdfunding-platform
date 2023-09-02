import React, { createContext, useContext } from "react";
import { useContract } from "@thirdweb-dev/react";
import {
  useAddress,
  useMetamask,
  useContractWrite,
  useLogout,
} from "@thirdweb-dev/react/evm";

import { ethers } from "ethers";

interface StateContextType {
  address: any;
  contract: any;
  createCampaign: (form: any) => void;
  connect: (connectOptions?: { chainId?: number }) => Promise<any>;
  getUserCampaigns: any;
  getCampaigns: any;
  donate: any;
  getDonations: any;
}

interface FormType {
  address: any;
  title: string;
  description: string;
  target: number;
  deadline: string;
  image: string;
}
interface Props {
  children: React.ReactNode;
}
const StateContext = createContext<StateContextType>({
  address: undefined,
  contract: undefined,
  createCampaign: () => {},
  connect: async () => Promise.resolve(undefined),
  getCampaigns: async () => Promise.resolve(undefined),
  getUserCampaigns: async () => Promise.resolve(undefined),
  donate: async () => Promise.resolve(undefined),
  getDonations: async () => Promise.resolve(undefined),
});

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(
    "0xC64b2C93ADe0AEC4AC218ef56659789a245e29e9"
  );
  const { mutateAsync: createCampaign }: any = useContractWrite(
    contract,
    "createCampaign"
  );

  const address: any = useAddress();
  const connect = useMetamask();
  const publishCampaign = async (form: FormType) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("failed", error);
    }
  };

  const getCampaigns = async () => {
    if (contract) {
      const campaigns = await contract.call("getCampaigns");

      const parsedCampaigns = campaigns.map((campaign: any, i: any) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pid: i,
      }));
      return parsedCampaigns;
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign: any) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (_id: number, amount: string) => {
    if (contract) {
      const data = await contract.call("donateToCampaign", [_id], {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    }
  };

  const getDonations = async (pId: any) => {
    if (contract) {
      const donations = await contract.call("getDonators", pId);

      const numberOfDonations = donations[0].length;
      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }
      return parsedDonations;
    }
  };

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
