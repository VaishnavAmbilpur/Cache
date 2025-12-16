import { useContext, useState } from "react";
import axios from "axios";
import Button from "../Ui-Componets/Button";
import "./Login.css";   
import UserContext from "../Global";
const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const { login, setlogin } = useContext(UserContext) as { login: boolean; setlogin: React.Dispatch<React.SetStateAction<boolean>> };

const handleSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api.v1/login", {
      email,
      name: username,
      password,
    });
    if (res.data?.user?.token) {
      localStorage.setItem("token", res.data.user.token);
    }
    setMessage("Login successful!");
    setlogin(true);
  } catch (err) {
    setMessage("Invalid Credentials");
  }
};
  
  return (
  !login ? (
    <div className="flex flex-auto items-center m-10 bg-transparent bg-clip-content font-roboto font-extrabold text-flush-orange-950 bg-flush-orange-100">
      <div className="h-88 flex flex-col gap-8">
        <a className="text-3xl font-Static font-extrabold">Login</a>
        <div className="inputBox1">
          <input
            type="text"
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="user">Email</span>
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
        {message && <div className="font-extralight text-xl md:text-md">{message}</div>}
      </div>
    </div>
  ) : null
);
};

export default Login;