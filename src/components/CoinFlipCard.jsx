import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "./Button";

function TextBox({ label, value, image }) {
  return (
    <div className="flex items-center justify-between text-lg md:text-2xl uppercase">
      <span>{label}</span>
      {image && <img src={image} alt="" className="w-28" />}
      <span>{value}</span>
    </div>
  );
}

function CoinFlipCard() {
  const [amount, setAmount] = useState(0);
  const [clear, setClear] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    if (value) setClear(false);
    setAmount(value);
  }

  function handleClear() {
    setAmount("");
    setClear((state) => !state);
  }

  return (
    <div className="bg-[#398bb8] text-[#16205d] rounded-2xl p-4 md:p-8 space-y-6 md:space-y-8 pb-10">
      <div className="space-y-4">
        <TextBox label="Max Wager" value={"0 ETH"} />
        <TextBox label="Win Chance" value={"50%"} />
        <TextBox label="Payout" value={"1.95x"} image="/images/logo.png" />
      </div>

      <div className="flex justify-between gap-12">
        <Button className="py-3 bg-[#fdfde5] hover:bg-[#bf8854]">Heads</Button>
        <Button className="py-3 bg-[#bf8854] hover:bg-[#fdfde5]">Tails</Button>
      </div>

      <p className="uppercase text-xl md:text-2xl text-center py-1">
        PLACE YOUR BET HEADS OR TAILS
      </p>

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

      <Button disabled className="py-3 md:py-4">
        Flip Coin
      </Button>

      <hr className="h-px my-8 bg-[#46acd0] border-0" />

      <TextBox label="Your Winnings" value={"0 ETH"} />
      <Button disabled className="py-3 md:py-4">
        Claim Winnings
      </Button>
    </div>
  );
}

export default CoinFlipCard;
