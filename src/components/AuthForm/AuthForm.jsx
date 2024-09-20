import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../../redux-store/authSlice";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Both fields are required!");
      return;
    }
    if (isRegister) {
      dispatch(register({ username, password }));
    } else {
      dispatch(login({ username, password }));
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <div
        className={styles.toggleButton}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </div>
    </div>
  );
};

export default AuthForm;
