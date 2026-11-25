# mesaGO

Sistema de gestión para restaurantes con dos clientes:

| Carpeta | Descripción | Tecnología |
|---|---|---|
| [`mobile-app/`](mobile-app) | App móvil para clientes y administración: menú, carrito, reservaciones, cupones, perfil y panel admin. | .NET MAUI (C#, MVVM con CommunityToolkit.Mvvm), .NET 10 |
| [`web-platform/`](web-platform) | Plataforma web con portal de cliente (menú, reservas, cupones, carrito) y panel de administración (menú, inventario, cupones, notas). | React + TypeScript, Tailwind, lucide-react |
| [`docs/`](docs) | Documentación del proyecto final (Partes 2 y 3). | PDF |

## App móvil

Requiere Visual Studio con la carga de trabajo de .NET MAUI y .NET 10 SDK.

```powershell
cd mobile-app
dotnet build mesaGO_App/mesaGO_App.csproj -f net10.0-android
```

## Plataforma web

Archivos fuente de la interfaz web (`index.html`, `App.tsx`, `pages/`, `services/`). Está pensada para ejecutarse con un bundler como Vite; la clave opcional `API_KEY` (Gemini) se define como variable de entorno y no se incluye en el repositorio.

## Notas

- Proyecto académico. Los usuarios de acceso están definidos de forma local para demostración.
