import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const initial = {
    name: "",
    email: "",
    phone: "",
  };
  const [input, setInput] = useState(initial);

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/jobvacancy/careers",
        input
      );
      if (data.success) {
        toast.success(data.message);
        setInput(initial)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((previousStates) => {
      return { ...previousStates, [name]: value };
    });
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-black">
        <p>
          CONTACT <span className="text-primary font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center  md:flex-row flex-wrap gap-10 mb-28 text-sm ">
        <img
          className="w-full md:max-w-[360px] border-violet-400 shadow-2xl"
          src={assets.contact_image}
          alt="image"
        />

        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className="font-semibold text-lg text-black">OUR OFFICE</p>
          <p className="text-black">
            Anna Nagar Nammatha Street <br /> chennai-40, Tamilnadu
          </p>
          <p className="text-black">
            Tel: (+91) 7358654328 <br />
            Email: carely2024@gmail.com
          </p>
          <p className="font-semibold text-lg text-black">CAREERS AT CARELY</p>
          <p className="text-black">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-300">
            Coming Soon
          </button>
        </div>

        <div className="border-2 p-5 md:w-[60%] lg:w-[60%] xl:w-[30%] shadow-lg">
          <form onSubmit={handelSubmit}>
            <p className="text-center mb-1 font-medium md:text-2xl">
              ENTER YOUR <span className="text-primary">DETAILS</span>
            </p>
            <div className="w-full mb-3">
              <p>Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={handelChange}
                value={input.name}
                name="name"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="w-full mb-3">
              <p>Email</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                onChange={handelChange}
                value={input.email}
                name="email"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="w-full mb-3">
              <p>Phone Number</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="number"
                onChange={handelChange}
                value={input.phone}
                name="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="w-full mb-3">
              <button
                type="submit"
                className="border w-full mt-2 border-black px-8 py-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
