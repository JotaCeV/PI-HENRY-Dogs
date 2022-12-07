import React from "react";
import { Route } from "react-router-dom";
import { About } from "./components/about";
import { DogDetail } from "./components/dog-detail";
import { DogForm } from "./components/dog-form";
import { Header } from "./components/header";
import { Home } from "./components/home";
import { LandingPage } from "./components/landing-page";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <Route exact path="/" component={LandingPage} />
        <Route path="/Home" component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Create-dog" component={DogForm} />
        <Route path="/Dog/:id" component={DogDetail} />
      </div>
    </React.Fragment>
  );
}

export default App;
