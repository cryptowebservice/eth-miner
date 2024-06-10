function TextBox({ label, value, image }) {
  return (
    <div className="flex items-center justify-between text-lg md:text-2xl uppercase">
      <span>{label}</span>
      {image && <img src={image} alt="" className="w-28" />}
      <span>{value}</span>
    </div>
  );
}

function PreviousGameCard() {
  return (
    <div className="bg-[#398bb8] text-[#16205d] rounded-2xl p-4 md:p-8 space-y-4 md:space-y-4 pb-10">
      <h4 className="uppercase text-xl md:text-2xl text-center py-1">
        Previous Games
      </h4>
      <div className="space-y-4">
        <TextBox label="Game Number" />
        <TextBox label="Player" />
        <TextBox label="Predicted Outcome" value={"Tails"} />
        <TextBox label="Winner" value={"No"} />
        <TextBox label="Game Completed" value={"No"} />
      </div>

      <hr className="h-px my-0 bg-[#46acd0] border-0" />

      <div className="space-y-4">
        <TextBox label="Game Number" />
        <TextBox label="Player" />
        <TextBox label="Predicted Outcome" value={"Tails"} />
        <TextBox label="Winner" value={"No"} />
        <TextBox label="Game Completed" value={"No"} />
      </div>

      <hr className="h-px my-0 bg-[#46acd0] border-0" />

      <div className="space-y-4">
        <TextBox label="Game Number" />
        <TextBox label="Player" />
        <TextBox label="Predicted Outcome" value={"Tails"} />
        <TextBox label="Winner" value={"No"} />
        <TextBox label="Game Completed" value={"No"} />
      </div>
    </div>
  );
}

export default PreviousGameCard;
