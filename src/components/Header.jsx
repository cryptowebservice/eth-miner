import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

import { useEffect } from "react";

function Header() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount(); //

  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-2 md:py-0">
      {/* <div className="hidden md:block" /> */}
      <img src="/images/logo.png" alt="Logo" className="w-16 md:w-32" />
      <button
        className=" transition-all bg-[#bf8854] hover:bg-[#fdfde5] shadow-lg px-3 md:py-3 py-1 text-lg  md:text-2xl rounded-3xl uppercase"
        onClick={isConnected ? () => open("Account") : () => open("Connect")}
      >
        {isConnected
          ? address.slice(0, 6) + "..." + address.slice(-4)
          : "Connect"}
      </button>
      {/* <w3m-button /> */}
    </header>
  );
}

export default Header;
