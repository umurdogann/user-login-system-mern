import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState("");
const history = useHistory();

const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log("aaa") 
    await axios.post("http://localhost:3001/api/user/register", {"userName":userName,"password": password}).then((response) => {
     history.push("/login");
   }).catch((err) => {
      setErrors(err.response.data.message);
      setUserName("");
      setPassword("");
   })
}

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>        
      <form onSubmit={handleSubmit} style={{display:"flex", alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
          <h1>REGISTER</h1>        
        <input type="text" placeholder="User Name" value= {userName} onChange={(e)=> setUserName(e.target.value)} />
        <br/>
        <input type="password" placeholder="Password" value= {password} onChange={(e)=> setPassword(e.target.value)}/>
        <br/>
        <button type="submit">Register</button>
        <br/>
        <p>{errors}</p>
      </form>
    </div>
  );
};

export default RegisterPage;
