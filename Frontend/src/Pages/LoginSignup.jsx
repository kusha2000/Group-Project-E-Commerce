import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  };

  const validateForm = () => {
    const { username, password, email } = formData;

    if (state === "Sign Up" && !username) {
      alert("Username is required.");
      return false;
    }
    if (!email) {
      alert("Email is required.");
      return false;
    }
    if (!password) {
      alert("Password is required.");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch("http://localhost:4000/login",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors)
    }
  };
  const signup = async () => {
    if (!validateForm()) return;
    console.log("Signup Function Executed",formData);
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors)
    }
  };

  const handleStateChange = (newState) => {
    setState(newState);
    setFormData({
      username: "",
      password: "",
      email: "",
    });
  };

  

  return (
    <div>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" ? (
              <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Your Name"  />
            ) : (
              <></>
            )}
            <input type="email" name="email"  value={formData.email} onChange={changeHandler} placeholder="Email Address" />
            <input type="password" name="password"  value={formData.password} onChange={changeHandler} placeholder="Password" />
          </div>
          <button
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
          >
            Continue
          </button>
          {state === "Sign Up" ? (
            <p className="loginsignup-login">
              Already have an account?{" "}
              <span
                onClick={() => {
                  handleStateChange("Login");
                  //setState("");
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account?{" "}
              <span
                onClick={() => {
                  handleStateChange("Sign Up");
                  //setState("Sign Up");
                }}
              >
                Click here
              </span>
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
