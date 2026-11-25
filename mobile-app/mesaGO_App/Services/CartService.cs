using mesaGO_App.Models;
using System;
using System.Collections.ObjectModel; // Para listas automáticas
using System.Linq; // Para buscar y sumar

// Resolvemos el conflicto de nombres con el menú de MAUI
using MenuItem = mesaGO_App.Models.MenuItem;

namespace mesaGO_App.Services
{
    public class CartService
    {
        // 1. Patrón Singleton: Hace que el carrito sea "global" (como el Context de React)
        private static CartService _instance;
        public static CartService Instance => _instance ??= new CartService();

        // 2. La lista de compras. ObservableCollection actualiza la pantalla automáticamente.
        public ObservableCollection<CartItem> CartItems { get; private set; } = new ObservableCollection<CartItem>();

        // Evento para avisar cuando cambia el total (útil para actualizar la barra inferior)
        public event Action CartUpdated;

        // Constructor privado para asegurar que solo haya un carrito
        private CartService() { }

        // --- FUNCIONES (Igual que en tu CartContext.tsx) ---

        public void AddToCart(MenuItem item, int quantity = 1)
        {
            var existingItem = CartItems.FirstOrDefault(c => c.Id == item.Id);

            if (existingItem != null)
            {
                // Si ya existe, solo sumamos la cantidad
                existingItem.Quantity += quantity;
            }
            else
            {
                // Si es nuevo, lo convertimos de MenuItem (Inglés) a CartItem (Español)
                CartItems.Add(new CartItem
                {
                    Id = item.Id,
                    Nombre = item.Name,
                    Descripcion = item.Description,
                    Precio = item.Price,
                    Imagen = item.Image,
                    Quantity = quantity
                });
            }

            // Avisamos a la app que el carrito cambió
            CartUpdated?.Invoke();
        }

        public void RemoveFromCart(string id)
        {
            var item = CartItems.FirstOrDefault(c => c.Id == id);
            if (item != null)
            {
                CartItems.Remove(item);
                CartUpdated?.Invoke();
            }
        }

        public void UpdateQuantity(string id, int delta)
        {
            var item = CartItems.FirstOrDefault(c => c.Id == id);
            if (item != null)
            {
                int newQuantity = item.Quantity + delta;

                if (newQuantity > 0)
                {
                    // Truco: Reemplazamos el ítem para forzar la actualización visual en MAUI
                    item.Quantity = newQuantity;
                    int index = CartItems.IndexOf(item);
                    CartItems[index] = item;

                    CartUpdated?.Invoke();
                }
            }
        }

        public void ClearCart()
        {
            CartItems.Clear();
            CartUpdated?.Invoke();
        }

        // --- CÁLCULOS ---

        // Total de platos (ej: 5 ítems)
        public int GetTotalItems()
        {
            return CartItems.Sum(item => item.Quantity);
        }

        // Total a pagar (ej: $15.50)
        public double GetCartTotal()
        {
            return CartItems.Sum(item => item.Precio * item.Quantity);
        }
    }
}