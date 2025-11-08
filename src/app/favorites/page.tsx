"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites, useRemoveFavorite } from "@/app/hooks/useFavorites";

export default function FavoritesPage() {
  const { data: favorites, isLoading, error } = useFavorites();
  const removeFavorite = useRemoveFavorite();

  const handleRemove = (id: number) => {
    if (!removeFavorite.isPending) {
      removeFavorite.mutate(id);
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold" style={{ color: "#134686" }}>
          Tus Pokémon Favoritos
        </h1>
        <p className="mt-2 text-lg" style={{ color: "#134686" }}>
          Administra los pokémon que marcaste como favoritos.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 text-sm font-semibold rounded-md text-white"
          style={{ backgroundColor: "#ed3f27" }}
        >
          Volver a la lista principal
        </Link>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
          {error.message || "No pudimos cargar tus favoritos. Intenta nuevamente."}
        </div>
      )}

      {removeFavorite.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
          {removeFavorite.error.message}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => {
            const isRemoving =
              removeFavorite.isPending && removeFavorite.variables === favorite.id;

            return (
              <article
                key={favorite.id}
                className="bg-white rounded-lg shadow-md border p-4 flex flex-col gap-3"
                style={{ borderColor: "#feb21a" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={favorite.image}
                      alt={favorite.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    <div>
                      <h2 className="text-xl font-semibold capitalize" style={{ color: "#134686" }}>
                        {favorite.name}
                      </h2>
                      <p className="text-sm text-gray-500">{favorite.nickname}</p>
                      <p className="text-sm text-gray-500">{favorite.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {favorite.types.map((type) => (
                          <span
                            key={type}
                            className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: "#ed3f27" }}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/pokemon/${favorite.id}`}
                    className="text-sm font-semibold px-3 py-2 rounded-md text-white"
                    style={{ backgroundColor: "#134686" }}
                  >
                    Ver detalle
                  </Link>
                </div>

                <button
                  onClick={() => handleRemove(favorite.id)}
                  disabled={isRemoving}
                  className={`w-full px-3 py-2 rounded-md text-sm font-semibold text-white transition-colors ${isRemoving ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  {isRemoving ? "Eliminando..." : "Quitar de favoritos"}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-lg" style={{ color: "#134686" }}>
            Todavía no agregaste pokémon a tu lista de favoritos.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Volvé a la lista principal y usa el botón "Agregar a favoritos" para empezar a armarla.
          </p>
        </div>
      )}
    </section>
  );
}

