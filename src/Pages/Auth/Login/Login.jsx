import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaCrown, FaUserGraduate, FaUserShield } from "react-icons/fa";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { UserSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogIn = (data) => {
    UserSignIn(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
      })
      .catch((errror) => {
        console.log(errror);
      });
  };
  // Demo user Email and password
  const DEMO_USERS = {
    student: {
      email: "demouser@gmail.com",
      password: "1234Asdf",
    },
    moderator: {
      email: "moderator@gmail.com",
      password: "1234Asdf",
    },
    admin: {
      email: "abdullahshamim@gmail.com",
      password: "1234Asdf",
    },
  };
  // Demo user login
  const handleDemoLogin = async (role) => {
    const demoUser = DEMO_USERS[role];
    // console.log(demoUser);
    if (!demoUser) return;
    try {
      await UserSignIn(demoUser.email, demoUser.password);
      navigate(location.state || "/");
    } catch (error) {
      console.error("Demo login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center py-4">
            Login your <span className="text-primary">account</span>
          </h2>
          <form
            onSubmit={handleSubmit(handleLogIn)}
            className="fieldset relative"
          >
            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              className="input"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">The email is required</p>
            )}
            {/* Password */}
            <label className="label">Password</label>
            <input
              name="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
              })}
            />
            {/* Error massgae for Password */}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least one uppercase, one lowercase, one
                number.
              </p>
            )}

            <div>
              <Link className="link link-hover cursor-pointer">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral mt-4 ">
              Login
            </button>
            <SocialLogin></SocialLogin>
            <p className="text-md font-semibold text-center">
              Dont’t Have An Account ?{" "}
              <Link
                state={location?.state}
                className="text-primary"
                to="/auth/register"
              >
                Register
              </Link>{" "}
            </p>
            <div className="divider">OR</div>
            {/*  Demo Login Buttons */}
            <div className="text-center mt-6">
              <h2 className="text-lg font-bold text-base-content">
                Try a Demo Account
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Instantly explore different roles without registration
              </p>

              <div className="grid grid-cols-3 gap-4">
                {/* Admin */}
                <button
                  onClick={() => handleDemoLogin("admin")}
                  className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl
      bg-base-200/60 backdrop-blur border border-base-300
      hover:bg-error/10 hover:border-error/40 hover:shadow-lg hover:shadow-error/20
      transition-all duration-300"
                >
                  <FaCrown className="text-2xl text-error opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="text-[11px] font-extrabold tracking-wide uppercase">
                    Admin
                  </span>
                </button>

                {/* Moderator */}
                <button
                  onClick={() => handleDemoLogin("moderator")}
                  className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl
      bg-base-200/60 backdrop-blur border border-base-300
      hover:bg-warning/10 hover:border-warning/40 hover:shadow-lg hover:shadow-warning/20
      transition-all duration-300"
                >
                  <FaUserShield className="text-2xl text-warning opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="text-[11px] font-extrabold tracking-wide uppercase">
                    Moderator
                  </span>
                </button>

                {/* Student */}
                <button
                  onClick={() => handleDemoLogin("student")}
                  className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl
      bg-base-200/60 backdrop-blur border border-base-300
      hover:bg-info/10 hover:border-info/40 hover:shadow-lg hover:shadow-info/20
      transition-all duration-300"
                >
                  <FaUserGraduate className="text-2xl text-info opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="text-[11px] font-extrabold tracking-wide uppercase">
                    Student
                  </span>
                </button>
              </div>

              <p className="mt-5 text-[11px] text-red-500 italic">
                * Demo accounts are for testing and review purposes only
              </p>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default Login;
