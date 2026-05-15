import { useState } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./dashboard/Dashboard";

const App = () => {
  const [isAuthView, setIsAuthView] = useState(true);

  if (isAuthView) {
    return <AuthPage onLogin={() => setIsAuthView(false)} />;
  } else {
    return <Dashboard />;
  }
};

export default App;
