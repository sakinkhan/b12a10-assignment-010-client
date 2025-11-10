import React, { use, useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const { createUser, setUser, updateUser, loginWithGoogle, user } =
    use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        `Your Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.`
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
            const errorCode = error.code;
            toast.error(`Oops, following error happened: ${errorCode}`);
            setUser(user);
          });

        toast.success("Your ToyTopia account has been successfully created");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`Oops, following error happened: ${errorCode}`);
      });
  };

  // Register using Google
  const handleRegisterUsingGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Signed in with Google successfully!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google sign-in failed. Please try again.");
      });
    console.log("Google button clicked");
  };

  return (
    <div>
      {user ? (
        <div>
          <p className="font-primary text-5xl text-center font-bold py-50 text-secondary">
            You are already Logged in!
          </p>
          <title>HomeNest - SignUp</title>
        </div>
      ) : (
        <div className="hero bg-base-200 min-h-screen">
          <title>HomeNest - SignUp</title>
          <div className="hero-content flex-col">
            <div className="card bg-blue-50 w-full shrink-0 shadow-2xl py-5 px-5">
              <h1 className="text-3xl font-bold font-primary text-center text-black">
                SignUp now!
              </h1>
              <div className="card-body font-secondary ">
                <form onSubmit={handleRegister}>
                  <fieldset className="fieldset">
                    {/* Name */}
                    <label className="label text-[16px] ">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="input text-[16px]"
                      placeholder="Your Name"
                      required
                    />
                    {/* Email */}
                    <label className="label text-[16px]">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="input text-[16px]"
                      placeholder="Your Email"
                      required
                    />
                    {/* Photo URL */}
                    <label className="label text-[16px]">Photo URL</label>
                    <input
                      name="photo"
                      type="text"
                      className="input text-[16px]"
                      placeholder="Your Photo URL"
                      required
                    />
                    {/* Password */}
                    <label className="label text-[16px]">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input text-[16px] z-0"
                        placeholder="Password"
                        required
                      />
                      <button
                        onClick={handleTogglePassword}
                        className="absolute z-10 right-3 top-3 rounded-full"
                      >
                        {showPassword ? (
                          <IoIosEyeOff size={18} />
                        ) : (
                          <IoMdEye size={18} />
                        )}
                      </button>
                    </div>
                    <div>
                      <label className="label text-[14px]">
                        <input type="checkbox" className="checkbox" required />
                        Accept Terms & Conditions
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-neutral bg-[#108251] mt-4 text-[16px] font-primary hover:bg-green-500 border-0"
                    >
                      SignUp
                    </button>
                    <p className="pt-5 font-semibold text-[16px] font-secondary">
                      Already have an account? Please{" "}
                      <Link
                        to={"/login"}
                        className="text-[#108251] hover:underline"
                      >
                        Login
                      </Link>
                    </p>
                    {/* Google */}
                    <div className=" border-t-2 border-gray-400 pt-5">
                      <button
                        onClick={handleRegisterUsingGoogle}
                        type="button"
                        className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-black hover:text-white"
                      >
                        <svg
                          aria-label="Google logo"
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
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
                        Register using Google
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
