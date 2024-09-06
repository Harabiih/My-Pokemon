import React from "react";
const PokemonDetails = ({ pokemon }) => {
  return (
    <>
      {!pokemon ? (
        ""
      ) : (
        <>
          <h1>{pokemon.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
          />
          <div className="abilities">
            {pokemon.abilities.map((poke, index) => {
              return (
                <div className="group" key={index}>
                  <h2>{poke.ability.name}</h2> 
                </div>
              );})}
          </div>
          <div className="base-stat">
            {pokemon.stats.map((poke, index) => {
              return (
                <div key={index}> 
                  <h3>
                    {poke.stat.name}: {poke.base_stat} 
                  </h3>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );};
export default PokemonDetails;