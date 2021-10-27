import axios from "axios";
import React, { useContext, useState } from "react";
import {userContext} from "../contexts/userContext/userContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const {dispatch} = useContext(userContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    setErrors("");
    await axios.post("http://localhost:3001/api/user/login",{userName, password}).then(res => {
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});      
      history.push("/home");
    }).catch(err => {
      dispatch({type: "LOGIN_FAILURE"});
      setErrors(err.response.data.message);
      setUserName("");
      setPassword("");
    })
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        <p style={{color:"red"}}>{errors}</p>
      </form>
    </div>
  );
};

export default LoginPage;
