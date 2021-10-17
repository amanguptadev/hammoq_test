import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form
        onSubmit={loginHandler}
        className="w-96 shadow p-6 bg-white"
      >
        <h3 className="text-center pb-5">Login</h3>
        {error && <span className="error-message">{error}</span>}

        <InputField
          value={email}
          type="text"
          required="true"
          placeholder="Email address"
          label="Email:"
          onChange={(e) => setEmail(e)}
        />

        <InputField
          value={password}
          type="password"
          required="true"
          placeholder="Email password"
          label="Password:"
          autoComplete="true"
          onChange={(e) => setPassword(e)}
        />

        <Button text="submit" type="submit"/>
        

        <span className="pt-3 text-sm block">
          Don't have an account? <Link className="text-blue-600" to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
