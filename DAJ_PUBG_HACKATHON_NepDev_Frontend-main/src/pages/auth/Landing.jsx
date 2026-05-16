import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#DBE8F4] to-purple-200 rounded-2xl shadow-lg  h-dvh  md:w-80 flex flex-col justify-between items-center">
        <div className="flex flex-col items-center"> 
          <div className="w-full flex justify-center items-center">
            <img src="/logo.png" alt="Company Logo" className="w-[90%] m-6" /> 
          </div>

          <p className="text-center text-3xl font-semibold text-gray-800 mb-4">
            You're Not Alone. <br /> We Hear You.
          </p>
    
          <div className="mb-6 w-screen flex justify-center ">
            <div >
              <img src="/Landing-banner.png" alt="Illustration of support" className=" rounded-lg" /> 
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-10"> 
          <Button 
            content="Get Started" 
            link="login"/>
            
          <Link to="/vol-login" className="text-gray-800 text-sm mt-4 hover:text-blue-600 transition duration-300">
            Are you a volunteer?
          </Link>
          <p className="text-gray-500 text-xs mt-4">v1.0</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
