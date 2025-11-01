"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/app/services/favorites.service";
import type { FavoritePayload, FavoritePokemon } from "@/app/types/favorite";

export function useFavorites() {
  return useQuery<FavoritePokemon[], Error>({
    queryKey: ["favorites"],
    queryFn: favoritesService.getAll,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation<FavoritePokemon, Error, FavoritePayload>({
    mutationFn: favoritesService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: favoritesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
