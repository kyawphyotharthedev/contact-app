import React from "react";
import Lottie from "lottie-react";
import Animation from "./register.json";
const RegisterAnimation = () => {
  return (
    <div className="min-h-screen flex-wrap flex justify-center items-center">
      <Lottie className=" max-w-[700px]" animationData={Animation} />
    </div>
  );
};

export default RegisterAnimation;
