import React, { useEffect, useState } from "react";
import Pokemonthumnails from "./component/Thumbnails";
import PokemonPopUp from "./component/PopUp";
import { useInView } from "react-intersection-observer";
import typeColors from "./component/PopBackground";


function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 1.0 });

  const getAllPokemons = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { next, results } = await (await fetch(loadMore)).json();
      setLoadMore(next);
      const newPokemons = await Promise.all(
        results.map((pokemon) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) => res.json())
        )
      );
      setAllPokemons((currentList) => {
        const newPokemonsFiltered = newPokemons.filter(
          (newPokemon) => !currentList.some((currentPokemon) => currentPokemon.id === newPokemon.id)
        );
        return [...currentList, ...newPokemonsFiltered].sort((a, b) => a.id - b.id);
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    if (inView && !loading) getAllPokemons();
  }, [inView, loading]);

  const handlePokemonClick = (pokemon) => {
    const primaryType = pokemon.types[0].type.name;
    setSelectedPokemon({ ...pokemon, backgroundColor: typeColors[primaryType] || "#ffffff" });
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Welcome To My Pokémon World</h1>
      <input
        type="text"
        placeholder="Enter Pokemon Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      
      />
      <div className="pokemon-container">
        <div className="all-container">
          {filteredPokemons.map((pokemon) => (
            <Pokemonthumnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon)}
            />
          ))}
        </div>
        <div
          ref={ref}
          style={{ height: "1px", background: "transparent", margin: "10px 0" }}
        />
        {loading && <div className="loading">Loading...</div>}
      </div>
      {selectedPokemon && <PokemonPopUp pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
    </div>
  );
}

export default App;
