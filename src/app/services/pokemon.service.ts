import { Pokemon } from "@/app/types/pokemon";

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonListParams {
  limit: number;
  offset: number;
}

/**
 * Fetches a list of Pokemon from the PokeAPI
 * @param params - Object containing limit and offset parameters
 * @returns Promise<PokemonListResponse>
 */
export async function fetchPokemonList(params: PokemonListParams): Promise<PokemonListResponse> {
  const { limit, offset } = params;
  
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw new Error('Failed to fetch Pokemon list. Please try again.');
  }
}

/**
 * Fetches detailed information for a specific Pokemon
 * @param pokemonUrl - The URL of the Pokemon to fetch
 * @returns Promise<Pokemon>
 */
export async function fetchPokemonDetail(pokemonUrl: string): Promise<Pokemon> {
  try {
    const response = await fetch(pokemonUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error);
    throw new Error('Failed to fetch Pokemon details. Please try again.');
  }
}

/**
 * Fetches detailed information for a specific Pokemon by ID
 * @param pokemonId - The ID of the Pokemon to fetch
 * @returns Promise<Pokemon>
 */
export async function fetchPokemonById(pokemonId: number): Promise<Pokemon> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon by ID:', error);
    throw new Error('Failed to fetch Pokemon details. Please try again.');
  }
}

/**
 * Fetches a complete list of Pokemon with their detailed information
 * @param params - Object containing limit and offset parameters
 * @returns Promise<Pokemon[]>
 */
export async function fetchPokemonListWithDetails(params: PokemonListParams): Promise<Pokemon[]> {
  try {
    // First, get the list of Pokemon
    const listResponse = await fetchPokemonList(params);
    
    // Then, fetch details for each Pokemon
    const pokemonPromises = listResponse.results.map(pokemon => 
      fetchPokemonDetail(pokemon.url)
    );
    
    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  } catch (error) {
    console.error('Error fetching Pokemon list with details:', error);
    throw new Error('Failed to fetch Pokemon data. Please try again.');
  }
}
