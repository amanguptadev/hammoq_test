import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../ui/NavBar";
import { useHistory } from "react-router-dom";
import InputField from "../ui/InputField";

const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

  const updateUserHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          firstname,
          lastname,
          email,
          gender,
          phone_number,
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

  useEffect(() => {
    const fetchUserData = async () => {
      var config = {
        method: "get",
        url: "/api/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      axios(config)
        .then(function (response) {
          let user = response.data.user;

          setFirstname(user.firstname);
          setLastname(user.lastname);
          setEmail(user.email);
          setGender(user.gender);
          setPhoneNumber(user.phone_number);
        })
        .catch(function (error) {
          setError(error.response.data.error);
          localStorage.removeItem("authToken");
          history.push("/login");
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    };

    fetchUserData();
  }, []);

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <Navbar></Navbar>

      <div className="w-full flex justify-center items-cente">
        <form
          onSubmit={updateUserHandler}
          className="w-auto p-4 shadow bg-white"
        >
          <h3 className="text-center mb-2">User Profile</h3>
          {error && <span className="error-message">{error}</span>}

          <InputField
            value={firstname}
            type="text"
            placeholder="Enter firstname"
            label="Firstname"
            disabled={true}
            onChange={(e) => setFirstname(e)}
          />

          <InputField
            value={lastname}
            type="text"
            placeholder="Enter lastname"
            label="Lastname"
            disabled={true}
            onChange={(e) => setLastname(e)}
          />

          <InputField
            value={phone_number}
            type="number"
            placeholder="Enter phone number"
            label="Phone number"
            disabled={true}
            onChange={(e) => setPhoneNumber(e)}
          />

          <InputField
            value={email}
            type="email"
            placeholder="Enter email"
            label="Email"
            disabled={true}
            onChange={(e) => setEmail(e)}
          />

          <div className="mb-2">
            <span className="block text-sm mb-2">Gender</span>
            <div className="inline">
              <InputField
                value="male"
                type="radio"
                name="gender"
                stylesName="inline"
                disabled={true}
                checked={gender === "male" ? true : false}
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
                disabled={true}
                checked={gender === "female" ? true : false}
                onChange={(e) => setGender(e)}
              />
              <span className="inline pl-2">Female</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
