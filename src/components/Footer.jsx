function Footer() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex items-center gap-6">
        <a
          href="https://sepolia.etherscan.io/address/0x6C5664fBcd44E19653F6DfDE699027eA4c23b955"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/bscscan.png" alt="" className="w-16" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <img src="/images/tree.png" alt="" className="w-16" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
