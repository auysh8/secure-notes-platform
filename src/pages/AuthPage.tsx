import { useState } from "react";
import styles from "./AuthPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) toast.success("Welcome");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error(err.response.data.message, {
          style: { backgroundColor: "#000000", color: "#ffffff" },
        });
      }
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/auth/register`,
        { email, password }
      );
      if (response.status === 201) handleLogin();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.auth_container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div 
        className={styles.auth_card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.auth_left}>
          {/* SVG Wave dividing left and right */}
          <svg className={styles.wave_overlay} viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path d="M100 0 H50 C 90 200, 0 400, 40 600 C 80 800, 20 900, 50 1000 H100 V0 Z" fill="#ffffff" />
          </svg>
          
          <div className={styles.auth_left_content}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Keep your<br/>thoughts<br/><span className={styles.highlight}>organised.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A simple, fast notes app to capture everything that matters. Focus on your ideas, we'll handle the rest.
            </motion.p>
          </div>
        </div>
        
        <div className={styles.auth_right}>
          <motion.div 
            className={styles.auth_right_content}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1>{isLogin ? "Sign in" : "Create account"}</h1>
            <p className={styles.subtitle}>
              {isLogin ? "Welcome back! Please enter your details." : "Join us and start organizing your life."}
            </p>

            <div className={styles.form_grid} style={{ gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr' }}>
              {!isLogin && (
                <>
                  <div className={styles.input_group}>
                    <label>Name</label>
                    <input type="text" />
                  </div>
                  <div className={styles.input_group}>
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </>
              )}
              {isLogin && (
                <div className={styles.input_group}>
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              )}
              <div className={styles.input_group}>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {!isLogin && (
                <div className={styles.input_group}>
                  <label>Confirm Password</label>
                  <input type="password" />
                </div>
              )}
            </div>

            {!isLogin && (
              <label className={styles.terms_checkbox}>
                <input type="checkbox" />
                I agree to the terms of service and privacy policy
              </label>
            )}

            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                <a href="#" className={styles.forgot_link}>Forgot password?</a>
              </div>
            )}

            <button 
              className={styles.auth_submit} 
              onClick={isLogin ? handleLogin : handleRegister} 
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (isLogin ? "Login" : "Sign up")}
            </button>

            <div className={styles.auth_toggle}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
