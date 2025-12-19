import { useState } from "react";
import axios from "axios";
import Button from "../Ui-Componets/Button";
import "./Signup.css";   
const Form = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://cache-14.onrender.com/api.v1/signup", {
        email,
        name:username,
        password,
      });
      if(res)setMessage("Signup successful!");
      else setMessage("Error in Signup")
    } catch (err) {
     setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-auto items-center m-10 bg-transparent bg-clip-content  font-roboto font-extrabold text-flush-orange-950 bg-flush-orange-100">
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
        {message && <div className="font-extralight text-xl md:text-md">{message}</div>}
      </div>
    </div>
  );
};

export default Form;