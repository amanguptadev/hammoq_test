import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const RegisterScreen = ({ history }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          firstname,
          lastname,
          email,
          gender,
          phone_number,
          password,
        },
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
    <div className="w-full flex h-screen justify-center items-center">
      <form onSubmit={registerHandler} className="w-auto p-4 shadow bg-white">
        <h3 className="text-center mb-2">Register</h3>
        {error && <span className="error-message">{error}</span>}

        <div className="flex">
          <InputField
            value={firstname}
            type="text"
            placeholder="Enter firstname"
            label="Firstname"
            stylesName="w-full p-2"
            onChange={(e) => setFirstname(e)}
          />

          <InputField
            value={lastname}
            type="text"
            placeholder="Enter lastname"
            label="Lastname"
            stylesName="w-full p-2"
            onChange={(e) => setLastname(e)}
          />
        </div>

        <div className="flex">
          <InputField
            value={phone_number}
            type="number"
            placeholder="Enter phone number"
            label="Phone number"
            stylesName="w-full p-2"
            onChange={(e) => setPhoneNumber(e)}
          />

          <InputField
            value={email}
            type="email"
            placeholder="Enter email"
            label="Email"
            stylesName="w-full p-2"
            onChange={(e) => setEmail(e)}
          />
        </div>

        <div className="mb-2 px-2">
          <span className="block text-sm mb-2">Gender</span>
          <div className="inline">
            <InputField
              value="male"
              type="radio"
              name="gender"
              stylesName="inline"
              checked="true"
              onChange={(e) => setGender(e)}
            />
            <span className="inline pl-2">Male</span>
          </div>

          <div className="inline pl-4">
            <InputField
              value="female"
              type="radio"
              name="gender"
              stylesName="inline"
              onChange={(e) => setGender(e)}
            />
            <span className="inline pl-2">Female</span>
          </div>
        </div>

        <div className="flex">
          <InputField
            value={password}
            type="password"
            label="Password"
            placeholder="Enter password"
            stylesName="w-full p-2"
            required="true"
            onChange={(e) => setPassword(e)}
          />

          <InputField
            value={confirmpassword}
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
            stylesName="w-full p-2"
            required="true"
            onChange={(e) => setConfirmPassword(e)}
          />
        </div>
        <Button text="Register" type="submit" />

        <span className="pt-3 text-sm block text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
