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

//   whenever you want to use an input from the user and store that info into a state variable, use code on line 15
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value); 
  };
//   handles the form submission event and calls the fetchPokemon function(below) that retreives the info from the API
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
        // iterates over each element within the abilities array and returns those elements into a new array stored in the abilities variable
        abilities: data.abilities.map((ability: any) => ability.ability.name),
      });
    //   if the try block fails, then the catch block runs and returns the error. try/catch allows you to catch errors without having that error break your entire app
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

//   the useEffect hook triggers an action (in this case fetchPokemon) after the component has been fully rendered onto the webpage. the dependancy array at the end tells react to run this hook only once
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
        <p>Awaiting your input...</p>
      )}
    </div>
  );
};

export default PokemonCard;
