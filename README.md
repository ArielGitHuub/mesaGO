<div align="center">

# mesaGO

### La Sazón de la Negra — Ecosistema digital para restaurantes

**Versión móvil · .NET MAUI** 📱

*mesaGO es el nombre profesional del proyecto "La Sazón de la Negra" (LSZN).*

![.NET MAUI](https://img.shields.io/badge/.NET%20MAUI-10.0-512BD4?logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-MVVM-239120?logo=csharp&logoColor=white)
![Plataformas](https://img.shields.io/badge/Android%20%7C%20iOS%20%7C%20macOS%20%7C%20Windows-lightgrey)
![Estado](https://img.shields.io/badge/Proyecto-acad%C3%A9mico-f36b01)

</div>

---

## 📖 Descripción

**mesaGO** es una solución de transformación digital para el restaurante ecuatoriano **"La Sazón de la Negra"**, ubicado en Quito. Automatiza reservas, inventario y atención al cliente mediante un ecosistema multiplataforma:

| Componente | Rol | Tecnología |
|---|---|---|
| 📱 **App móvil para clientes** *(este repositorio)* | Menú visual, carrito, reservas con mapa de mesas, cupones y perfil | **.NET MAUI** |
| 🖥️ **Plataforma web administrativa (MVC)** | Dashboard, inventario, cupones, clientes y reservas | **ASP.NET Core MVC**, EF Core, SQLite |

> ### ⚠️ Importante: esta es la versión MAUI
> Este repositorio contiene principalmente la **versión móvil (.NET MAUI)**, que es la parte desarrollada por **Ariel Tejada**.
> Del proyecto existe además una **versión web en ASP.NET Core MVC**, mantenida en el repositorio del equipo:
> **[Fe14lipe/La-Saz-n-de-la-Negra](https://github.com/Fe14lipe/La-Saz-n-de-la-Negra)**.

---

## 🎯 Objetivos

**General:** desarrollar una solución tecnológica integral (web administrativa + app móvil) que permita al restaurante automatizar sus procesos críticos, maximizar la eficiencia operativa y elevar la calidad del servicio.

**Específicos**
1. **Digitalizar el control de reservas** con agendamiento validado (10:00 – 19:00) para optimizar la ocupación y evitar sobreventa.
2. **Automatizar la gestión de inventario**, descontando ingredientes según el consumo.
3. **Potenciar la fidelización** con una app móvil de perfil, menú visual y cupones exclusivos.
4. **Centralizar la inteligencia de negocio** con un dashboard de métricas clave.

---

## ✨ Funcionalidades de la app móvil

- 🔐 **Autenticación:** inicio de sesión y registro de clientes (nombre, correo, teléfono, contraseña) y acceso diferenciado al panel de administración.
- 🏠 **Inicio:** saludo personalizado, platos populares y secciones destacadas.
- 🍽️ **Menú:** catálogo por categorías (ceviches, empanadas, ensaladas, sopas, postres, etc.) con descripción, ingredientes y precio.
- 🛒 **Carrito:** agregar/quitar platos y ver el total.
- 📅 **Reservas:**
  - selección de fecha y hora (horario de atención 10:00 – 19:00),
  - número de personas,
  - confirmación de datos (duración máxima de 2 horas),
  - **mapa de mesas** del local con estados *disponible / ocupada / seleccionada*,
  - botón **"Cómo llegar"** con la ubicación del restaurante.
- 🎟️ **Cupones:** beneficios por tipo (feriado, tienda, delivery, automático).
- 👤 **Perfil** del cliente.
- 🛠️ **Panel de administración** accesible para usuarios autorizados.

---

## 🏗️ Arquitectura

La app sigue el patrón **MVVM** con [CommunityToolkit.Mvvm](https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/) y navegación con **Shell**.

```
mobile-app/mesaGO_App/
├── Models/        Entidades: MenuItem, CartItem, Coupon, MenuSection, modelos de admin
├── Views/         Páginas XAML: Login, Home, Menu, Cart, Reservation, Coupons, Profile, Admin
├── ViewModels/    Lógica de presentación por pantalla (MVVM)
├── Services/      CartService, MenuService
├── Platforms/     Código específico: Android, iOS, MacCatalyst, Windows
├── Resources/     Fuentes, imágenes, estilos y colores
├── App.xaml       Recursos globales
├── AppShell.xaml  Navegación por pestañas (Inicio, Cupones, Carrito, Reservas, Perfil)
└── MauiProgram.cs Configuración e inyección de dependencias
```

> **Nota:** en este repositorio la app funciona con **datos locales de demostración** (por ejemplo, el menú está definido en `MenuService`). La integración con la base de datos compartida del sistema MVC se describe en la documentación del proyecto.

---

## 🛠️ Stack tecnológico

| Área | Herramientas |
|---|---|
| App móvil | .NET MAUI (.NET 10), C#, XAML, CommunityToolkit.Mvvm |
| Plataforma web (MVC) | ASP.NET Core MVC, Razor, Chart.js, Entity Framework Core, SQLite |
| Mapas | Leaflet.js (web) · mapas/ubicación nativos (móvil) |
| IA y servicios | Pollinations.ai y Gemini (imágenes y descripciones de platos), Nager.Date (feriados → cupones) |

---

## 🚀 Cómo ejecutar la app móvil

**Requisitos**
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- Visual Studio 2022/2026 con la carga de trabajo **".NET Multi-platform App UI development"**
- Emulador de Android o dispositivo, o Windows 10/11 para ejecutarla como app de escritorio

**Pasos**

```bash
git clone https://github.com/ArielGitHuub/mesaGO.git
cd mesaGO/mobile-app
```

1. Abre `mesaGO_App.slnx` en Visual Studio.
2. Elige el destino de ejecución (Android Emulator, Windows Machine, etc.).
3. Presiona **F5**.

También por línea de comandos:

```bash
dotnet build mesaGO_App/mesaGO_App.csproj -f net10.0-android
```

---

## 🗂️ Estructura del repositorio

| Carpeta | Contenido |
|---|---|
| [`mobile-app/`](mobile-app) | **App móvil .NET MAUI** (proyecto principal) |
| [`web-platform/`](web-platform) | Prototipo de interfaz web en React + TypeScript (cliente y administración), complementario a la versión MVC |
| [`docs/`](docs) | Entregables académicos: Partes 1, 2-3 y 4 |

---

## 📚 Documentación

- [Parte 1 — Pitch del proyecto](docs/Proyecto-Final-Parte-1.pdf)
- [Partes 2 y 3 — Tema, objetivos, contextualización, implementación y capturas](docs/Proyecto-Final-Parte-2-y-3.pdf)
- [Parte 4 — Presentación final](docs/Proyecto-Final-Parte-4.pdf)

---

## 👥 Equipo

Proyecto desarrollado para el curso **ISWZ2103 – Programación**, Ingeniería en Software, **Universidad de las Américas (UDLA)**, Quito – Ecuador.
Profesor: PhD (c). Luis Fernando Aguas Bucheli.

| Integrante | Contribución |
|---|---|
| Felipe Boada | Equipo de desarrollo |
| Matías Flores | Equipo de desarrollo |
| **Ariel Tejada** | **Desarrollo de la app móvil (.NET MAUI)** |
| Alexander Valladares | Equipo de desarrollo |
| Cristian Lopez | Equipo de desarrollo (Parte 4) |

---

## 📄 Licencia

Proyecto académico sin licencia de uso comercial. Todos los derechos reservados por sus autores.
