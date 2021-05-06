import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./Page/aboutPage";
import Home from "./Page/homePage";
import SinglePokemon from "./Page/singlePokemon";
import PokedexPage from "./Page/pokedexPage";

/**
 * By using react-router-dom to switch every page
 * More react-router-dom please visit https://reactrouter.com/
 * Tip:
 * Must use Router to cover Route and Link component
 */

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
