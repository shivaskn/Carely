import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [doctImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { adminToken } = useContext(AdminContext);

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!doctImg) {
        return toast.error("Image not select");
      }

      const formData = new FormData();

      formData.append("image", doctImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // to console this formdata use foreach

      // formData.forEach((value,key)=>{
      //   console.log(`${key}:${value}`)
      // })

      const { data } = await axios.post(
        "https://carely-k6jk.onrender.com/api/admin/add-doctor",
        formData,
        { headers: {
          Authorization: `Bearer ${adminToken}` 
        } }
      );

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setAbout('')
        setSpeciality('')
        setDegree('')
        setAddress1('')
        setAddress2('')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={handelSubmit}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="shadow-xl px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-600 ">
          <label htmlFor="doctor-image">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={doctImg ? URL.createObjectURL(doctImg) : assets.upload_area}
              alt="image-upload"
            />
          </label>
          <input
            type="file"
            id="doctor-image"
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/*Leftside section*/}

        <div className="flex flex-col lg:flex-row items-start gap-10  text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10+ Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>
          
          {/*Rightside section*/}
          
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name=""
                id=""
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Urology">Urology</option>
                <option value="Anesthesiology">Anesthesiology</option>
                <option value="sexologist">sexologist</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Hematology">Hematology</option>
                <option value="Dentist">Dentist</option>
                <option value="Ear-nose-throat (ent) ">Ear-nose-throat (ent) </option>
                <option value="Ayurveda">Ayurveda</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about doctor"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-purple-500 transition-all duration-300 "
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
