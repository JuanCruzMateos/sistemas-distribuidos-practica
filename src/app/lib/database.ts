// app/lib/database.ts
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    createdAt: string;
}

class Database {
    private async readDB(): Promise<Product[]> {
        try {
            const data = await fs.readFile(DB_PATH, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, devolver array vacío
            return [];
        }
    }

    private async writeDB(data: Product[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async getAll(): Promise<Product[]> {
        return await this.readDB();
    }

    async getById(id: number): Promise<Product | undefined> {
        const data = await this.readDB();
        return data.find((item) => item.id === id);
    }

    async create(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
        const data = await this.readDB();
        const newProduct: Product = {
            id: data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1,
            ...product,
            createdAt: new Date().toISOString(),
        };
        data.push(newProduct);
        await this.writeDB(data);
        return newProduct;
    }

    async delete(id: number): Promise<boolean> {
        const data = await this.readDB();
        const initialLength = data.length;
        const filtered = data.filter((item) => item.id !== id);

        if (filtered.length === initialLength) {
            return false; // No se encontró el elemento
        }

        await this.writeDB(filtered);
        return true;
    }

    async update(id: number, updates: Partial<Omit<Product, "id" | "createdAt">>): Promise<Product | null> {
        const data = await this.readDB();
        const index = data.findIndex((item) => item.id === id);

        if (index === -1) {
            return null;
        }

        data[index] = { ...data[index], ...updates };
        await this.writeDB(data);
        return data[index];
    }
}

export const db = new Database();