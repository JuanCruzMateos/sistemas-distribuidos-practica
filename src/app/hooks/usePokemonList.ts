import { useQuery } from "@tanstack/react-query";
import { fetchPokemonListWithDetails, fetchPokemonById, PokemonListParams } from "@/app/services/pokemonService";
import { Pokemon } from "@/app/types/pokemon";

/**
 * Custom hook to fetch a list of Pokemon with their detailed information
 * @param params - Object containing limit and offset parameters
 * @returns Query result with Pokemon data, loading state, and error handling
 */
export function usePokemonList(params: PokemonListParams) {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokemon-list", params.limit, params.offset],
    queryFn: () => fetchPokemonListWithDetails(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
}

/**
 * Custom hook to fetch a single Pokemon by ID
 * @param pokemonId - The ID of the Pokemon to fetch
 * @returns Query result with Pokemon data, loading state, and error handling
 */
export function usePokemonById(pokemonId: number) {
  return useQuery<Pokemon, Error>({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => fetchPokemonById(pokemonId),
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    retryDelay: 1000,
    enabled: !!pokemonId, // Only run query if pokemonId is provided
  });
}
