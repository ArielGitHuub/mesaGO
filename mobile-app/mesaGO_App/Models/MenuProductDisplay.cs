using CommunityToolkit.Mvvm.ComponentModel;

namespace mesaGO_App.Models
{
    public partial class MenuProductDisplay : ObservableObject
    {
        public MenuItem Item { get; set; }

        [ObservableProperty]
        private int quantity = 1;

        [ObservableProperty]
        private double totalPrice;

        public MenuProductDisplay(MenuItem item)
        {
            Item = item;
            UpdateTotal();
        }

        // Este método se activa automáticamente cuando cambia 'quantity'
        partial void OnQuantityChanged(int value)
        {
            UpdateTotal();
        }

        private void UpdateTotal()
        {
            if (Item != null)
            {
                // CORRECCIÓN: Usamos las variables en minúscula (quantity, totalPrice)
                // Así evitamos errores si Visual Studio se demora en generar las públicas.
                totalPrice = Item.Price * quantity;
            }
        }
    }

    public class Category
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool IsSpecial { get; set; }
    }
}