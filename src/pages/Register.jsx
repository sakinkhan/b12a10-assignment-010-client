import React, { useContext, useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUser, loginWithGoogle, user } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        `Password must be at least 6 characters long and include one uppercase and one lowercase letter.`
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            toast.error(`Error updating user: ${error.code}`);
            setUser(user);
          });

        toast.success("Your HomeNest account has been created successfully!");
      })
      .catch((error) => {
        toast.error(`Error: ${error.code}`);
      });
  };

  const handleRegisterUsingGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Signed in with Google successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch(() => toast.error("Google sign-in failed. Please try again."));
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-[#0b0b0b] transition-colors duration-300 flex items-center justify-center px-10">
      <title>HomeNest - Sign Up</title>

      {user ? (
        <div className="text-center">
          <p className="font-primary text-4xl md:text-5xl font-bold py-10 text-[#108251] dark:text-[#4ade80]">
            You are already Logged in!
          </p>
        </div>
      ) : (
        <div className="card w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl py-8 px-6 transition-colors duration-300">
          <h1 className="text-3xl font-bold font-primary text-center text-[#108251] dark:text-[#4ade80]">
            Sign Up Now!
          </h1>

          <form
            onSubmit={handleRegister}
            className="mt-6 font-secondary space-y-4"
          >
            {/* Name */}
            <div>
              <label className="label text-[16px] text-black dark:text-gray-200">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full text-[16px] bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label text-[16px] text-black dark:text-gray-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full text-[16px] bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label text-[16px] text-black dark:text-gray-200">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                className="input input-bordered w-full text-[16px] bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Your Photo URL"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label text-[16px] text-black dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full text-[16px] bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Password"
                  required
                />
                <button
                  onClick={handleTogglePassword}
                  type="button"
                  className="absolute z-10 right-3 top-3 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? (
                    <IoIosEyeOff size={18} />
                  ) : (
                    <IoMdEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-success dark:border-gray-500"
                required
              />
              <label className="text-[14px] text-[#108251] dark:text-[#4ade80]">
                Accept Terms & Conditions
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn w-full border-0 mt-4 text-[16px] font-primary bg-[#108251] hover:bg-green-600 text-white dark:bg-[#4ade80] dark:text-black dark:hover:bg-[#22c55e] transition-all duration-200 hover:scale-[1.02]"
            >
              Sign Up
            </button>

            <p className="pt-3 font-semibold text-[16px] text-black dark:text-gray-300 text-center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Google SignUp */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-5">
              <button
                onClick={handleRegisterUsingGoogle}
                type="button"
                className="btn w-full flex items-center justify-center gap-2 bg-white text-black border-gray-300 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 dark:border-gray-700 dark:hover:bg-[#3a3a3a] transition-all duration-200"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="none"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
