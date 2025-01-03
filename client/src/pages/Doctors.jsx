import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {motion} from 'framer-motion'

const Doctors = () => {
  const { speciality } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const [filterDoctor, setfilterDoctor] = useState([]);
  const navigate = useNavigate();
  

  const applyFilters = () => {
    if (speciality) {
      setfilterDoctor(
        doctors.filter((doctor) => doctor.speciality === speciality)
      );
    } else {
      setfilterDoctor(doctors);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [doctors, speciality]);

  return (
    <motion.div
    initial={{ y: -100, opacity: 0 }}
    whileInView={{y: 0, opacity: 1}}
  //  animate={{ y: 0, opacity: 1 }}
   transition={{
     delay: 0.2,
     y: { type: "spring", stiffness: 60 },
     opacity: { duration: 1 },
     ease: "easeIn",
     duration: 1,
   }}
    className="md:mx-6 mt-6">
      <p className="  text-black font-medium">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border border-black rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((previousState) => !previousState)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600  ${
            showFilter ? "flex " : "hidden sm:flex"
          }`}
        >
          {/*Ithu ethuku na epa oru user vanthu side  categories la click panna mothu navigate panna.*/}
          {/*Inga vanthu rendu place la ternary opertors use panni iruka onnu anthu p tag and class property*/}
          <p
            onClick={() =>
              speciality === "All Doctors"
                ? navigate("/doctors")
                : navigate("/doctors")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "All Doctors"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            All Doctors
          </p>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer  ${
              speciality === "Gynecologist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer  ${
              speciality === "Dermatologist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer  ${
              speciality === "Pediatricians"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Pediatrician
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer  ${
              speciality === "Neurologist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer  ${
              speciality === "Gastroenterologist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Gastroenterologist
          </p>

          <p
            onClick={() =>
              speciality === "Psychiatry"
                ? navigate("/doctors")
                : navigate("/doctors/Psychiatry")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Psychiatry"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Psychiatry
          </p>

          <p
            onClick={() =>
              speciality === "Urology"
                ? navigate("/doctors")
                : navigate("/doctors/Urology")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Urology"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Urology
          </p>

          <p
            onClick={() =>
              speciality === "Anesthesiology"
                ? navigate("/doctors")
                : navigate("/doctors/Anesthesiology")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Anesthesiology"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Anesthesiology
          </p>

          <p
            onClick={() =>
              speciality === "sexologist"
                ? navigate("/doctors")
                : navigate("/doctors/sexologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "sexologist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            sexologist
          </p>

          <p
            onClick={() =>
              speciality === "Orthopedics"
                ? navigate("/doctors")
                : navigate("/doctors/Orthopedics")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Orthopedics"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Orthopedics
          </p>

          <p
            onClick={() =>
              speciality === "Cardiology"
                ? navigate("/doctors")
                : navigate("/doctors/Cardiology")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Cardiology"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Cardiology
          </p>

          <p
            onClick={() =>
              speciality === "Hematology"
                ? navigate("/doctors")
                : navigate("/doctors/Hematology")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Hematology"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Hematology
          </p>

          <p
            onClick={() =>
              speciality === "Dentist"
                ? navigate("/doctors")
                : navigate("/doctors/Dentist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Dentist"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Dentist
          </p>

          <p
            onClick={() =>
              speciality === "Ear-nose-throat (ent)"
                ? navigate("/doctors")
                : navigate("/doctors/Ear-nose-throat (ent)")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Ear-nose-throat (ent)"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Ear-nose-throat (ent)
          </p>

          <p
            onClick={() =>
              speciality === "Ayurveda"
                ? navigate("/doctors")
                : navigate("/doctors/Ayurveda")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 md:hover:scale-105 border text-black border-primary rounded transition-all cursor-pointer ${
              speciality === "Ayurveda"
                ? "bg-primary text-white transition-all duration-300"
                : " "
            }`}
          >
            Ayurveda
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-5 gap-y-6">
          {filterDoctor.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border  border-violet-400 shadow-xl  rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-violet-300" src={item.image} alt="image" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? " text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? " bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
