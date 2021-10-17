import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../ui/NavBar";
const Dashboard = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {

  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <Navbar></Navbar>
      <span className="w-full text-center block">This is dashboard home</span>
    </div>
  );
};

export default Dashboard;
