"use client";

import React, { useState } from "react";

import Link from "next/link";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import validationLogin from "../utils/validationLogin";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Register & Login hooks
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";

// toaster
import { toast } from "react-toastify";

const Signin = () => {
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRemember, setRemember] = useState(false);

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validationLogin(email, password);

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
  }

  return (
    <>
      <h2 className={`${darkMode ? "text-white" : "text-black"} mb-5 text-3xl`}>
        Login First to Your Account
      </h2>
      {errors.length > 0 && (
        <div className="text-sm text-red-500">
          {errors.map((err, index) => (
            <p key={index}>• {err}</p>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex h-1/2 w-full flex-col gap-4"
      >
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-md border-black p-3 shadow-md outline-none ${
              darkMode
                ? "caret-black-500 bg-[#3c364c]"
                : "bg-white caret-blue-600"
            }`}
            type="email"
            placeholder="Email"
            style={{ color: darkMode ? "white" : "black" }}
          />
        </div>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-md border-black p-3 shadow-md outline-none ${
              darkMode ? "bg-[#3c364c] caret-black" : "bg-white caret-blue-600"
            }`}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            style={{ color: darkMode ? "white" : "black" }}
          />
          {password && (
            <div className="cursor-pointer text-[#4a4063]">
              {!show ? (
                <FaRegEyeSlash
                  onClick={() => setShow(!show)}
                  className="absolute top-1/2 right-1 -translate-1/2"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShow(!show)}
                  className="absolute top-1/2 right-1 -translate-1/2"
                />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <input
              checked={doRemember}
              onChange={(e) => setRemember(e.target.checked)}
              className="login-custom-checkbox"
              type="checkbox"
            />
            <p className={`${darkMode ? "text-white" : "text-black"} text-sm`}>
              Remember me
            </p>
          </div>
          <Link
            href="/"
            className={`${
              darkMode ? "text-green-300" : "text-blue-300"
            } underline`}
          >
            Forgot Password
          </Link>
        </div>
        <div>
          <Link
            href="/register"
            className={`${
              darkMode ? "text-violet-800" : "text-blue-500"
            } underline`}
          >
            Register here
          </Link>
        </div>
        <div>
          <button
            onClick={() => loginWithEmail(email, password)}
            className={`w-full py-3 ${
              darkMode ? "bg-violet-500" : "bg-blue-500"
            } mt-5 rounded-md`}
          >
            Login
          </button>
        </div>
        <div>
          <p className="relative text-center text-xs font-light text-gray-500 opacity-30 before:absolute before:top-1/2 before:left-0 before:h-px before:w-32 before:bg-gray-500 before:content-[''] after:absolute after:top-1/2 after:right-0 after:h-px after:w-32 after:bg-gray-500 after:content-['']">
            Or register with
          </p>
        </div>
        <div
          className={`flex items-center justify-between gap-3 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <button
            onClick={registerWithGoogle}
            className={`inline-flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border py-2 opacity-70 ${darkMode ? "border-white" : "border-black"} `}
          >
            <FcGoogle id="google-login-btn" className="scale-125" /> Google
          </button>
          <button
            className={`inline-flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border py-2 opacity-70 ${darkMode ? "border-white" : "border-black"} `}
          >
            <FaGithub className="scale-125" /> GitHub
          </button>
        </div>
      </form>
    </>
  );
};

export default Signin;
