import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import useContract from "../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatUnits, parseUnits } from "ethers";
import { parse } from "postcss";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#ffffff",
};

function TextBox({ label, value }) {
  return (
    <div className="flex items-center justify-between text-lg md:text-2xl uppercase">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BakedBeansCard() {
  const [amount, setAmount] = useState(0);
  const [clear, setClear] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [beanBalances, setBeanBalances] = useState(0);
  const [contractBalances, setContractBalances] = useState(0);
  const [miner, setMiner] = useState(0);
  const [beansLastHatched, setBeansLastHatched] = useState(0);
  const [reward, setReward] = useState(0);
  let [color, setColor] = useState("#ffffff");
  const [isMining, setIsMining] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [isHatching, setIsHatching] = useState(false);
  const [myRef, setMyRef] = useState(null);

  const { isConnected, address } = useWeb3ModalAccount();
  const {
    calculateEggBuy,
    beanBalance,
    miners,
    contractBalance,
    userBalance,
    mine,
    sellEggs,
    hatchEggs,
    getEggsSinceLastHatch,
    calculateEggSell,
  } = useContract();

  useEffect(() => {
    const getBalanceData = async () => {
      userBalance().then((data) => {
        setEthBalance(data);
      });
      beanBalance().then((data) => {
        setBeanBalances(data);
      });
      contractBalance().then((data) => {
        setContractBalances(data);
      });
      userBalance().then((data) => {
        setEthBalance(data);
      });

      miners().then((data) => {
        setMiner(data);
      });

      getEggsSinceLastHatch().then((data) => {
        setBeansLastHatched(data);
        calculateEggSell(data).then((data) => {
          console.log(data);
          setReward(data);
        });
      });
    };
    if (isConnected) getBalanceData();
  }, [isConnected, address]);

  useEffect(() => {
    if (isConnected && amount > 0) {
      calculateEggBuy(amount, contractBalances).then((data) => {
        console.log(data);
        setReceiveAmount(data);
      });
    }
  }, [amount, isConnected]);

  useEffect(() => {
    // get ref from url
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) {
      console.log(ref);
      setMyRef(ref);
    }
  }, []);

  function handleChange(e) {
    const { value } = e.target;
    if (value) setClear(false);
    setAmount(value);
  }

  function handleClear() {
    setAmount("");
    setClear((state) => !state);
  }

  const handleMine = async () => {
    try {
      setIsMining(true);
      await mine(amount, myRef);
      setIsMining(false);
      toast.success("Successfully mined ETH");
      window.location.reload();
    } catch (error) {
      setIsMining(false);
      toast.error("Failed to mine ETH");
      console.error(error);
    }
  };

  const sellEgg = async () => {
    try {
      setIsSelling(true);
      await sellEggs();
      toast.success("Successfully ate ETH");
      setIsSelling(false);
      window.location.reload();
    } catch (error) {
      setIsSelling(false);
      toast.error("Failed to eat ETH");
      console.error(error);
    }
  };

  const hatchEgg = async () => {
    try {
      setIsHatching(true);
      await hatchEggs(myRef);
      toast.success("Successfully hatched ETH");
      setIsHatching(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.reason || "Failed to hatch ETH");
      setIsHatching(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-[#398bb8] text-[#16205d] rounded-2xl p-4 md:p-8 space-y-6 md:space-y-8 pb-10">
      <TextBox label="Contract" value={`${contractBalances} ETH`} />
      <TextBox label="Wallet" value={`${Number(ethBalance).toFixed(3)} ETH`} />
      <TextBox label="Your ETH" value={`${beanBalances} ETH`} />

      <div className="bg-white border-4 border-black flex items-center justify-between">
        <input
          type="number"
          value={amount}
          onChange={handleChange}
          className="w-full bg-transparent text-xl md:text-2xl focus:outline-none px-4 py-3 md:py-4 text-right"
        />
        <div className="flex items-center text-xl md:text-2xl gap-8 pr-6">
          <IoClose
            size={26}
            color="#3c66aa"
            className={`-ml-3 ${clear ? "hidden" : "block"}`}
            onClick={handleClear}
          />
          <span>ETH</span>
        </div>
      </div>

      <div className="flex items-center justify-center md:justify-between gap-2 md:gap-0 px-6">
        <button
          className="transition-all bg-[#bf8854] hover:bg-[#fdfde5] p-2 md:p-3 rounded-3xl text-lg md:text-2xl shadow-lg"
          onClick={() => setAmount(ethBalance * 0.25)}
        >
          25%
        </button>
        <button
          className="transition-all bg-[#bf8854] hover:bg-[#fdfde5] p-2 md:p-3 rounded-3xl text-lg md:text-2xl shadow-lg"
          onClick={() => setAmount(ethBalance * 0.5)}
        >
          50%
        </button>
        <button
          className="transition-all bg-[#bf8854] hover:bg-[#fdfde5] p-2 md:p-3 rounded-3xl text-lg md:text-2xl shadow-lg"
          onClick={() => setAmount(ethBalance * 0.75)}
        >
          75%
        </button>
        <button
          className="transition-all bg-[#bf8854] hover:bg-[#fdfde5] p-2 md:p-3 rounded-3xl text-lg md:text-2xl shadow-lg"
          onClick={() => setAmount(ethBalance)}
        >
          100%
        </button>
        <button
          className="transition-all bg-[#bf8854] hover:bg-[#fdfde5] p-2 md:p-3 rounded-3xl text-lg md:text-2xl shadow-lg"
          onClick={() => setAmount(ethBalance)}
        >
          MAX
        </button>
      </div>

      {Boolean(amount) && (
        <p className="uppercase text-xl md:text-2xl text-center">
          YOU GET {receiveAmount} ETH
        </p>
      )}

      <Button
        className="py-3 md:py-4"
        onClick={isMining ? () => {} : handleMine}
      >
        {isMining ? (
          <ClipLoader
            color={color}
            loading={isMining}
            cssOverride={override}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "MINE ETH"
        )}
      </Button>

      <div className="space-y-2">
        <TextBox label="RE-MINE" value={"YOUR REWARDS"} />
        <TextBox
          label={`${beansLastHatched} ETH`}
          value={`${Number(reward).toFixed(10)} ETH`}
        />
      </div>

      <div className="flex justify-between gap-12">
        <Button className="py-3" onClick={isHatching ? () => {} : hatchEgg}>
          {isHatching ? (
            <ClipLoader
              color={color}
              loading={isHatching}
              cssOverride={override}
              size={35}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "HATCH ETH"
          )}
        </Button>
        <Button className="py-3" onClick={isSelling ? () => {} : sellEgg}>
          {isSelling ? (
            <ClipLoader
              color={color}
              loading={isSelling}
              cssOverride={override}
              size={35}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "SELL ETH"
          )}
        </Button>
      </div>
    </div>
  );
}

export default BakedBeansCard;
