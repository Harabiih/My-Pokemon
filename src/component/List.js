import React, { useState, useEffect } from "react";
import PokemonDetails from "./Details"; 

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]); 
  const [selectedPokemon, setSelectedPokemon] = useState(null); 

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10") 
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const handlePokemonClick = async (pokemonUrl) => {
    const res = await fetch(pokemonUrl); 
    const data = await res.json();
    setSelectedPokemon(data);  
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="pokemon-item"
            onClick={() => handlePokemonClick(pokemon.url)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
      
      
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
    </div>
  );
};

export default PokemonList;