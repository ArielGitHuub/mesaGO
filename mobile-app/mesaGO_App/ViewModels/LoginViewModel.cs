using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;
using System.Collections.Generic;
using mesaGO_App.Views; // NECESARIO para reconocer 'AdminPage'

namespace mesaGO_App.ViewModels
{
    public class AdminUser
    {
        public string u { get; set; }
        public string p { get; set; }
    }

    public partial class LoginViewModel : ObservableObject
    {
        [ObservableProperty]
        private string email;

        [ObservableProperty]
        private string password;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private bool hasError;

        private readonly List<AdminUser> _allowedUsers = new List<AdminUser>
        {
            new AdminUser { u = "felipe.boada@mesago.com", p = "1235" },
            new AdminUser { u = "ariel.tejada@mesago.com", p = "1236" },
            new AdminUser { u = "matias.flores@mesago.com", p = "1237" },
            new AdminUser { u = "alexander.valladares@mesago.com", p = "1238" }
        };

        [RelayCommand]
        async Task Login()
        {
            // Limpiamos errores previos
            hasError = false;
            errorMessage = "";
            OnPropertyChanged(nameof(HasError));
            OnPropertyChanged(nameof(ErrorMessage));

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                await Application.Current.MainPage.DisplayAlert("Atención", "Por favor ingresa usuario y contraseña.", "OK");
                return;
            }

            // Verificación
            var user = _allowedUsers.FirstOrDefault(x => x.u.ToLower() == email.ToLower() && x.p == password);

            if (user != null)
            {
                // LOGIN EXITOSO
                await Application.Current.MainPage.DisplayAlert("¡Bienvenido!", $"Hola {user.u}", "Entrar");

                // NAVEGACIÓN ACTIVADA: Te lleva al Dashboard Admin
                await Shell.Current.GoToAsync(nameof(AdminPage));
            }
            else
            {
                // ERROR: Credenciales incorrectas
                await Application.Current.MainPage.DisplayAlert("Error de Acceso", "Credenciales incorrectas. Acceso denegado.", "Intentar de nuevo");
            }
        }

        [RelayCommand]
        async Task GoBack()
        {
            await Shell.Current.GoToAsync("..");
        }
    }
}