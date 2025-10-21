import SignupInput from "@/components/login/SignupInput";
import React from "react";

function SignupPage(props) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-dvh bg-gray-900">
        <div className="flex  mb-4 mr-80">
          <img
            src="https://framerusercontent.com/images/U2I7fLtX2zVVMKW9URIZ9olX0.svg"
            alt="Secuby Logo"
            className="logo h-10!  flex items-center mb-0! object-cover px-2!"
          />
          <h2 className="flex text-white text-2xl items-center font-medium ">
            Redzone
          </h2>
        </div>
        <SignupInput />
      </div>
    </div>
  );
}

export default SignupPage;
