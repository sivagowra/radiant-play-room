import { useState, useEffect } from "react";
import { Login } from "@/components/Login";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser");
    const storedCourse = localStorage.getItem("currentCourse");
    if (storedUser && storedCourse) {
      setUsername(storedUser);
      setSelectedCourse(storedCourse);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: string, course: string) => {
    setUsername(user);
    setSelectedCourse(course);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", user);
    localStorage.setItem("currentCourse", course);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setSelectedCourse("");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCourse");
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard username={username} course={selectedCourse} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default Index;
