import { cn } from "../utils";

function Button({ children, onClick, disabled, className }) {
  return (
    <button
      className={cn(
        `uppercase transition-all ${
          disabled
            ? "bg-[#46acd0] text-[#00000042] cursor-default"
            : "bg-[#bf8854] hover:bg-[#ff0000] cursor-pointer"
        } text-lg md:text-2xl w-full px-4 py-5 rounded-3xl`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
