import { useEffect, useState } from "react";
import Button from "./Button";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function ReferralCard() {
  const [text, setText] = useState(null);

  const [btnText, setBtxText] = useState("Copy Link");

  const { isConnected, address } = useWeb3ModalAccount();

  function handleCopy() {
    console.log("click");
    navigator.clipboard.writeText(text);
    setBtxText("Copied");

    setTimeout(() => {
      setBtxText("Copy Link");
    }, 1000);
  }

  useEffect(() => {
    if (isConnected) {
      // get current Url
      const url = window.location.href;
      // remove everything after the last /
      const cleanUrl = url.substring(0, url.lastIndexOf("/"));
      // add the address
      setText(`${cleanUrl}/?ref=${address}`);
    }
  }, [address]);

  return (
    <div className="space-y-6">
      <div className="bg-[#bf8854] text-[#16205d] rounded-2xl p-4 flex flex-col items-center gap-5">
        <p className="text-2xl uppercase text-center">Referral Link</p>
        <input
          type="text"
          value={text}
          className="w-full bg-white text-sm border-4 border-black focus:outline-none px-4 py-2 font-roboto"
        />
        <Button
          className="bg-[#398bb8] hover:bg-[#fdfde5] py-2 md:py-3 text-lg md:text-xl"
          onClick={handleCopy}
        >
          {btnText}
        </Button>

        <div className="text-center w-[90%]">
          <span className="font-roboto text-center">
            Invite your friends using your link and earn ~10% of any etherium they
            MINE and 1% of Re-MINES. Referral Rewards are additional and are not
            deducted from your friends' etherium.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReferralCard;
