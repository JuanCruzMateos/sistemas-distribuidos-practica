"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { useAddFavorite, useRemoveFavorite } from "@/app/hooks/useFavorites";
import { Pokemon } from "@/app/types/pokemon";

interface PokemonItemProps {
    pokemon: Pokemon;
    isFavorite: boolean;
    isFavoritesLoading: boolean;
}

export default function PokemonItem({ pokemon, isFavorite, isFavoritesLoading }: PokemonItemProps) {
    const addFavoriteMutation = useAddFavorite();
    const removeFavoriteMutation = useRemoveFavorite();

    const isProcessing = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;
    const mutationError = addFavoriteMutation.error?.message ?? removeFavoriteMutation.error?.message ?? null;

    const mainImage = useMemo(() => {
        return (
            pokemon.sprites.other?.["official-artwork"]?.front_default ||
            pokemon.sprites.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
        );
    }, [pokemon.id, pokemon.sprites]);

    const pokemonTypes = useMemo(() => pokemon.types.map((type) => type.type.name), [pokemon.types]);

    const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isProcessing && !isFavoritesLoading) {
            if (isFavorite) {
                removeFavoriteMutation.mutate(pokemon.id);
            } else {
                addFavoriteMutation.mutate({
                    id: pokemon.id,
                    name: pokemon.name,
                    image: mainImage,
                    types: pokemonTypes,
                });
            }
        }
    };

    const buttonLabel = isFavoritesLoading
        ? "Cargando favoritos..."
        : isProcessing
            ? "Procesando..."
            : isFavorite
                ? "Quitar de favoritos"
                : "Agregar a favoritos";

    return (
        <Link
            href={`/pokemon/${pokemon.id}`}
            className="w-full bg-white rounded-lg shadow-md p-4 border transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 block hover:shadow-lg hover:scale-105"
            style={{
                borderColor: "#feb21a",
                "--tw-ring-color": "#134686",
            } as CSSProperties}
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold capitalize" style={{ color: "#134686" }}>
                    {pokemon.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#feb21a", color: "#134686" }}
                    >
                        #{pokemon.id}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
                {mainImage && (
                    <Image
                        src={mainImage}
                        alt={pokemon.name}
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                )}

                <div className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-1">
                        {pokemon.types.map((type) => (
                            <span
                                key={type.type.name}
                                className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: "#ed3f27", color: "white" }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <div className="text-xs" style={{ color: "#134686" }}>
                        {pokemon.height / 10}m • {pokemon.weight / 10}kg
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
                {pokemon.abilities.map((ability, index) => (
                    <span
                        key={`${ability.ability.name}-${ability.slot}-${index}`}
                        className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "#fdf4e3", color: "#134686" }}
                    >
                        {ability.ability.name}
                    </span>
                ))}
            </div>

            <button
                onClick={handleToggleFavorite}
                disabled={isProcessing || isFavoritesLoading}
                className={`mt-2 w-full px-3 py-2 rounded-md text-sm font-semibold transition-colors ${isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                    } ${isProcessing || isFavoritesLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {buttonLabel}
            </button>

            {mutationError && (
                <p className="mt-2 text-sm text-red-600">{mutationError}</p>
            )}
        </Link>
    );
}
