import React, { useContext, useRef, useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logInUser, loginWithGoogle } = useContext(AuthContext);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      await logInUser(email, password);
      toast.success("You have successfully signed in");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No user found with this email.";
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format.";
          break;
        default:
          console.error("Login error:", error);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign in
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Signed in with Google successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  // Forget Password
  const emailRef = useRef();
  const handleForgetPassword = () => {
    const emailValue = emailRef.current.value;
    navigate("/forget-password", { state: { email: emailValue } });
  };

  return (
    <div className="min-h-screen bg-green-50 transition-colors duration-300 dark:bg-gray-900 flex items-center justify-center px-10">
      <title>HomeNest - Login</title>

      {user ? (
        <div className="text-center">
          <p className="font-primary text-4xl md:text-5xl font-bold py-10 text-[#108251] dark:text-[#4ade80]">
            You are already Logged in!
          </p>
        </div>
      ) : (
        <div className="card w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl py-8 px-6 transition-colors duration-300">
          <h1 className="text-3xl font-bold font-primary text-center text-[#108251] dark:text-[#4ade80]">
            Login now!
          </h1>

          <form onSubmit={handleLogin} className="mt-6 font-secondary">
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label text-[16px] text-black dark:text-gray-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                className="input input-bordered w-full text-[16px] bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Email"
                required
              />

              {/* Password */}
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

              <div onClick={handleForgetPassword} className="">
                <a className="link link-hover text-[15px] text-[#108251] dark:text-[#4ade80]">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn w-full mt-5 border-0 text-[16px] font-primary transition-all duration-200 ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                } ${
                  document.documentElement.classList.contains("dark")
                    ? "bg-[#4ade80] text-black hover:bg-[#22c55e]"
                    : "bg-[#108251] text-white hover:bg-green-600"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="py-3 text-center font-semibold text-[16px] text-black dark:text-gray-300">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Register
                </Link>
              </p>

              {/* Google */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn w-full flex items-center justify-center gap-2 bg-white text-black border-gray-300 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-100 dark:border-gray-700 dark:hover:bg-[#3a3a3a]"
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
                  Login with Google
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
