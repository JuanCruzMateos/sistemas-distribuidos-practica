import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

interface FavoriteRequestBody {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export async function GET() {
  try {
    const favorites = await db.getAll();
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error retrieving favorites", error);
    return NextResponse.json(
      { error: "Error al obtener favoritos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<FavoriteRequestBody> = await request.json();
    const { id, name, image, types } = body;

    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      id <= 0 ||
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof image !== "string" ||
      image.trim() === "" ||
      !Array.isArray(types) ||
      types.length === 0 ||
      !types.every((type) => typeof type === "string" && type.trim() !== "")
    ) {
      return NextResponse.json(
        { error: "Datos inválidos: se requiere id, name, image y types" },
        { status: 400 }
      );
    }

    const favorite = await db.add({
      id,
      name: name.trim(),
      image: image.trim(),
      types: types.map((type) => type.trim()),
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "FAVORITE_ALREADY_EXISTS") {
      return NextResponse.json(
        { error: "El pokémon ya está en favoritos" },
        { status: 409 }
      );
    }

    console.error("Error creating favorite", error);

    return NextResponse.json(
      { error: "Error al agregar a favoritos" },
      { status: 500 }
    );
  }
}

