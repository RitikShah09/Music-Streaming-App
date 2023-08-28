import React, { useState } from 'react'
import { Icon } from "@iconify/react";
import TextInput from "./shared/TextInput";
import PasswordInput from "./shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [cookie, setCookie] = useCookies(["token"]);
const navigate = useNavigate();

  const logIn = async () => {
    const data = { email, password};

    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/login",
      data
    );
    if (response && !response.err) {
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-center p-4 border-b border-solid border-gray-200">
        <Icon icon="logos:spotify" width={150} />
      </div>
      <div className="w-1/4 py-10">
        <TextInput label="Email" placeholder="Email"
          value={email}
          setValue={setEmail} />
        <PasswordInput label="Password" placeholder="Password"
         value={password}
          setValue={setPassword}/>
        <div className="w-full flex items-center justify-end my-8">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full " onClick={(e) => {
            e.preventDefault();
            logIn();
          }}>
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid-300"></div>
        <div className="my-6 text-lg font-semibold text-center">
          Don'nt Have an Account
        </div>
        <div className="w-full border border-gray-400 text-gray-400 rounded-full py-2 text-center font-bold">
          <Link to="/signup">Sign Up For Spotify</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
