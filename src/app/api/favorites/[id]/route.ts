import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const removed = await db.remove(parseInt(id as string));

    if (!removed) {
      return NextResponse.json(
        { error: "Pokémon no encontrado en favoritos" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pokémon eliminado de favoritos" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite", error);
    return NextResponse.json(
      { error: "Error al eliminar de favoritos" },
      { status: 500 }
    );
  }
}

