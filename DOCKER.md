# Docker Setup Guide

Esta guía explica cómo ejecutar tu aplicación Next.js usando Docker con un Dockerfile y docker-compose simplificados.

## Requisitos

- Docker instalado en tu máquina
- Docker Compose instalado (generalmente viene con Docker Desktop)

## Inicio Rápido

```bash
# Construir y ejecutar el contenedor
docker-compose up --build

# O ejecutar en segundo plano (detached)
docker-compose up -d --build

# Detener el contenedor
docker-compose down
```

La aplicación estará disponible en `http://localhost:3000`

## Arquitectura Docker

### Dockerfile

El proyecto usa una imagen Node 20 Alpine (ligera y segura) con las siguientes características:

- **Base Image:** `node:20-alpine3.20`
- **Parches de seguridad:** `apk update && apk upgrade` aplicados
- **Dependencias:** Instaladas con `npm ci` para reproducibilidad
- **Build:** Next.js optimizado con standalone output
- **Puerto:** 3000

### docker-compose.yml

Configuración simple con:
- Puerto 3000 mapeado al host
- Volumen para persistir `database.json`
- Reinicio automático del contenedor

## Comandos de Docker

### Usando Docker Compose (Recomendado)

```bash
# Iniciar la aplicación
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener contenedores
docker-compose down

# Reconstruir sin caché
docker-compose build --no-cache

# Ver estado de contenedores
docker-compose ps
```

### Comandos Docker Directos

```bash
# Construir la imagen
docker build -t mi-proyecto .

# Ejecutar el contenedor
docker run -p 3000:3000 -v $(pwd)/database.json:/app/database.json mi-proyecto

# Listar contenedores en ejecución
docker ps

# Ver logs de un contenedor
docker logs <container_id>

# Detener un contenedor
docker stop <container_id>
```

## Gestión de Contenedores

```bash
# Listar todos los contenedores (incluyendo detenidos)
docker ps -a

# Eliminar un contenedor
docker rm <container_id>

# Eliminar la imagen
docker rmi mi-proyecto

# Acceder al shell del contenedor
docker-compose exec app sh

# Ejecutar comandos dentro del contenedor
docker-compose exec app npm run lint
```

## Solución de Problemas

### Puerto 3000 Ya Está en Uso

Si el puerto 3000 ya está ocupado, modifica `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambia 3001 por el puerto que prefieras
```

### Base de Datos No Persiste

Asegúrate de que el archivo `database.json` existe antes de ejecutar:

```bash
touch database.json
echo "{}" > database.json
```

### Problemas con node_modules

Si encuentras problemas con node_modules, reconstruye sin caché:

```bash
docker-compose build --no-cache
```

### Problemas de Permisos (Linux)

En Linux, podrías necesitar ajustar los permisos:

```bash
sudo chown -R $USER:$USER database.json
```

### Ver Logs Detallados

Para debugging, ver los logs completos:

```bash
docker-compose logs -f --tail=100
```

## Variables de Entorno

Puedes agregar variables de entorno en `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://api.example.com
      - DATABASE_PATH=/app/database.json
```

O crear un archivo `.env`:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://api.example.com
```

Y referenciarlo en docker-compose.yml:

```yaml
services:
  app:
    env_file:
      - .env
```

## Optimización y Rendimiento

### Usar BuildKit

Habilita Docker BuildKit para builds más rápidos:

```bash
DOCKER_BUILDKIT=1 docker build -t mi-proyecto .
```

### Caché de Capas

El Dockerfile está optimizado para aprovechar el caché:
1. Las dependencias se instalan primero (cambian poco)
2. El código fuente se copia después (cambia frecuentemente)

### Limpieza Regular

Limpia recursos no utilizados regularmente:

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes sin usar
docker image prune

# Limpieza completa (cuidado!)
docker system prune -a

# Eliminar volúmenes sin usar
docker volume prune
```

## Despliegue

### Subir a Docker Registry

```bash
# Construir la imagen
docker build -t mi-proyecto .

# Tag la imagen
docker tag mi-proyecto:latest tu-usuario/mi-proyecto:latest

# Subir a Docker Hub
docker login
docker push tu-usuario/mi-proyecto:latest
```

### Desplegar en Plataformas Cloud

#### Docker Hub
```bash
docker tag mi-proyecto:latest tuusuario/mi-proyecto:latest
docker push tuusuario/mi-proyecto:latest
```

#### AWS ECR
```bash
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
docker tag mi-proyecto:latest aws_account_id.dkr.ecr.region.amazonaws.com/mi-proyecto:latest
docker push aws_account_id.dkr.ecr.region.amazonaws.com/mi-proyecto:latest
```

#### Google Container Registry
```bash
docker tag mi-proyecto:latest gcr.io/project-id/mi-proyecto:latest
docker push gcr.io/project-id/mi-proyecto:latest
```

### Desplegar con Docker Compose en Servidor

1. Copia `docker-compose.yml` y `Dockerfile` a tu servidor
2. Ejecuta:
   ```bash
   docker-compose up -d --build
   ```

## Seguridad

### Vulnerabilidades

El proyecto incluye medidas de seguridad:

- ✅ Imagen base actualizada (`node:20-alpine3.20`)
- ✅ Parches de seguridad del sistema (`apk upgrade`)
- ✅ Dependencias npm actualizadas
- ✅ Puerto no privilegiado (3000)

Para escanear vulnerabilidades:

```bash
# Usando Docker Scout
docker scout quickview mi-proyecto

# Ver detalles de CVEs
docker scout cves mi-proyecto
```

### Mejores Prácticas

1. **No incluir secrets en la imagen:** Usa variables de entorno
2. **Mantener la imagen actualizada:** Reconstruye regularmente
3. **Usar .dockerignore:** Ya incluido en el proyecto
4. **Montar database.json como volumen:** Para persistencia segura

## Estructura de Archivos

```
.
├── Dockerfile           # Definición de la imagen
├── docker-compose.yml   # Orquestación de contenedores
├── .dockerignore       # Archivos excluidos del build
└── DOCKER.md          # Esta documentación
```

## Multi-plataforma

Para construir imágenes para diferentes arquitecturas:

```bash
# Configurar buildx
docker buildx create --use

# Construir para múltiples plataformas
docker buildx build --platform linux/amd64,linux/arm64 -t mi-proyecto:latest .
```

## Recursos Adicionales

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [Alpine Linux](https://alpinelinux.org/)

## Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Reconstruye sin caché: `docker-compose build --no-cache`
4. Consulta esta documentación

Para más información sobre la aplicación, consulta el `README.md` principal.
