import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useSecure from "../../../Hooks/useSecure/useSecure";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    const res = await axios.post(url, formData);
    return res.data.data.url;
  };

  const handleRegistration = async (data) => {
    try {
      setLoading(true);

      // 1. Create Firebase User
      await createUser(data.email, data.password);

      // 2. Upload Image to ImgBB
      const imageURL = await uploadToImgBB(data.photo[0]);

      // 3. Save User Info in Database
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: imageURL,
        role: "student",
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      // 4. Update Firebase Profile
      const profile = {
        displayName: data.name,
        photoURL: imageURL,
      };

      await updateUser(profile);

      console.log("Registration Success:", dbRes.data);

      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center py-4">
            Register your account
          </h2>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}

              {/* Photo */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("photo", { required: false })}
                className="file-input"
              />
              {errors.photo && (
                <p className="text-red-500">Photo is required</p>
              )}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must contain uppercase, lowercase, and number.
                </p>
              )}

              <button className="btn btn-neutral mt-4" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </fieldset>
          </form>

          <SocialLogin />

          <p className="text-md font-semibold text-center my-1.5">
            Have an account?{" "}
            <Link
              state={location?.state}
              className="text-primary"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
