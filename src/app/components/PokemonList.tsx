import PokemonItem from "./PokemonItem";
import { Pokemon } from "@/types/pokemon";

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

interface PokemonListProps {
    numberOfPokemons?: number;
}

async function getPokemons(limit: number): Promise<Pokemon[]> {
    try {
        const listResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        
        if (!listResponse.ok) { // ok implica un status code entre 2xx
            throw new Error('Failed to fetch Pokemon list');
        }
        
        const listData: PokemonListResponse = await listResponse.json();
        
        const pokemonPromises = listData.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url, { 
                next: { revalidate: 3600 } // Cache for 1 hour
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon: ${pokemon.name}`);
            }
            
            return response.json() as Promise<Pokemon>;
        });
        
        const allPokemons = await Promise.all(pokemonPromises);
        console.log(`Fetched ${allPokemons.length} pokemons`);
        return allPokemons;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to load Pokemon data. Please try again.');
    }
}

// este es un server component
export default async function PokemonList({ numberOfPokemons = 30 }: PokemonListProps) {
    const pokemons = await getPokemons(numberOfPokemons);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pokemons.map((pokemon) => (
                <PokemonItem key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}
