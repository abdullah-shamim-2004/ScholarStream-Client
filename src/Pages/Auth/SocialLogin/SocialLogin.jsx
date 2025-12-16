import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxios from "../../../Hooks/useAxios/useAxios";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        return axiosInstance.post("/users", userInfo);
      })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  return (
    <div className="text-center pb-5">
      <div className="divider">OR</div>

      <button
        onClick={handleSignInWithGoogle}
        className="btn w-full bg-white text-black border-[#e5e5e5]"
      >
        {/* Google Icon */}
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
