import React from "react";
import Button from "../components/NotFoundButton";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full text-center min-h-97 ">
      <div className="p-[7%] sm:p-[6%] md:p-[6%] lg:p-[7%] flex flex-col  items-center justify-center">
      <p className="text-xl sm:text-[20px] md:text-5xl lg:text-6xl">Page Not Found</p> <br/>   <Link to='/'><Button/></Link>
      </div>
    </div>
  );
};

export default PageNotFound;
