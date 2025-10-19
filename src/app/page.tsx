import PokemonListWrapper from "./components/PokemonListWrapper";

export default function Home() {
  const numberOfPokemons = 30;
  
  return (
    <div>
      <PokemonListWrapper numberOfPokemons={numberOfPokemons} />
    </div>
  );
}