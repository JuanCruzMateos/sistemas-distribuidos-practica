import PokemonList from "./components/PokemonList";


export default function Home() {
  const numberOfPokemons = 20;
  
  return (
    <div>
      <PokemonList numberOfPokemons={numberOfPokemons} />
    </div>
  );
}