import React, {useState} from "react";
import { Icon } from "@iconify/react";
import TextInput from "./shared/TextInput";
import PasswordInput from "./shared/PasswordInput";
import { Link, useNavigate, } from "react-router-dom";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [UserName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();


  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. please check again!");
      return;
    }
    const data = { email, password, UserName, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest("/auth/register",
      data
    );
    if (response && !response.err) {
      console.log(response);
      const token = response.token;
       const date = new Date();
       date.setDate(date.getDate() + 30);
      setCookie("token", token, {path: '/', expires:date} )
      navigate("/home");
    }
    else {
      alert("Failure");
    }

  };

  
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-center p-4 border-b border-solid border-gray-200">
        <Icon icon="logos:spotify" width={150} />
      </div>
      <div className="w-1/4 py-10">
        <TextInput
          label="Email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email"
          placeholder="Enter Your Email Again"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="UserName"
          placeholder="Enter Your UserName"
          value={UserName}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        <div className="w-full justify-center items-center">
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            value={lastName}
            setValue={setLastName}
          />
        </div>

        <div className="w-full flex items-center justify-center my-8">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full "
            onClick={(e) => {
              e.preventDefault();
              signUp();
          }}>
            SignUP
          </button>
        </div>
        <div className="w-full border border-solid-300"></div>
        <div className="my-6 text-lg font-semibold text-center">
          Already, Have an Account?
        </div>
        <div className="w-full border border-gray-400 text-gray-400 rounded-full py-2 text-center font-bold">
          <Link to="/login">Login Instead</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
