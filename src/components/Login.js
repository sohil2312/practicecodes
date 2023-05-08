import React from "react";
import { useContext } from "react";
import { useState } from "react";
import NoteContext from "../Contexts/Notes/NoteContext";
import {  useNavigate } from "react-router-dom";

const Login =  () => {

    let navigate = useNavigate();
    const [loginCred, setloginCred] = useState({"email":"","password":""})
   
    const onSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({email:loginCred.email[0],password:loginCred.password[0]}),
    });
    const json = await response.json();
   if(json.success){
    localStorage.setItem('authToken',json.authToken);
    navigate('/')
   }
       
    }
    const onChange =(e)=>{
      setloginCred({...loginCred,[e.target.name]:[e.target.value]});
      
  }
    
  return (
    <div className="container mt-3">
      
      <form className="container my-2" onSubmit={onSubmit}>
      <h4>Login using your creds</h4>
        <div className="form-group my-2">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={onChange}
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
