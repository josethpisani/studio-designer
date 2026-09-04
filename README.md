# Studio Flow

Panel web para gestionar clientes, trabajos de diseño, entregas y avances. Construido con Next.js, TypeScript, Tailwind CSS y Turso (LibSQL).

## Requisitos

- Node.js 20+
- Una base de datos en [Turso](https://turso.tech)

## Desarrollo local

1. Instala dependencias: `npm install`
2. Copia `.env.example` como `.env.local` y completa `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`.
3. Ejecuta `npm run db:migrate` para crear tablas e índices.
4. Ejecuta `npm run dev` y abre `http://localhost:3000`.

Si no defines variables de Turso, el proyecto usa `local.db` únicamente como respaldo local de desarrollo. En producción configura siempre Turso.

## Vercel

Importa el repositorio en Vercel, agrega las dos variables de entorno para Development, Preview y Production, y despliega. La inicialización de tablas se ejecuta automáticamente al atender la primera solicitud; también puedes ejecutar `npm run db:migrate` con las variables configuradas.

## Estructura

- `app/`: páginas y Server Actions CRUD.
- `components/`: navegación, badges y formularios reutilizables.
- `lib/db.ts`: conexión segura server-side a Turso e inicialización del esquema.
- `lib/queries.ts`: consultas del dashboard.
- `lib/types.ts`: estados, prioridades y etiquetas.
- `scripts/migrate.ts`: preparación manual de la base de datos.

El token de Turso solo se lee en el servidor y nunca se expone al navegador. Las relaciones usan claves foráneas e índices; un cliente con actividades no puede eliminarse accidentalmente.
