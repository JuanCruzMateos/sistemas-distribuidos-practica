import fs from "fs/promises";
import path from "path";
import type { FavoritePokemon, FavoritePayload } from "@/app/types/favorite";

const DB_PATH = path.join(process.cwd(), "database.json");

class Database {
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data) as FavoritePokemon[];
    } catch (error) {
      console.error("Error reading database", error);
      throw new Error("Error reading database: " + error);
    }
  }

  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<FavoritePokemon[]> {
    return this.readDB();
  }

  async getById(id: number): Promise<FavoritePokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  async add(favorite: FavoritePayload): Promise<FavoritePokemon> {
    const data = await this.readDB();

    if (data.some((item) => item.id === favorite.id)) {
      throw new Error("FAVORITE_ALREADY_EXISTS");
    }

    const newFavorite: FavoritePokemon = {
      ...favorite,
      addedAt: new Date().toISOString(),
    };

    data.push(newFavorite);
    await this.writeDB(data);

    return newFavorite;
  }

  async remove(id: number): Promise<boolean> {
    const data = await this.readDB();
    const filtered = data.filter((item) => item.id !== id);

    if (filtered.length === data.length) {
      return false;
    }

    await this.writeDB(filtered);
    return true;
  }
}

export const db = new Database();