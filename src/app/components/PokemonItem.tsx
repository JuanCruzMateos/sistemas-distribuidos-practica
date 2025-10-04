import Image from "next/image";
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";

interface PokemonItemProps {
    pokemon: Pokemon;
}

export default function PokemonItem({ pokemon }: PokemonItemProps) {
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        console.log(`Clicked on ${pokemon.name} (ID: ${pokemon.id})`);
        setClickCount(prev => prev + 1);
    };

    return (
        <button 
            onClick={handleClick}
            className="w-full bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg hover:bg-gray-50 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-800 capitalize">
                    {pokemon.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        #{pokemon.id}
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        Clicks: {clickCount}
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
                {pokemon.sprites.front_default && (
                    <Image 
                        src={pokemon.sprites.front_default} 
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
                                className="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded-full"
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <div className="text-xs text-gray-600">
                        {pokemon.height / 10}m • {pokemon.weight / 10}kg
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
                {pokemon.abilities.map((ability, index) => (
                    <span 
                        key={`${ability.ability.name}-${ability.slot}-${index}`}
                        className="bg-gray-100 text-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full"
                    >
                        {ability.ability.name}
                    </span>
                ))}
            </div>
        </button>
    );
}

