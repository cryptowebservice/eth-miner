import Button from "./components/Button";
import Header from "./components/Header";
import BakeBeansCard from "./components/BakeBeansCard";
import CoinFlipCard from "./components/CoinFlipCard";
import ReferralCard from "./components/ReferralCard";
import { useState } from "react";
import PreviousGameCard from "./components/PreviousGameCard";
import Footer from "./components/Footer";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Toaster } from "react-hot-toast";

// 1. Get projectId
const projectId = "ad074dda96f51c9950e860601812ffcd";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};
const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://rpc.sepolia.org",
  rpcUrl: "https://1rpc.io/sepolia",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  const [selectedCard, setSelectedCard] = useState("bakedBeans");

  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex ">
        <img
          src="/images/logo.png"
          alt="Banner"
          className="h-[400px] mt-[1160px] hidden md:block"
        />
        <main className="w-full px-4 md:max-w-[38rem] mx-auto mt-8 space-y-8 md:space-y-8">
          <h1 className="text-[#fbf5d7] mx-auto text-xl md:text-[2.2rem] leading-relaxed tracking-wide text-center">
            THE ETH REWARD POOL WITH THE FASTIEST DAILY REWARDS! <br /> Up-to 8%
            VARIABLE RETURNS DAILY
          </h1>
          {/* <Button className="block md:hidden py-3 hover:bg-[#fdfde5] rounded-3xl text-xl">
          Connect
        </Button> */}

          <div className="space-y-4">
            <Button className="py-3 bg-[#398bb8] hover:bg-[#fdfde5]">
              <span className="md:text-3xl">FAQS</span>
            </Button>
            <Button className="py-3 bg-[#398bb8] hover:bg-[#fdfde5]">
              <span className="md:text-3xl">MERCH SHOP</span>
            </Button>
          </div>

          {selectedCard === "bakedBeans" ? <BakeBeansCard /> : <CoinFlipCard />}

          {/* <Button
            className="py-3 bg-[#bf8854] hover:bg-[#fdfde5]"
            onClick={() =>
              setSelectedCard(
                selectedCard === "bakedBeans" ? "bakedBeans" : "bakedBeans"
              )
            }
          >
            <span className="md:text-3xl">
              {selectedCard === "bakedBeans"
                ? "Show Coin Flip"
                : "Show MINED Beans"}
            </span>
          </Button> */}

          {selectedCard === "bakedBeans" ? (
            <ReferralCard />
          ) : (
            <PreviousGameCard />
          )}
        </main>
        <img
          src="/images/logo.png"
          alt="Banner"
          className="h-[400px] hidden md:block"
        />
      </div>

      <div className="pb-10 pt-8">
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
