"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import Web3 from 'web3';
import { Contract, ContractAbi } from 'web3';

interface LoanDetails {
  active: boolean;
  loanAmount: string;
  collateralAmount: string;
  interestRate: number;
  destinationChain: number;
  duration: number;
  paidCollateral: string;
}

// Define a base contract interface that extends the Contract type
type BaseContract = Contract<ContractAbi>;

interface Web3ContextType {
  account: string;
  setAccount: (account: string) => void;
  web3: Web3 | null;
  setWeb3: (web3: Web3 | null) => void;
  DynamicNFTCOntract: BaseContract | null;
  setDynamicNFTCOntract: (contract: BaseContract | null) => void;
  RoyaltyContract: BaseContract | null;
  setRoyaltyContract: (contract: BaseContract | null) => void;
  MonitorContract: BaseContract | null;
  setMonitorContract: (contract: BaseContract | null) => void;
  ReactContract: BaseContract | null;
  setReactContract: (contract: BaseContract | null) => void;
  WNFTContract: BaseContract | null;
  setWNFTContract: (contract: BaseContract | null) => void;
 
}

// Create the context with a default value matching the type
const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [account, setAccount] = useState<string>('');
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [DynamicNFTCOntract, setDynamicNFTCOntract] = useState<BaseContract | null>(null);
  const [RoyaltyContract, setRoyaltyContract] = useState<BaseContract | null>(null);
  const [MonitorContract, setMonitorContract] = useState<BaseContract | null>(null);
  const [ReactContract, setReactContract] = useState<BaseContract | null>(null);
  const [WNFTContract, setWNFTContract] = useState<BaseContract | null>(null);

  

  const value: Web3ContextType = {
    account,
    web3,
    setWeb3,
    setAccount,
    DynamicNFTCOntract,
    setDynamicNFTCOntract,
    RoyaltyContract,
    setRoyaltyContract,
    MonitorContract,
    setMonitorContract,
    ReactContract,
    setReactContract,
    WNFTContract,
    setWNFTContract,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

// Custom hook to use the Web3 context
export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}