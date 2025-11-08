import { NextResponse } from "next/server";
import { fetchPokemonById } from "@/app/services/pokemon.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Validate ID parameter
    const pokemonId = parseInt(id);
    if (isNaN(pokemonId) || pokemonId < 1) {
      return NextResponse.json(
        { 
          error: "Invalid Pokemon ID", 
          message: "Pokemon ID must be a positive number" 
        },
        { status: 400 }
      );
    }

    // Fetch Pokemon data
    const pokemon = await fetchPokemonById(pokemonId);
    
    return NextResponse.json(pokemon);
  } catch (error) {
    console.error('API Error fetching Pokemon:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        return NextResponse.json(
          { 
            error: "Pokemon not found", 
            message: "The requested Pokemon does not exist" 
          },
          { status: 404 }
        );
      }
      
      if (error.message.includes('timeout') || error.message.includes('network')) {
        return NextResponse.json(
          { 
            error: "Service unavailable", 
            message: "Pokemon service is temporarily unavailable" 
          },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: "An unexpected error occurred while fetching Pokemon data" 
      },
      { status: 500 }
    );
  }
}
