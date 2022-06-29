import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth } from "./context/auth.context";
import { HomeComponent } from "./pages/home";
import { LoginComponent } from "./pages/login";

function Routes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        {signed ? <Route path="/" component={HomeComponent} /> : <Route path="/" component={LoginComponent} />}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;