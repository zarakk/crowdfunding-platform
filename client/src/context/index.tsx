import React, { createContext, useContext } from "react";
import { useContract } from "@thirdweb-dev/react";
import {
  useAddress,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react/evm";

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
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("contract call sucess", data);
    } catch (error) {
      console.log("failed", error);
    }
  };

  return (
    <StateContext.Provider
      value={{ connect, address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
