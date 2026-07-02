import { useEffect, useState } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./dashboard/Dashboard";

const App = () => {
  const [isAuthView, setIsAuthView] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if(savedToken){
      setIsAuthView(false)
    }
  }, [])

  if (isAuthView) {
    return <AuthPage onLogin={() => setIsAuthView(false)} />;
  } else {
    return <Dashboard />;
  }
};

export default App;
