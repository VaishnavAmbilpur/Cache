import { useContext, useState } from "react";
import axios from "axios";
import Button from "../Ui-Componets/Button";
import "./Login.css";   
import UserContext from "../Global";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const { login, setlogin, setToken } = useContext(UserContext)!;
   const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      email,
      name: username,
      password,
    });
    if (res.data?.user?.token) {
      setToken(res.data.user.token);
    }
    setMessage("Login successful!");
    setlogin(true);
    navigate("/");
  } catch (err) {
    setMessage("Invalid Credentials");
  }
};
  
  return (
  !login ? (
    <div className="flex justify-center items-center h-full w-full bg-transparent">
      <div className="h-88 flex flex-col gap-8 bg-white/10 backdrop-blur-md border border-white rounded-2xl p-10 shadow-2xl hover:bg-white/20 transition-all duration-300">
        <a className="text-3xl font-Static font-extrabold text-white text-center">Login</a>
        <div className="inputBox1">
          <input
            type="text"
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            required={true}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <span>Username</span>
        </div>
        <div className="inputBox">
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
        <div className="text-gray-300 text-sm text-center">
          Don't have an account? <span className="text-blue-300 cursor-pointer hover:text-blue-200 transition-colors" onClick={() => navigate("/signup")}>Sign up</span>
        </div>
        {message && <div className="font-extralight text-xl md:text-md text-center text-white bg-white/10 border border-white/30 rounded-lg p-2">{message}</div>}
      </div>
    </div>
  ) : null
);
};

export default Login;