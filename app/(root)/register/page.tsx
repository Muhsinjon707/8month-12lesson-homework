import Signup from "@/app/components/Signup";
import Image from "next/image";

const Register = () => {
  return (
    <div className="bg-[#5c566d] w-full h-screen font-mono-sans flex justify-center items-center">
      <div
        className="
        w-[1000px] h-[650px] absolute top-1/2 left-1/2 -translate-1/2 bg-[#2c2638] overflow-y-hidden 
        flex justify-between gap-8 p-4 rounded-2xl items-center
      "
      >
        <div>
          <Image
            className="w-[500px] h-[620px] rounded-2xl"
            src="/black-texture-medium.jpg"
            alt="Black Texture"
            width={500}
            height={80}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-center items-start text-white px-10">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Register;
