import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./Page/aboutPage";
import Home from "./Page/homePage";
import SinglePokemon from "./Page/singlePokemon";
import PokedexPage from "./Page/pokedexPage";


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <PokedexPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:name">
            <SinglePokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
