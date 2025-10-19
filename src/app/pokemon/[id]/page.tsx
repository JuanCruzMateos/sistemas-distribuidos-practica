import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/app/types/pokemon";
import { notFound } from "next/navigation";

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getPokemonById(id: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Pokemon not found
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json() as Promise<Pokemon>;
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    return null;
  }
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = await params;
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg shadow-md transition-colors"
          style={{ backgroundColor: '#feb21a', color: '#134686' }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Return to Main List
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 text-white" style={{ background: `linear-gradient(to right, #134686, #ed3f27)` }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <p className="text-xl opacity-90">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">Base Experience</p>
              <p className="text-2xl font-bold">{pokemon.base_experience}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="text-center">
                {pokemon.sprites.other?.["official-artwork"]?.front_default ? (
                  <Image
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                ) : pokemon.sprites.front_default ? (
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(pokemon.height / 10).toFixed(1)}m
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#134686' }}>Types</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-4 py-2 rounded-full font-medium capitalize"
                      style={{ backgroundColor: '#ed3f27', color: 'white' }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#134686' }}>Abilities</h3>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability, index) => (
                    <div
                      key={`${ability.ability.name}-${ability.slot}-${index}`}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: '#fdf4e3' }}
                    >
                      <span className="capitalize font-medium" style={{ color: '#134686' }}>
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                      {ability.is_hidden && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: '#feb21a', color: '#134686' }}
                        >
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#134686' }}>Base Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center justify-between">
                      <span className="capitalize font-medium" style={{ color: '#134686' }}>
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 rounded-full h-2" style={{ backgroundColor: '#fdf4e3' }}>
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              backgroundColor: '#ed3f27',
                              width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold w-8 text-right" style={{ color: '#134686' }}>
                          {stat.base_stat}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
