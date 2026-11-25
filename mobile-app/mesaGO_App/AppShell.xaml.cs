using mesaGO_App.Views;
using Microsoft.Maui.Controls;

namespace mesaGO_App
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();

            // --- REGISTRO DE RUTAS (Páginas ocultas/sin pestaña) ---

            // 1. Menú (Accedemos desde los botones de la Home)
            Routing.RegisterRoute(nameof(MenuPage), typeof(MenuPage));

            // 2. Login (Accedemos desde el botón "¿Eres Administrador?" en Perfil)
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));

            // 3. Dashboard Admin (Accedemos automáticamente tras un Login exitoso)
            Routing.RegisterRoute(nameof(AdminPage), typeof(AdminPage));
        }
    }
}