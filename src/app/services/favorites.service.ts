import type { FavoritePayload, FavoritePokemon } from "@/app/types/favorite";

async function handleErrorResponse(response: Response): Promise<never> {
  let message = "Error al procesar la solicitud";

  try {
    const error = await response.json();
    if (typeof error?.error === "string" && error.error.trim() !== "") {
      message = error.error;
    }
  } catch (_) {
    // Ignorar errores al parsear respuesta
  }

  throw new Error(message);
}

export const favoritesService = {
  getAll: async (): Promise<FavoritePokemon[]> => {
    const res = await fetch("/api/favorites", { cache: "no-store" });
    if (!res.ok) {
      await handleErrorResponse(res);
    }
    return res.json();
  },

  add: async (favorite: FavoritePayload): Promise<FavoritePokemon> => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorite),
    });

    if (!res.ok) {
      await handleErrorResponse(res);
    }

    return res.json();
  },

  remove: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favorites/${id}`, { method: "DELETE" });
    if (!res.ok) {
      await handleErrorResponse(res);
    }
  },
};

