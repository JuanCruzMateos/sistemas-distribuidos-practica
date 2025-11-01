# API Routes en Next.js

Las API Routes de Next.js permiten definir endpoints de backend dentro de la misma aplicación, sin levantar un servidor separado. Cada archivo dentro de `app/api/` representa una ruta y expone funciones del lado del servidor que reciben una `Request` y devuelven una `Response`.

## ¿Para qué sirven?

- Crear, leer, actualizar y eliminar datos (CRUD).
- Validar información antes de procesarla.
- Conectar con bases de datos u otros servicios.
- Mantener lógica sensible en el servidor (API keys, tokens, etc.).

## Métodos HTTP frecuentes

- **GET**: Lee datos (ej. listar productos).
- **POST**: Crea un recurso (ej. añadir un producto al catálogo).
- **PATCH**: Actualiza parcialmente (ej. cambiar precio).
- **PUT**: Reemplaza completamente (ej. sobrescribir todos los datos).
- **DELETE**: Elimina (ej. borrar producto por id).

## Principios REST esenciales

- **Recursos**: Cada recurso se identifica con una URL (ej. `/api/products`, `/api/products/25`).
- **Verbos HTTP correctos**: GET para leer, POST para crear, DELETE para eliminar, etc.
- **Stateless**: Cada request es independiente, no se guarda estado entre peticiones.
- **Respuestas consistentes**: Usar códigos estándar (200, 201, 400, 404, 500...).

## Crear una API Route básica

```ts
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Lista de productos" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Producto creado", data: body });
}
```

Cada función exportada (`GET`, `POST`, `PATCH`, `DELETE`, etc.) representa el handler para ese método HTTP.

## Validar el cuerpo de la request

```ts
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name y price" },
        { status: 400 }
      );
    }

    if (typeof body.price !== "number" || body.price <= 0) {
      return NextResponse.json(
        { error: "price debe ser un número mayor a 0" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Producto creado exitosamente", data: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
```

## Parámetros dinámicos en rutas

```ts
// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json(
      { error: "El ID debe ser un número válido" },
      { status: 400 }
    );
  }

  // ... lógica para eliminar

  return NextResponse.json(
    { message: `Producto ${id} eliminado` },
    { status: 200 }
  );
}
```

## Simular una base de datos con JSON

Creamos una clase `Database` que persiste la información en `database.json`.

```ts
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
      return [];
    }
  }

  private async writeDB(data: Product[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<Product[]> {
    return this.readDB();
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
    const filtered = data.filter((item) => item.id !== id);

    if (filtered.length === data.length) {
      return false;
    }

    await this.writeDB(filtered);
    return true;
  }

  async update(
    id: number,
    updates: Partial<Omit<Product, "id" | "createdAt">>
  ): Promise<Product | null> {
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
```

> **Nota**: `fs` solo funciona en el servidor. No importes esta clase en componentes cliente.

Inicializa el archivo `database.json` en la raíz del proyecto con `[]`:

```json
[]
```

## Endpoints completos de ejemplo

### GET `/api/products`

```ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function GET() {
  try {
    const products = await db.getAll();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
```

### POST `/api/products`

```ts
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price || body.stock === undefined) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name, price, stock" },
        { status: 400 }
      );
    }

    if (body.price <= 0) {
      return NextResponse.json(
        { error: "El precio debe ser mayor a 0" },
        { status: 400 }
      );
    }

    const newProduct = await db.create({
      name: body.name,
      price: body.price,
      description: body.description || "",
      stock: body.stock,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}
```

### DELETE `/api/products/[id]`

```ts
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const deleted = await db.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Producto eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 }
    );
  }
}
```

## Integración con TanStack Query

Cadena completa: **UI → TanStack Query → Service → API Route → Database**.

### Estructura sugerida

```text
app/
├─ api/
│  └─ products/
│     ├─ route.ts
│     └─ [id]/route.ts
├─ lib/
│  └─ database.ts
├─ services/
│  └─ products.service.ts
└─ hooks/
   └─ useProducts.ts
```

### Service

```ts
// app/services/products.service.ts
import { Product } from "@/app/lib/database";

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
  },

  create: async (product: {
    name: string;
    price: number;
    description: string;
    stock: number;
  }): Promise<Product> => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al crear producto");
    }

    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar producto");
  },
};
```

### Hooks con TanStack Query

```ts
// app/hooks/useProducts.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/app/services/products.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsService.getAll,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
```

### Componente UI

```tsx
// app/components/ProductItem.tsx
"use client";

import { useDeleteProduct } from "@/app/hooks/useProducts";

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
  };
}

export function ProductItem({ product }: ProductItemProps) {
  const deleteMutation = useDeleteProduct();

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de eliminar ${product.name}?`)) {
      deleteMutation.mutate(product.id);
    }
  };

  const isLoading = deleteMutation.isPending;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock} unidades</p>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Eliminando..." : "🗑️ Eliminar"}
      </button>
      {deleteMutation.isError && <p>Error: {deleteMutation.error.message}</p>}
    </div>
  );
}
```

### Flujo completo (DELETE)

1. El usuario hace clic en el botón del componente `ProductItem`.
2. Se ejecuta `handleDelete()` y lanza la mutación.
3. TanStack Query invoca `productsService.delete`.
4. El servicio llama a `/api/products/[id]` con `DELETE`.
5. La API Route valida el parámetro, usa `db.delete()` y devuelve una respuesta.
6. La mutación marca éxito y llama a `invalidateQueries`.
7. La UI se refresca automáticamente con la lista actualizada.

Roles claros en el flujo:

- **UI**: Interacción del usuario.
- **Hooks**: Estado y sincronización con el servidor.
- **Services**: Encapsulan las llamadas HTTP.
- **API Routes**: Validan y procesan peticiones.
- **Database**: Abstrae la persistencia.

## Ejercicio propuesto

1. **Simular base de datos**
   - Implementar la clase `Database` en `app/lib/database.ts`.
   - Crear `database.json` en la raíz con `[]`.

2. **API de favoritos**
   - Implementar `POST /api/favorites` para agregar un pokémon.
   - Implementar `DELETE /api/favorites/[id]` para eliminarlo.
   - Incluir validaciones y códigos HTTP apropiados (`201`, `400`, `404`, `409`, `500`).

3. **Capa de servicios**
   - Crear `app/services/favorites.service.ts` con funciones `add` y `remove`.

4. **Hooks con TanStack Query**
   - Definir `app/hooks/useFavorites.ts` con `useAddFavorite` y `useRemoveFavorite`.
   - Invalidar la query de favoritos al completarse las mutaciones.

5. **Modificar la lista de Pokémons**
   - Añadir botón para agregar/quitar de favoritos.
   - Cambiar apariencia del botón según estado.
   - Mostrar loaders y manejar errores.

6. **(Opcional) Página de favoritos**
   - Crear `/favorites` para listar solo los pokémons marcados.
   - Usar `useFavorites()` para obtener la data.
   - Permitir eliminar desde esta vista.