import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

import { ETH_MINER_ADDRESS, ETH_MINER_ABI } from "../contracts/contracts";

function useContract() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const getProvider = () => {
    return new BrowserProvider(walletProvider);
  };
  const getSigner = async (provider) => {
    return provider.getSigner();
  };

  const getContract = async (address, abi, signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
  };

  const totalDeposits = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );

    try {
      const deposits = await contract.totalDeposits();
      return formatUnits(deposits, "ether");
    } catch (error) {
      console.error(error);
    }
  };

  const contractBalance = async () => {
    const provider = getProvider();

    // get balance of a address
    const balance = await provider.getBalance(ETH_MINER_ADDRESS);

    return formatUnits(balance, "ether");
  };

  const userBalance = async () => {
    const provider = getProvider();

    // get balance of a address
    const balance = await provider.getBalance(address);

    return formatUnits(balance, "ether");
  };

  const beanBalance = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );
    // console.log(address);
    const balance = await contract.getMyEggs(address);
    return Number(balance);
  };
  const getEggsSinceLastHatch = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );
    // console.log(address);
    const balance = await contract.getEggsSinceLastHatch(address);
    return Number(balance);
  };

  const calculateEggBuy = async (amount, contractBalance) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );

    const balance_wei = parseUnits(contractBalance.toString(), "ether");
    const amount_wei = parseUnits(amount, "ether");

    try {
      const eggs = await contract.calculateEggBuy(amount_wei, balance_wei);
      return Number(eggs);
    } catch (error) {
      console.error(error);
    }
  };

  const mine = async (amount, ref) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );
    if (!ref) ref = address;

    try {
      const mined = await contract.buyEggs(ref, {
        value: parseUnits(amount, "ether"),
      });
      return mined;
    } catch (error) {
      console.error(error);
    }
  };

  const sellEggs = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );

    try {
      const sold = await contract.sellEggs();
      return sold;
    } catch (error) {
      console.error(error);
    }
  };

  const hatchEggs = async (ref) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );
    if (!ref) ref = address;

    const hatched = await contract.hatchEggs(ref);
    return hatched;
  };

  const miners = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );

    try {
      const miners = await contract.getMyMiners(address);
      return Number(miners);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateEggSell = async (eggs) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      ETH_MINER_ADDRESS,
      ETH_MINER_ABI,
      signer
    );

    try {
      const eth = await contract.calculateEggSell(eggs);
      return formatUnits(eth, "ether");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    totalDeposits,
    mine,
    calculateEggBuy,
    userBalance,
    contractBalance,
    miners,
    beanBalance,
    sellEggs,
    hatchEggs,
    getEggsSinceLastHatch,
    calculateEggSell,
  };
}

export default useContract;
