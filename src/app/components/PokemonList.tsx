"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem";
import { Pokemon } from "@/types/pokemon";

interface PokemonListProps {
    numberOfPokemons: number;
}

async function getPokemonById(id: number): Promise<Pokemon> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    return response.data;
}

export default function PokemonList({ numberOfPokemons }: PokemonListProps) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            const pokemonPromises = [];
            for (let i = 0; i < numberOfPokemons; i++) {
                pokemonPromises.push(getPokemonById(i));
            }
            const allPokemons = await Promise.all(pokemonPromises);
            console.log(`Fetched ${allPokemons.length} pokemons`);
            setPokemons(allPokemons); // llamo solo 1 vez a setPokemons, no en cada iteración, asi no se repite el renderizado
        };
        fetchPokemons();
    // Array vacío []: el efecto se ejecuta una sola vez, al montar el componente. Ideal para cargar datos iniciales desde una API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Pokemon Collection
                </h1>
                <p className="text-lg text-white">
                    Discover {numberOfPokemons} amazing Pokémon from the PokeAPI
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pokemons.map((pokemon) => (
                    <PokemonItem key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}