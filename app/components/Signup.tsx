import React, { useState } from "react";

import Link from "next/link";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import validationRegister from "../utils/validationRegister";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Signin = () => {
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validationRegister(
      firstName,
      lastName,
      email,
      password,
      terms
    );

    setErrors(validationErrors);
  }

  return (
    <>
      <h2 className={`${darkMode == "dark" ? "text-white" : "text-black"} text-4xl mb-5`}>Create an account</h2>
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
        <div className="flex gap-3 items-center justify-between">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`
              p-3 w-1/2 rounded-md outline-none ${
                darkMode == "dark" ? "bg-[#3c364c]" : "bg-white shadow caret-slate-700"
              } 
            `}
            type="text"
            placeholder="First name"
            style={{color: darkMode == "dark" ? "white" : "black"}}
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`
              p-3 w-1/2 rounded-md outline-none ${
                darkMode == "dark" ? "bg-[#3c364c]" : "bg-white shadow caret-slate-700"
              } 
            `}
            type="text"
            placeholder="Last name"
            style={{color: darkMode == "dark" ? "white" : "black"}}
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              p-3 w-full rounded-md outline-none ${
                darkMode == "dark" ? "bg-[#3c364c]" : "bg-white shadow caret-slate-700"
              } 
            `}
            type="email"
            placeholder="Email"
            style={{color: darkMode == "dark" ? "white" : "black"}}
          />
        </div>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`
              p-3 w-full rounded-md outline-none ${
                darkMode == "dark" ? "bg-[#3c364c]" : "bg-white shadow caret-slate-700"
              } 
            `}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            style={{color: darkMode == "dark" ? "white" : "black"}}
          />
          <div className={`${password == "" && "hidden"} cursor-pointer text-[#4a4063]`}>
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
        </div>
        <div className="flex gap-3">
          <input
            className="custom-dark-blue-checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            type="checkbox"
          />
          <p className={`text-sm ${darkMode == "dark" ? "text-white" : "text-black"}`}>
            I agree to the{" "}
            <Link className={`underline ml-1 ${darkMode == "dark" ? "text-[#9685b6]" : "text-blue-950"}`} href="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
        <div>
          <button
            className={`w-full py-3 ${
              darkMode == "dark" ? "bg-violet-500" : "bg-black"
            } rounded-md mt-5`}
          >
            Create account
          </button>
        </div>
      </form>
    </>
  );
};

export default Signin;
