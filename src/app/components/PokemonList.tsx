"use client";

import { useEffect, useMemo, useState } from "react";
import PokemonItem from "./PokemonItem";
import PokemonSkeleton from "./PokemonSkeleton";
import PokemonPagination from "./PokemonPagination";
import { usePokemonList } from "@/app/hooks/usePokemonList";
import { useFavorites } from "@/app/hooks/useFavorites";
import { Pokemon } from "@/app/types/pokemon";

export default function PokemonList() {
    const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
    
    const { data, isLoading, error, isFetching } = usePokemonList({
        limit: 30, // Fijo en 30
        offset: offset
    });

    const {
        data: favorites,
        isLoading: isFavoritesLoading,
        error: favoritesError,
    } = useFavorites();

    const favoriteIds = useMemo(() => {
        return new Set((favorites ?? []).map((favorite) => favorite.id));
    }, [favorites]);

    // Update allPokemons when new data arrives
    useEffect(() => {
        if (data && data.length > 0) {
            if (!hasLoadedInitial) {
                // primera carga -> reemplazar todos los datos
                setAllPokemons(data);
                setHasLoadedInitial(true);
            } else {
                // cargas posteriores -> solo appendear los nuevos datos
                setAllPokemons(prev => {
                    const newPokemons = data.filter(pokemon => 
                        !prev.some(existing => existing.id === pokemon.id)
                    );
                    return [...prev, ...newPokemons];
                });
            }
        }
    }, [data, hasLoadedInitial]); // se ejecuta cuando data o hasLoadedInitial cambia

    const handleLoadMore = () => {
        setOffset(prev => prev + 30);
    };

    const hasMore = allPokemons.length < 1000; // PokeAPI has around 1000+ Pokemon
    const isLoadingMore = isFetching && hasLoadedInitial;

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">
                            Error Loading Pokemon
                        </h3>
                        <p className="text-red-600 mb-4">
                            {error.message || 'Failed to load Pokemon data. Please try again.'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2" style={{ color: '#134686' }}>
                    Pokemon Collection
                </h1>
                <p className="text-lg" style={{ color: '#134686' }}>
                    Discover amazing Pokémon from the PokeAPI with infinite scroll
                </p>
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allPokemons.map((pokemon) => (
                    <PokemonItem
                        key={pokemon.id}
                        pokemon={pokemon}
                        isFavorite={favoriteIds.has(pokemon.id)}
                        isFavoritesLoading={isFavoritesLoading}
                    />
                ))}
            </div>

            {/* Loading State */}
            {isLoading && !hasLoadedInitial && (
                <PokemonSkeleton count={12} />
            )}

            {/* Loading More State */}
            {isLoadingMore && (
                <div className="mt-8">
                    <PokemonSkeleton count={6} />
                </div>
            )}

            {favoritesError && (
                <div className="mt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-700 text-sm font-medium">
                            {favoritesError.message || "No se pudieron cargar los favoritos. Aguarde e intente nuevamente."}
                        </p>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <PokemonPagination
                onLoadMore={handleLoadMore}
                isLoading={isLoadingMore}
                hasMore={hasMore}
                currentCount={allPokemons.length}
                totalCount={1000} // Approximate total
            />
        </div>
    );
}
