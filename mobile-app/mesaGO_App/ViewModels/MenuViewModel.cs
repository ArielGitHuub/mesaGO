using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using mesaGO_App.Models;
using mesaGO_App.Services;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class MenuViewModel : ObservableObject
    {
        // --- ESTADO DE LA VISTA ---
        [ObservableProperty]
        private bool isCategorySelected = false; // Controla si vemos la lista de categorías o los platos

        [ObservableProperty]
        private string headerTitle = "MENU"; // Cambia según la categoría

        [ObservableProperty]
        private string serviceModeText = "A DOMICILIO";

        [ObservableProperty]
        private string serviceIcon = "🏍️"; // Emojis para simular iconos

        // --- DATOS ---
        public ObservableCollection<Category> Categories { get; set; } = new ObservableCollection<Category>();
        public ObservableCollection<string> SubCategories { get; set; } = new ObservableCollection<string>(); // Filtros (Todos, Ceviches...)
        public ObservableCollection<MenuProductDisplay> DisplayedProducts { get; set; } = new ObservableCollection<MenuProductDisplay>();

        [ObservableProperty]
        private string activeSubFilter = "Todos";

        private Category _currentCategory;
        private string _currentServiceMode = "delivery"; // delivery, local, xtra

        public MenuViewModel()
        {
            LoadCategories();
        }

        private void LoadCategories()
        {
            // Definimos las categorías igual que en tu React
            Categories.Add(new Category { Id = "combos", Name = "PROMOCIONES", IsSpecial = true });
            Categories.Add(new Category { Id = "especialidades", Name = "ESPECIALIDADES", Image = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" });
            Categories.Add(new Category { Id = "entradas", Name = "ENTRADAS", Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec" });
            Categories.Add(new Category { Id = "sopas", Name = "SOPAS", Image = "https://images.unsplash.com/photo-1547592166-23acbe3b624b" });
            Categories.Add(new Category { Id = "fuertes", Name = "PLATOS FUERTES", Image = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5" });
            Categories.Add(new Category { Id = "rapidos", Name = "PLATOS RÁPIDOS", Image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" });
            Categories.Add(new Category { Id = "desayunos", Name = "DESAYUNOS", Image = "https://images.unsplash.com/photo-1533089862017-ec329abb0a51" });
            Categories.Add(new Category { Id = "postres", Name = "POSTRES", Image = "https://images.unsplash.com/photo-1563729768-6af7846bc4c7" });
            Categories.Add(new Category { Id = "bebidas", Name = "BEBIDAS", Image = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd" });
            Categories.Add(new Category { Id = "extras", Name = "EXTRAS", Image = "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc" });
        }

        // --- COMANDOS ---

        [RelayCommand]
        void SelectCategory(Category cat)
        {
            _currentCategory = cat;
            HeaderTitle = cat.Name;
            IsCategorySelected = true;
            ActiveSubFilter = "Todos";

            LoadProductsForCategory();
        }

        [RelayCommand]
        void GoBack()
        {
            if (IsCategorySelected)
            {
                IsCategorySelected = false;
                HeaderTitle = "MENU";
            }
            else
            {
                // Si ya estamos en la raíz, volvemos al inicio
                Shell.Current.GoToAsync("///HomePage");
            }
        }

        [RelayCommand]
        void FilterSubCategory(string filter)
        {
            ActiveSubFilter = filter;
            LoadProductsForCategory();
        }

        [RelayCommand]
        void ToggleServiceMode()
        {
            if (_currentServiceMode == "delivery")
            {
                _currentServiceMode = "local";
                ServiceModeText = "EN EL LOCAL";
                ServiceIcon = "📍";
            }
            else if (_currentServiceMode == "local")
            {
                _currentServiceMode = "xtra";
                ServiceModeText = "XTRA (RECOGER)";
                ServiceIcon = "🛍️";
            }
            else
            {
                _currentServiceMode = "delivery";
                ServiceModeText = "A DOMICILIO";
                ServiceIcon = "🏍️";
            }
        }

        // --- LÓGICA DE PRODUCTOS ---

        private void LoadProductsForCategory()
        {
            SubCategories.Clear();
            DisplayedProducts.Clear();

            if (_currentCategory == null || !MenuService.MenuData.ContainsKey(_currentCategory.Id)) return;

            var sections = MenuService.MenuData[_currentCategory.Id];

            // 1. Cargar filtros (Subcategorías)
            SubCategories.Add("Todos");
            foreach (var sec in sections)
            {
                if (!string.IsNullOrEmpty(sec.Title))
                    SubCategories.Add(sec.Title);
            }

            // 2. Cargar productos según filtro
            foreach (var sec in sections)
            {
                // Si el filtro es "Todos" O coincide con el título de la sección
                if (ActiveSubFilter == "Todos" || ActiveSubFilter == sec.Title)
                {
                    foreach (var item in sec.Items)
                    {
                        DisplayedProducts.Add(new MenuProductDisplay(item));
                    }
                }
            }
        }

        [RelayCommand]
        void IncrementQuantity(MenuProductDisplay product)
        {
            if (product.Quantity < 10) product.Quantity++;
        }

        [RelayCommand]
        void DecrementQuantity(MenuProductDisplay product)
        {
            if (product.Quantity > 1) product.Quantity--;
        }

        [RelayCommand]
        async Task AddToCart(MenuProductDisplay product)
        {
            // Usamos el CartService que creamos antes
            CartService.Instance.AddToCart(product.Item, product.Quantity);

            // Opcional: Navegar al carrito o mostrar mensaje
            await Shell.Current.GoToAsync("///CartPage");
        }
    }
}