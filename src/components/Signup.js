import React from "react";
import { useContext } from "react";
import { useState } from "react";
import NoteContext from "../Contexts/Notes/NoteContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    
  
  let navigate = useNavigate()
    
    const [addCred, setaddCred] = useState({"email":"","password":"","name":""})
    const onSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({name:addCred.name[0],email:addCred.email[0],password:addCred.password[0]}),
    });
    const json = await response.json();
    if(json.success){
    localStorage.setItem("authToken", json.authToken);
    navigate('/')}
    }
    const onChange =(e)=>{
      e.preventDefault();
        setaddCred({...addCred,[e.target.name]:[e.target.value]});
        
    }
  return (
    <div>
      <div className="container mt-3">
        <form className="container my-2" onSubmit={onSubmit}>
          <h4>Sign UP for Cloudbook</h4>
          <div className="form-group my-2">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
              name="name"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
