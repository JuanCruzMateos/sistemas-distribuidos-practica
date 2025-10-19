import { Suspense } from "react";
import PokemonList from "./PokemonList";
import PokemonSkeleton from "./PokemonSkeleton";

interface PokemonListWrapperProps {
    numberOfPokemons?: number;
}

export default function PokemonListWrapper({ numberOfPokemons = 30 }: PokemonListWrapperProps) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2" style={{ color: '#134686' }}>
                    Pokemon Collection
                </h1>
                <p className="text-lg" style={{ color: '#134686' }}>
                    Discover {numberOfPokemons} amazing Pokémon from the PokeAPI
                </p>
            </div>
            
            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: numberOfPokemons }).map((_, index) => (
                        <PokemonSkeleton key={index} />
                    ))}
                </div>
            }>
                <PokemonList numberOfPokemons={numberOfPokemons} />
            </Suspense>
        </div>
    );
}
