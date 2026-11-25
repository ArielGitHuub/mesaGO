using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using mesaGO_App.Views; // Necesario para nameof(MenuPage)
using System;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class HomeViewModel : ObservableObject
    {
        [ObservableProperty]
        private string quote;

        private readonly string[] _quotes = new[]
        {
            "Espérate un ratito ñaño… estamos calentando el hornado 😎🐖",
            "Tu hambre ya llegó… vos nomás faltas 😏🍽️",
            "No te me desesperes… estamos pelando el verde 🤏🍌",
            "Cargando saborcito ecuatoriano… pilas que ya sale 😤🔥",
            "Ñañito, ya mismo está… como buen encebollado 🐟🥣",
            "El bolón está siendo amasado con cariño… y sudor 😅🍌",
            "No te vayas… ya estamos arreglando el plato bonito para vos 😌🍛",
            "Estamos viendo si quieres con ají o sin ají...🌶️🤣",
            "Aguanta un chance, que la yapa se demora 💛😅",
            "Ssssh… el cuy recién se está alistando 😴➡️🔥🐹",
            "Escaneando tu antojo… resultado: full hambre 😳🍲",
            "Cargando comida seria… nada de esas pendejaditas 🧐🍛",
            "Ñaño, ya viene tu pedido… ponte pilas nomás 😎💨",
            "Tu dieta llamó… pero no le contestamos 🤫🤣",
            "Ya mismo ñañito… estamos batiendo el juguito pa’ que quede fino 🥤😉",
            "Apagando el fogón… encendiendo tu hambre 🔥😋"
        };

        public HomeViewModel()
        {
            LoadRandomQuote();
        }

        private void LoadRandomQuote()
        {
            var random = new Random();
            int index = random.Next(_quotes.Length);
            Quote = _quotes[index];
        }

        // --- COMANDOS DE NAVEGACIÓN ---

        [RelayCommand]
        async Task GoToMenu()
        {
            // CAMBIO IMPORTANTE: Quitamos las barras "///"
            // Ahora navegamos a la página oculta
            await Shell.Current.GoToAsync(nameof(MenuPage));
        }

        [RelayCommand]
        async Task GoToReservations()
        {
            await Shell.Current.GoToAsync("///ReservationPage");
        }

        [RelayCommand]
        async Task GoToCoupons()
        {
            // Ahora los cupones SÍ tienen pestaña, así que usamos ///
            await Shell.Current.GoToAsync("///CouponsPage");
        }
    }
}