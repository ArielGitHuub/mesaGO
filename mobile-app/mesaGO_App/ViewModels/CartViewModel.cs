using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using mesaGO_App.Models;
using mesaGO_App.Services;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class CartViewModel : ObservableObject
    {
        // Esta sí la usamos con Mayúscula porque la definimos manualmente aquí abajo
        public ObservableCollection<CartItem> CartItems => CartService.Instance.CartItems;

        [ObservableProperty]
        private double cartTotal;

        [ObservableProperty]
        private double deliveryFee = 2.69;

        [ObservableProperty]
        private double grandTotal;

        [ObservableProperty]
        private bool hasItems;

        [ObservableProperty]
        private bool isEmpty;

        public CartViewModel()
        {
            CartService.Instance.CartUpdated += RecalculateTotals;
            RecalculateTotals();
        }

        private void RecalculateTotals()
        {
            // CORRECCIÓN: Usamos las variables privadas (minúsculas) para evitar errores
            hasItems = CartItems.Count > 0;
            isEmpty = !hasItems;

            cartTotal = CartService.Instance.GetCartTotal();

            // Usamos 'deliveryFee' y 'cartTotal' en minúscula
            grandTotal = hasItems ? (cartTotal + deliveryFee) : 0;
        }

        // --- COMANDOS ---

        [RelayCommand]
        void IncreaseQty(CartItem item)
        {
            CartService.Instance.UpdateQuantity(item.Id, 1);
        }

        [RelayCommand]
        void DecreaseQty(CartItem item)
        {
            CartService.Instance.UpdateQuantity(item.Id, -1);
        }

        [RelayCommand]
        void RemoveItem(CartItem item)
        {
            CartService.Instance.RemoveFromCart(item.Id);
        }

        [RelayCommand]
        async Task GoToMenu()
        {
            await Shell.Current.GoToAsync("///MenuPage");
        }

        [RelayCommand]
        async Task Checkout()
        {
            // Aquí usamos la mayúscula (GrandTotal) para mostrar, o la minúscula, da igual en lectura.
            await Application.Current.MainPage.DisplayAlert("Pago", $"Procesando pago de ${grandTotal:F2}", "OK");
        }
    }
}