import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendLoginDetails } from "../Redux/Actions/actions";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setEmailValue = (e) => {
    return setEmail(e.target.value);
  };

  const setPasswordValue = (e) => {
    return setPassword(e.target.value);
  };

  const data={
      email, password
  };

  
  return (
    <div>
      <h1>Please Login</h1>
      Email: <input type="email" onChange={setEmailValue} />
      <br />
      Password: <input type="password" onChange={setPasswordValue} />
      <br />
      <button onClick={() => dispatch(sendLoginDetails(data))}>
        <Link to="/dashboard">Login</Link>
      </button>
    </div>
  );
}

export default Login;
