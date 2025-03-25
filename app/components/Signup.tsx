import React, { useState } from "react";

import Link from "next/link";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import validationRegister from "../utils/validationRegister";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRegister } from "../hooks/useRegister";

const Signup = () => {
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  
  const { registerWithEmail } = useRegister();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validationRegister(
      firstName,
      lastName,
      email,
      password,
      terms,
    );

    if (validationErrors) {
      setErrors(validationErrors);
    }
  }

  const customUsername = firstName + " " + lastName;

  return (
    <>
      <h2 className={`${darkMode ? "text-white" : "text-black"} mb-5 text-4xl`}>
        Create an account
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
        <div className="flex items-center justify-between gap-3">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-1/2 rounded-md p-3 outline-none ${
              darkMode ? "bg-[#3c364c]" : "bg-white caret-slate-700 shadow"
            } `}
            type="text"
            placeholder="First name"
            style={{ color: darkMode ? "white" : "black" }}
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-1/2 rounded-md p-3 outline-none ${
              darkMode ? "bg-[#3c364c]" : "bg-white caret-slate-700 shadow"
            } `}
            type="text"
            placeholder="Last name"
            style={{ color: darkMode ? "white" : "black" }}
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-md p-3 outline-none ${
              darkMode ? "bg-[#3c364c]" : "bg-white caret-slate-700 shadow"
            } `}
            type="email"
            placeholder="Email"
            style={{ color: darkMode ? "white" : "black" }}
          />
        </div>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-md p-3 outline-none ${
              darkMode ? "bg-[#3c364c]" : "bg-white caret-slate-700 shadow"
            } `}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            style={{ color: darkMode ? "white" : "black" }}
          />
          <div
            className={`${password == "" && "hidden"} cursor-pointer text-[#4a4063]`}
          >
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
          <p className={`text-sm ${darkMode ? "text-white" : "text-black"}`}>
            I agree to the{" "}
            <Link
              className={`ml-1 underline ${darkMode ? "text-[#9685b6]" : "text-blue-950"}`}
              href="#"
            >
              Terms & Conditions
            </Link>
          </p>
        </div>
        <div>
          <button
            onClick={() => registerWithEmail(customUsername, email, password)}
            className={`w-full py-3 ${
              darkMode ? "bg-violet-500" : "bg-black"
            } mt-5 rounded-md`}
          >
            Create account
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
