import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import MainPage from "./components/Posts/MainPage";
import SplashPage from "./components/SplashPage/index.";
import SignupFormModal from "./components/SignupFormModal";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <ProtectedRoute path="/feed" >
            <MainPage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile/:userId'>
            <Profile />
          </ProtectedRoute>
          <Route exact path='/signup'>
            <SignupFormModal />
          </Route>
          <Route exact path='/'>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
