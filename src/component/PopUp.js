import React from "react";


const PokemonPopUp = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const { backgroundColor } = pokemon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ backgroundColor }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <h1>{pokemon.name}</h1>
        <img
        className="pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          alt={`${pokemon.name} sprite`}
        />
        <div className="abilities">
          {pokemon.abilities.map((ability) => (
            <div className="group" key={ability.ability.name}>
              <h2>{ability.ability.name}</h2>
            </div>
          ))}
        </div>
        <div className="base-stat">
            <h2 className="section-title">Pokie Stat</h2>
          {pokemon.stats.map((stat) => (
            <h3 key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonPopUp;
