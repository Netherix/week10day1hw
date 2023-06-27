import React, { useState, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  img: string;
  abilities: string[];
}

const PokemonCard = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchPokemon();
  };

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const data = await response.json();

      setPokemon({
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
      });
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={pokemonName} onChange={handleInputChange} placeholder="Enter Pokemon name" />
        <button type="submit">Search</button>
      </form>

      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.img} alt={pokemon.name} />
          <h4>Abilities:</h4>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonCard;
