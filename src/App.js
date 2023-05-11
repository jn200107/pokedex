import './App.css';
import {useEffect,useState} from 'react'

const App=()=> {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  }, []);
  // a qui hacemos el llamado a la api y guardamos la data que nos trae en la setPokemonList

  const getPokemonDetails = (pokemonUrl) => {
    fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => setSelectedPokemon(data));

  };

  const renderPokemonList = () => {
    return (
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name} onClick={() => {getPokemonDetails(pokemon.url)}}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    );
  };




  const renderPokemonDetails = () => {
    if (selectedPokemon) {
      const { sprites, name, id, types, stats, abilities, color } = selectedPokemon;
      return (
        <div style={{backgroundColor:color}} >
          <img src={sprites.front_default} alt={name} />
          <h2>{name}</h2>
          <p>Number: {id}</p>
          <p>Types: {types.map(type => type.type.name).join(', ')}</p>
          <p>Stats: {stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
          <p>Abilities: {abilities.map(ability => ability.ability.name).join(', ')}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="App">
      <h1> La Pokédex</h1>
      <div className="PokemonList">{renderPokemonList()}</div>
      <div className="PokemonDetails">{renderPokemonDetails()}</div>
    </div>


  );
}

export default App;



