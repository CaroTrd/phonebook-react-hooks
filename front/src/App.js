import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/Home";
import FormAddNumber from "./components/AddNumber";
import FormUpdateNumber from "./components/UpdateNumber";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container-app">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/add-new-contact" render={() => <FormAddNumber />} />
          <Route
            path="/update-contact/:id"
            render={() => <FormUpdateNumber />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
