import React, { useState, useEffect } from "react";
import HeaderBar from "../lib/headerPage";
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";

export default function SinglePokemon() {
  const [pokemonData, setPokemonData] = useState([]);

  let { name } = useParams();

  const SinglePokomon = () => {
    console.log(name);
    fetch(` https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((pokeData) => {
        console.log(pokeData);
        setPokemonData(pokeData);
        console.log(pokeData);
      });
  };

  useEffect(() => {
    SinglePokomon();
  }, []);

  return (
    <div>
      <HeaderBar>
        <h2> This is Single Pokemon Page</h2>
        <h3>ID: {name}</h3>
        <img
          width="205px"
          height="205px"
          alt="example"
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonData.id}.png`}
        />
      </HeaderBar>
    </div>
  );
}
