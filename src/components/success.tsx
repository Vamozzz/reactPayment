import successIconSvg from "../assets/successicon.svg";
const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="bg-[#34A853] p-3 h-[200px] w-[200px] rounded-full border-4 border-[#F1F1F1] flex justify-center items-center ">
        <img
          src={successIconSvg}
          alt="logo"
          height={100}
          width={100}
          className=""
        />
      </div>
      <p>Payment Success</p>
    </div>
  );
};

export default Success;
