import { useState } from "react";
import styles from "./AuthPage.module.css";
import axios from "axios";

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://notes-app-hjn2.onrender.com/api/auth/login`,
        {
          email: email,
          password: password,
        },
      );
      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
    }
  };
  const handleRegister = async () => {
    try {
      await axios.post(`https://notes-app-hjn2.onrender.com/api/auth/register`, {
        email: email,
        password: password,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_left}>
        <h2>Keep your thoughts organised.</h2>
        <p>A simple, fast notes app to capture everything that matters.</p>
      </div>
      <div className={styles.auth_right}>
        <h1>Sign in</h1>
        <div className={styles.auth_tabs}>
          <button
            className={isLogin ? styles.active : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? styles.active : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <div className={styles.auth_form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin ? (
            <button className={styles.auth_submit} onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className={styles.auth_submit} onClick={handleRegister}>
              Register
            </button>
          )}
        </div>
        <p className={styles.auth_error}></p>
      </div>
    </div>
  );
};

export default AuthPage;
