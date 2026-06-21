import React, { useContext, useState } from "react";
import logo from "../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function SignUp() {
  const [shown, setShow] = useState(false);
  const { serverUrl } = useContext(AuthDataContext);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          firstName,
          lastName,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(result.data);
      navigate("/");
      setFirstName("")
      setLastName("");
      setPassword("");
      setEmail("");
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#c6b5b5] flex flex-col items-center justify-start  ">
      <div className="p-2 lg:p-4 w-full h- [80px] flex items-center  ">
        <img src={logo} alt="" />
      </div>

      <form className="max-w-sm mx-auto text-black" onSubmit={handleSignUp}>
        <h1 className="font-bold text-grey-800 text-xl">SignUp</h1>
        <div className="mb-5">
          <input
            type="text"
            id="firstname"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="lastname"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="lastname"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="lastname"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="username"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <input
            type={shown ? "text" : "password"}
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShow((prev) => !prev)}>
            {shown ? "hidden" : "show"}
          </span>
        </div>
        <button
          type="submit"
          className="text-black bg-amber-700 bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
        >
          Sign up
        </button>
        <p className="cursor-pointer" onClick={() => navigate("/login")}>
          already have a acoout ?{" "}
          <span className="text-blue-500"> Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
