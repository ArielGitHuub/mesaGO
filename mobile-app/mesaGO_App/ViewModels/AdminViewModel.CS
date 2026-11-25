using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using mesaGO_App.Models;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class AdminViewModel : ObservableObject
    {
        // Métricas
        [ObservableProperty]
        private string totalSales = "$1,245.00";

        [ObservableProperty]
        private string dishesSold = "84";

        [ObservableProperty]
        private int lowStockCount;

        // Listas
        public ObservableCollection<Ingrediente> LowStockItems { get; set; } = new ObservableCollection<Ingrediente>();
        public ObservableCollection<SalesData> WeeklySales { get; set; } = new ObservableCollection<SalesData>();

        public AdminViewModel()
        {
            LoadData();
        }

        private void LoadData()
        {
            // 1. Cargar Alertas de Stock (Simulado)
            LowStockItems.Clear();
            LowStockItems.Add(new Ingrediente { Id = 1, Nombre = "Tomate Riñón", StockMinimo = 10, StockActual = 4, Unidad = "kg" });
            LowStockItems.Add(new Ingrediente { Id = 2, Nombre = "Queso Mozzarella", StockMinimo = 5, StockActual = 2, Unidad = "bloques" });
            LowStockItems.Add(new Ingrediente { Id = 3, Nombre = "Harina de Maíz", StockMinimo = 20, StockActual = 8, Unidad = "lb" });

            LowStockCount = LowStockItems.Count;

            // 2. Cargar Datos del Gráfico
            var rawData = new[]
            {
                new { d="Lun", v=400 }, new { d="Mar", v=300 }, new { d="Mie", v=200 },
                new { d="Jue", v=278 }, new { d="Vie", v=189 }, new { d="Sab", v=239 }, new { d="Dom", v=349 }
            };

            // Calcular altura de barras (Escalado para que quepa en 150px de alto)
            double maxVal = rawData.Max(x => x.v);

            WeeklySales.Clear();
            foreach (var item in rawData)
            {
                WeeklySales.Add(new SalesData
                {
                    Day = item.d,
                    Value = item.v,
                    BarHeight = (item.v / maxVal) * 150 // Regla de 3 para la altura
                });
            }
        }

        [RelayCommand]
        async Task GoBack()
        {
            // Cerrar sesión admin y volver al login
            await Shell.Current.GoToAsync("..");
        }

        [RelayCommand]
        async Task ViewInventory()
        {
            await Application.Current.MainPage.DisplayAlert("Inventario", "Abriendo inventario completo...", "OK");
        }
    }
}