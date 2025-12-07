import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogIn = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location.state || "/");
      })
      .catch((errror) => {
        console.log(errror);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center py-4">
            Login your account
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

            <p className="text-md font-semibold text-center my-1.5">
              Dont’t Have An Account ?{" "}
              <Link
                state={location?.state}
                className="text-primary"
                to="/auth/register"
              >
                Register
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default Login;
