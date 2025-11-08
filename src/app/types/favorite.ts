export interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  addedAt: string;
  nickname: string;
  description: string;
}

export type FavoritePayload = Omit<FavoritePokemon, "addedAt">;

