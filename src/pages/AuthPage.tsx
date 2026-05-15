import { useState } from "react";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_left}>
        <h2>Keep your thoughts organised.</h2>
        <p>A simple, fast notes app to capture everything that matters.</p>
      </div>
      <div className={styles.auth_right}>
        <h1>Sign in</h1>
        <div className={styles.auth_tabs}>
          <button className={isLogin ? styles.active : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? styles.active : ""}onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <div className={styles.auth_form}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {isLogin ? (
            <button className={styles.auth_submit}>Login</button>
          ) : (
            <button className={styles.auth_submit}>Register</button>
          )}
        </div>
        <p className={styles.auth_error}></p>
      </div>
    </div>
  );
};

export default AuthPage;
