¿Qué son las API Routes?

En Next.js, las API Routes nos permiten crear endpoints de backend directamente dentro de nuestra aplicación. Es decir, podemos construir nuestra propia API sin necesidad de un servidor separado. Estos endpoints se crean como archivos dentro de la carpeta app/api/, y cada archivo representa una ruta de la API.

Las API Routes son funciones del lado del servidor que reciben una Request y devuelven una Response. Esto nos permite:

Crear, leer, actualizar y eliminar datos (CRUD).
Validar datos antes de procesarlos.
Conectar con bases de datos.
Mantener lógica sensible en el servidor (API keys, tokens, etc.).
Métodos HTTP: El lenguaje de las APIs REST

Cuando trabajamos con APIs, utilizamos diferentes métodos HTTP para indicar qué tipo de operación queremos realizar. Los más comunes son:

GET: Obtener/leer datos. No modifica nada en el servidor.
Ejemplo: Traer la lista de productos de una tienda.
POST: Crear un nuevo recurso.
Ejemplo: Agregar un nuevo producto al catálogo.
PATCH: Actualizar parcialmente un recurso existente.
Ejemplo: Cambiar solo el precio de un producto.
PUT: Reemplazar completamente un recurso existente.
Ejemplo: Actualizar todos los datos de un producto.
DELETE: Eliminar un recurso.
Ejemplo: Eliminar un producto del catálogo.
Arquitectura REST

REST (Representational State Transfer) es un estilo de arquitectura para diseñar APIs. Los principios básicos son:

Recursos: Todo es un recurso identificable por una URL.
/api/products → colección de productos
/api/products/25 → producto específico con id 25
Métodos HTTP: Usamos los verbos HTTP correctos para cada acción.
GET /api/products → lista todos
POST /api/products → crea uno nuevo
DELETE /api/products/25 → elimina el id 25
Stateless: Cada petición es independiente, no guarda estado entre requests.
Respuestas consistentes: Usamos códigos de estado HTTP estándar.
200: OK
201: Created
400: Bad Request
404: Not Found
500: Internal Server Error
Crear una API Route en Next.js

Estructura básica

// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Lógica para obtener datos
  return NextResponse.json({ message: "Lista de productos" });
}

export async function POST(request: Request) {
  // Lógica para crear un recurso
  const body = await request.json();
  return NextResponse.json({ message: "Producto creado", data: body });
}


Cada función exportada (GET, POST, PATCH, DELETE) representa un método HTTP que ese endpoint puede manejar.

Recibir y validar el body

Cuando recibimos datos del cliente (por ejemplo, en un POST), debemos:

Parsear el body de la request.
Validar que los datos sean correctos.
Devolver un error si algo falla.
 
typescript
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validación simple
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

    // Si todo está bien, procesamos
    // ... lógica para guardar
    
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


Recibir y validar parámetros dinámicos

Para crear rutas con parámetros (como /api/products/25), creamos una carpeta con corchetes:


 
typescript
// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  // Validar el parámetro
  if (isNaN(id)) {
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


Simulando una base de datos con JSON

Como todavía no estamos trabajando con bases de datos reales, vamos a crear una clase que abstraiga esa funcionalidad y guarde los datos en un archivo JSON.

Crear la clase Database


 
typescript
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


Nota importante: El módulo fs solo funciona en el servidor, nunca en el cliente. Por eso esta clase solo se importa y usa dentro de las API Routes.

Inicializar el archivo database.json

Crear manualmente en la raíz del proyecto:


 
json
[]


Implementar los endpoints completos

GET - Obtener todos los productos


 
typescript
// app/api/products/route.ts
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


POST - Crear un producto


 
typescript
// app/api/products/route.ts (continuación)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones
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


DELETE - Eliminar un producto


 
typescript
// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
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


Integración con el frontend usando TanStack Query

Ahora vamos a conectar todo: el usuario hace una acción → TanStack Query (mutation) → Service → API Route → Database.

Estructura de carpetas recomendada


 
app/
├── api/
│   └── products/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
├── lib/
│   └── database.ts
├── services/
│   └── products.service.ts
└── hooks/
    └── useProducts.ts


Crear el servicio


 
typescript
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
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar producto");
  },
};


Crear los hooks con TanStack Query


 
typescript
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
      // Invalida la cache para refrescar la lista
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


Usar los hooks en un componente


 
typescript
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


El flujo completo: De la UI a la base de datos

Este es el recorrido que hace una petición cuando el usuario hace clic en "Eliminar producto":

Usuario hace clic en el botón dentro del componente ProductItem.
Se ejecuta handleDelete que llama a deleteMutation.mutate().
TanStack Query ejecuta la función definida en mutationFn, que es productsService.delete().
El servicio hace un fetch a /api/products/[id] con método DELETE.
La API Route (app/api/products/[id]/route.ts) recibe la petición:
Valida el parámetro id.
Llama a db.delete() para eliminar del JSON.
La clase Database lee el archivo database.json, filtra el elemento y lo escribe de vuelta.
La API Route devuelve una respuesta exitosa con status 200.
El servicio parsea la respuesta y la devuelve.
TanStack Query recibe el éxito y ejecuta onSuccess, que invalida la cache.
El componente se re-renderiza mostrando la lista actualizada sin el producto eliminado.
Este flujo respeta la arquitectura REST y separa claramente las responsabilidades:

UI: Maneja la interacción del usuario.
Hooks: Gestionan el estado y la sincronización con el servidor.
Services: Encapsulan las llamadas HTTP.
API Routes: Validan y procesan las peticiones.
Database: Abstrae la persistencia de datos.
Ejercicio propuesto

Modificación de la actividad anterior para:

Crear la estructura de base de datos simulada:
Implementar la clase Database en app/lib/database.ts.
Crear el archivo database.json en la raíz del proyecto inicializado con [].
Crear las API Routes:
POST /api/favorites para agregar un pokémon a favoritos.
DELETE /api/favorites/[id] para eliminarlo.
Incluir validaciones apropiadas en ambos endpoints.
Usar códigos de estado HTTP correctos (201, 400, 404, 409, 500).
Crear la capa de servicios:
Archivo app/services/favorites.service.ts con las funciones add y remove.
Crear los hooks de TanStack Query:
Archivo app/hooks/useFavorites.ts con useAddFavorite y useRemoveFavorite.
Ambos hooks deben invalidar la query de favoritos al completarse.
Modificar el componente de lista de Pokémons:
Agregar un botón en cada item de la lista para agregar/quitar de favoritos.
El botón debe cambiar su apariencia según si el pokémon ya está en favoritos.
Mostrar un estado de carga mientras se procesa la petición.
Manejar y mostrar errores si algo falla.
(Opcional) Crear una página de favoritos:
Una nueva ruta /favorites que muestre solo los pokémons favoritos.
Usar el hook useFavorites() para obtener la lista.
Incluir la opción de eliminar desde esta vista también.