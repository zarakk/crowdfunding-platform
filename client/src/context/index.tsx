import React, { createContext, useContext } from "react";
import { useContract } from "@thirdweb-dev/react";
import {
  useAddress,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react/evm";
import { ethers } from "ethers";

interface StateContextType {
  address: string | undefined;
  contract: any;
  createCampaign: (form: any) => void;
  connect: (connectOptions?: { chainId?: number }) => Promise<any>;
}

interface FormType {
  address: string;
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
});

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(
    "0xC64b2C93ADe0AEC4AC218ef56659789a245e29e9"
  );
  const { mutateAsync: createCampaign }: any = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
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

      console.log("contract call sucess", data);
    } catch (error) {
      console.log("failed", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
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
    console.log(parsedCampaigns);
  };

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
