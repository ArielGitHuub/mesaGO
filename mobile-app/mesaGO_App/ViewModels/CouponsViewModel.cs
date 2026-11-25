using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using mesaGO_App.Models;
using System.Collections.ObjectModel;
using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.Maui.Controls;

namespace mesaGO_App.ViewModels
{
    public partial class CouponsViewModel : ObservableObject
    {
        // DATOS
        private List<Coupon> _allCoupons;
        public ObservableCollection<Coupon> DisplayedCoupons { get; set; } = new ObservableCollection<Coupon>();
        public ObservableCollection<PublicHoliday> UpcomingHolidays { get; set; } = new ObservableCollection<PublicHoliday>();

        // ESTADO
        [ObservableProperty]
        private string activeFilter = "holiday"; // holiday, all, store, delivery, auto

        [ObservableProperty]
        private bool isHolidayActive = false; // Cambiar a true para probar el modo fiesta

        [ObservableProperty]
        private string activeHolidayName = "";

        // Constructor
        public CouponsViewModel()
        {
            LoadData();
            LoadHolidays();
            ApplyFilter("holiday");
        }

        private void LoadData()
        {
            _allCoupons = new List<Coupon>
            {
                // FERIADOS
                new Coupon { Id=100, Title="Especial: Navidad", Description="Combo festivo 2x1", Image="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5", Type="holiday", Code="NAVIDAD", DiscountDisplay="25% OFF", IsLimited=true },
                
                // DELIVERY
                new Coupon { Id=1, Title="Estoy mimido, tráeme nomás", Description="15% off a domicilio", Image="https://images.unsplash.com/photo-1526367790999-0150786686a2", Type="delivery", Code="MIMIDO15", DiscountDisplay="15% OFF" },
                new Coupon { Id=2, Title="Ñaño, abre la puerta", Description="10% off noche", Image="https://images.unsplash.com/photo-1619642686001-72986f773729", Type="delivery", Code="PUERTA10", DiscountDisplay="10% OFF" },

                // LOCAL
                new Coupon { Id=4, Title="Ñañito, atiéndame bonito", Description="Postre 50% off", Image="https://images.unsplash.com/photo-1551024506-0bccd828d307", Type="store", Code="BONITO50", DiscountDisplay="50% OFF" },
                new Coupon { Id=5, Title="Pide aquí nomás", Description="15% en efectivo", Image="https://images.unsplash.com/photo-1552566626-52f8b828add9", Type="store", Code="AQUI15", DiscountDisplay="15% OFF" },

                // AUTO
                new Coupon { Id=8, Title="Voy volando ñaño", Description="Bebida gratis al retirar", Image="https://images.unsplash.com/photo-1622483767028-3f66f32aef97", Type="auto", Code="VOLANDO", DiscountDisplay="GRATIS", OriginalPrice=1.50, Price=0 }
            };
        }

        private void LoadHolidays()
        {
            // Simulamos feriados de Ecuador
            UpcomingHolidays.Add(new PublicHoliday { Date = new DateTime(2025, 12, 25), LocalName = "Navidad" });
            UpcomingHolidays.Add(new PublicHoliday { Date = new DateTime(2025, 12, 31), LocalName = "Fin de Año" });
            UpcomingHolidays.Add(new PublicHoliday { Date = new DateTime(2026, 1, 1), LocalName = "Año Nuevo" });
        }

        [RelayCommand]
        void ApplyFilter(string filterType)
        {
            activeFilter = filterType;
            DisplayedCoupons.Clear();

            foreach (var coupon in _allCoupons)
            {
                if (filterType == "all" && coupon.Type != "holiday")
                {
                    DisplayedCoupons.Add(coupon);
                }
                else if (coupon.Type == filterType)
                {
                    DisplayedCoupons.Add(coupon);
                }
            }
        }

        [RelayCommand]
        async Task Redeem(Coupon coupon)
        {
            await Application.Current.MainPage.DisplayAlert("¡Canjeado!", $"Código {coupon.Code} copiado.", "OK");
        }

        [RelayCommand]
        async Task GoBack()
        {
            await Shell.Current.GoToAsync("///HomePage");
        }
    }
}