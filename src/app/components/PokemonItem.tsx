import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/app/types/pokemon";

interface PokemonItemProps {
    pokemon: Pokemon;
}

// este es un server component, se renderiza en el servidor y se envía al cliente
export default function PokemonItem({ pokemon }: PokemonItemProps) {
    return (
        <Link 
            href={`/pokemon/${pokemon.id}`}
            className="w-full bg-white rounded-lg shadow-md p-4 border transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 block hover:shadow-lg hover:scale-105"
            style={{ 
                borderColor: '#feb21a',
                '--tw-ring-color': '#134686'
            } as React.CSSProperties}
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold capitalize" style={{ color: '#134686' }}>
                    {pokemon.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#feb21a', color: '#134686' }}
                    >
                        #{pokemon.id}
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
                                className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: '#ed3f27', color: 'white' }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <div className="text-xs" style={{ color: '#134686' }}>
                        {pokemon.height / 10}m • {pokemon.weight / 10}kg
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
                {pokemon.abilities.map((ability, index) => (
                    <span 
                        key={`${ability.ability.name}-${ability.slot}-${index}`}
                        className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: '#fdf4e3', color: '#134686' }}
                    >
                        {ability.ability.name}
                    </span>
                ))}
            </div>
        </Link>
    );
}

