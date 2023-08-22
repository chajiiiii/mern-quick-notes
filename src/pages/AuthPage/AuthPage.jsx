import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign up and login

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle the state between sign up and login
  };

  return (
    <main>
      <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
      {isSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <p onClick={toggleForm}>{isSignUp ? "Log in" : "Sign up"}</p>
    </main>
  );
}
