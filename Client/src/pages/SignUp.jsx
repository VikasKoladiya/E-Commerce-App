import React, { useState } from "react";
import LoginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadPic = async(e) => {
    const file = e.target.files[0];
    
    const imagePic = await imageTobase64(file);
    setData((prev)=>{
      return{
        ...prev,
        profilePic: imagePic
      }
    })
    console.log("imagepic",imagePic)
  }

  const handleSubmit = async(e) => {
      e.preventDefault();

      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signup.url,{
          method: SummaryApi.signup.method,
          credentials: 'include',
          headers:{
            "Content-type": "application/json"
          },
          body:JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json();
        console.log(dataApi);
        if(dataApi?.success){
          toast.success(dataApi.message);
          navigate("/login");
        }

        if(dataApi?.error){
          toast.error(dataApi.message);
        }
      }else{
        toast.error("Please check password credential!!");
      }
  }

  return (
    <section id="login">
    <div className="mx-auto container p-4">
      <div className="bg-white p-4 py-5 w-full max-w-sm mx-auto">
        <div className="w-20 h-20 mx-auto rounded-full relative overflow-hidden">
          <div>
            <img src={data.profilePic || LoginIcons} alt="login icons" />
          </div>
          <form action="">
            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 w-full pb-4 pt-2 cursor-pointer text-center absolute bottom-0">
                Upload Photo
              </div>
              <input type="file" className="hidden" onChange={handleUploadPic}/>
            </label>
          </form>
        </div>  

        <form action="" className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid">
              <label htmlFor="name">Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  placeholder="enter your name"
                  className="w-full h-full border-none bg-transparent"
                />
              </div>
            </div>

          <div className="grid">
            <label htmlFor="email">Email :</label>
            <div className="bg-slate-100 p-2">
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                placeholder="enter email"
                className="w-full h-full border-none bg-transparent"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="password">Password :</label>
            <div className="bg-slate-100 p-2 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                placeholder="enter password"
                className="w-full h-full border-none bg-transparent"
              />
              <div
                className="cursor-pointer text-xl "
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="confirmpassword">Confirm Password :</label>
            <div className="bg-slate-100 p-2 flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                placeholder="enter confirm password"
                className="w-full h-full border-none bg-transparent"
              />
              <div
                className="cursor-pointer text-xl "
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all block mx-auto mt-6">
            Sign Up
          </button>
        </form>

        <p className="my-5">
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="text-red-600 hover:text-red-700 hover:underline"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  </section>
  )
}

export default Signup