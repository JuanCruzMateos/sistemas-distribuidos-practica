# Sistemas Distribuidos | FI UNMdP

## Ejercicio Propuesto

Se utilizará la API gratuita **JSONPlaceholder**:

- **Usuarios**: `https://jsonplaceholder.typicode.com/users` → lista de usuarios
- **Publicaciones**: `https://jsonplaceholder.typicode.com/posts?userId=ID` → publicaciones de un usuario

### Objetivos

1. Obtener los **primeros 3 usuarios** desde la API
2. Para cada usuario, obtener sus publicaciones
3. Implementar **dos enfoques**:
   - **(A) Secuencial**
   - **(B) Concurrente** con `Promise.all`

### Salida Esperada

Mostrar en consola:
- **Nombre del usuario**
- **Cantidad de publicaciones** de ese usuario

#### Ejemplo de Salida en Consola

```
--- Ejecución Secuencial ---
Leanne Graham tiene 10 publicaciones
Ervin Howell tiene 10 publicaciones
Clementine Bauch tiene 10 publicaciones

--- Ejecución Paralela ---
Leanne Graham tiene 10 publicaciones
Ervin Howell tiene 10 publicaciones
Clementine Bauch tiene 10 publicaciones
```

### Conceptos a Utilizar

- ✅ **Funciones async/await**
- ✅ **Funciones nativas de JavaScript**
- ✅ **Template strings** (para formar salidas por consola o para la URL)
- ✅ **Conceptos de llamadas a API** vistos en la actividad anterior