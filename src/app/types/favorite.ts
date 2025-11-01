export interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  addedAt: string;
}

export type FavoritePayload = Omit<FavoritePokemon, "addedAt">;

