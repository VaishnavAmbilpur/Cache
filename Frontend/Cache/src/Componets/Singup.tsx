import { useState } from "react";
import axios from "axios";
import Button from "../Ui-Componets/Button";
import "./Signup.css";   
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://cache-14.onrender.com/api.v1/signup", {
        email,
        name:username,
        password,
      });
      if(res){
        setMessage("Signup successful!");
        navigate("/login");
      } else {
        setMessage("Error in Signup");
      }
    } catch (err) {
     setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-transparent">
      <div className="h-88 flex flex-col gap-8">
        <a className="text-3xl font-Static font-extrabold">Sign Up</a>
        <div className="inputBox1 text-white">
          <input
            type="text"
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="user">Email</span>
        </div>
        <div className="inputBox  text-white">
          <input
            type="text"
            required={true}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <span>Username</span>
        </div>
        <div className="inputBox  text-white">
          <input
            type="password"
            required={true}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>
        <div>
          <Button varient="primary" size="md" onClick={handleSubmit} text="Enter" />
        </div>
        <div className="text-gray-400 text-sm">
          Already have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/login")}>Log in</span>
        </div>
        {message && <div className="font-extralight text-xl md:text-md">{message}</div>}
      </div>
    </div>
  );
};

export default Form;