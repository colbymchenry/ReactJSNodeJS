import React, { useState } from "react";
import "./index.scss";
import LoginForm from "./LoginForm";
import SignupForm from './SignupForm';

const Login = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  
  return showRegister ? <SignupForm setShowRegister={setShowRegister} /> : <LoginForm setShowRegister={setShowRegister} />
  
};

export default Login;
