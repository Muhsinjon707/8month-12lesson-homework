"use client";

import React, { useState } from "react";

import Link from "next/link";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import validationLogin from "../utils/validationLogin";

const Signup = () => {
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRemember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validationLogin(email, password);

    setErrors(validationErrors);
  }

  return (
    <>
      <h2 className="text-white text-3xl mb-5">Login First to Your Account</h2>
      {errors.length > 0 && (
        <div className="text-red-500 text-sm">
          {errors.map((err, index) => (
            <p key={index}>• {err}</p>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full h-1/2 flex flex-col gap-4"
      >
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full rounded-md outline-none bg-[#3c364c]"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-full rounded-md outline-none bg-[#3c364c]"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
          />
          <div className="cursor-pointer text-[#4a4063]">
            {show ? (
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <input
              checked={doRemember}
              onChange={(e) => setRemember(e.target.checked)}
              className=""
              type="checkbox"
            />
            <p className="text-sm">Remember me</p>
          </div>
          <Link href="/" className="text-green-300 underline">
            Forgot Password
          </Link>
        </div>
        <div>
          <Link href="/register" className="text-violet-800 underline">Register here</Link>
        </div>
        <div>
          <button className="w-full py-3 bg-violet-500 rounded-md mt-5">
            Login
          </button>
        </div>
        <div>
          <p
            className="relative text-gray-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-32 before:h-px before:bg-gray-500 
                after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-32 after:h-px after:bg-gray-500 text-center font-light text-xs opacity-30"
          >
            Or register with
          </p>
        </div>
        <div className="flex justify-between items-center gap-3">
          <button className="cursor-pointer w-1/2 py-2 rounded-md opacity-70 border border-white inline-flex justify-center items-center gap-2">
            <FcGoogle className="scale-125" /> Google
          </button>
          <button className="cursor-pointer w-1/2 py-2 rounded-md opacity-70 border border-white inline-flex justify-center items-center gap-2">
            <FaGithub className="scale-125" /> GitHub
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
