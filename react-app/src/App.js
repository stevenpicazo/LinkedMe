import React, { useState, useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import MainPage from "./components/Posts/MainPage";
import SplashPage from "./components/SplashPage/index.";
import SignupFormModal from "./components/SignupFormModal";
import Profile from "./components/Profile";
import Following from "./components/Following/Following";
import Followers from "./components/Following/Followers";

import { Modal, ModalProvider } from "./context/Modal";

export const ThemeContext = createContext(null);

function App() {
  const dispatch = useDispatch();

  // Retrieve the theme preference from localStorage if it exists
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    // Toggle the theme and update the id of the root div element
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>

        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <ProtectedRoute path="/feed" >
              <MainPage theme={theme} toggleTheme={toggleTheme} />
            </ProtectedRoute>
            <ProtectedRoute exact path='/profile/:userId'>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path='/following'>
              <Following />
            </ProtectedRoute>
            <ProtectedRoute exact path='/followers'>
              <Followers />
            </ProtectedRoute>
            <Route exact path='/signup'>
              <SignupFormModal />
            </Route>
            <Route exact path='/'>
              <SplashPage />
            </Route>
          </Switch>
        )}
        <ModalProvider theme={theme} toggleTheme={toggleTheme}> {/* Pass the theme and toggleTheme props */}
          <Modal />
        </ModalProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
