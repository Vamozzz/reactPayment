import crossSvg from "../assets/cross.svg";
const Failed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="bg-[#E95400] p-3 h-[200px] w-[200px] flex justify-center items-center rounded-full border-4 border-[#F1F1F1]">
        <img src={crossSvg} alt="logo" height={100} width={100} className="" />
      </div>
      <p>Payment Failed</p>
    </div>
  );
};

export default Failed;
