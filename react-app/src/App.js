import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import MainPage from "./components/Posts/MainPage";
import SplashPage from "./components/SplashPage/index.";

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
          <Route exact path='/'>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
