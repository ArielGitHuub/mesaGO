using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class ProfileViewModel : ObservableObject
    {
        [ObservableProperty]
        private string userName = "Ariel";

        [ObservableProperty]
        private string userEmail = "arielgtejada@hotmail.com";

        [ObservableProperty]
        private string appVersion = "Versión 3.8.12";

        [RelayCommand]
        async Task Logout()
        {
            await Application.Current.MainPage.DisplayAlert("Cerrar Sesión", "Has cerrado sesión correctamente.", "OK");
        }

        [RelayCommand]
        async Task NavigateToOption(string option)
        {
            await Application.Current.MainPage.DisplayAlert("Opción", $"Navegando a: {option}", "OK");
        }

        [RelayCommand]
        async Task AdminLogin()
        {
            // Aquí navegaremos a la página de Login
            // Asegúrate de que crearemos LoginPage.xaml y la registraremos en AppShell.xaml.cs
            await Shell.Current.GoToAsync("LoginPage");
        }
    }
}