import React, { useContext, useState } from "react";
import LoginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const {name,value} = e.target
    console.log(e.target);
    setData((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include', // Fix the typo here
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!dataResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const dataApi = await dataResponse.json();
      console.log(dataApi);
      
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <img src={LoginIcons} alt="login icons" />
          </div>

          <form action="" className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
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
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all block mx-auto mt-6">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
