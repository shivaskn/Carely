import React from "react";
import { assets, specialityData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SpecialityMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* up */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
         whileInView={{y: 0, opacity: 1}}
        // animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          y: { type: "spring", stiffness: 60 },
          opacity: { duration: 1 },
          ease: "easeIn",
          duration: 1,
        }}
        className="flex flex-col  items-center gap-4 py-10 md:py-16 text-gray-800"
        id="speciality"
      >
        {" "}
        {/* Inside this div i have stored two elements which is hi and p tag and i have styled using tailwind. this speciality menu (categories) In this user can select the categories*/}
        <h1 className="text-3xl font-medium">Find by Speciality</h1>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        {/* So in this div i have used map method to access object from assets and used link tag. if user clicks on the any speciality image that user should me able to go that page * This is child div */}
        <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
          {specialityData.map((item, index) => (
            <Link
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              key={index}
              to={`doctors/${item.speciality}`}
            >
              <img
                className="w-16 sm:w-28  mb-2"
                src={item.image}
                alt="image"
              />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/doctors"), scroll(0, 0);
          }}
          className="bg-violet-700 text-white px-12 py-3 rounded-full mt-5 hover:scale-105 transition-all duration-300"
        >
          More
        </button>
      </motion.div>

      {/* down */}
    </div>
  );
};

export default SpecialityMenu;
