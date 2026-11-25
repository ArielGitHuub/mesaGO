using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Threading.Tasks;
using Microsoft.Maui.ApplicationModel;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Devices.Sensors;

namespace mesaGO_App.ViewModels
{
    public partial class ReservationViewModel : ObservableObject
    {
        [ObservableProperty]
        private string nombreCliente = "";

        [ObservableProperty]
        private string telefonoCliente = "";

        [ObservableProperty]
        private DateTime fecha = DateTime.Now;

        [ObservableProperty]
        private TimeSpan hora = TimeSpan.FromHours(19);

        [ObservableProperty]
        private int numeroPersonas = 2;

        [ObservableProperty]
        private bool isSubmitted = false;

        [ObservableProperty]
        private bool isFormVisible = true;

        [RelayCommand]
        void UpdateGuests(string deltaStr)
        {
            if (int.TryParse(deltaStr, out int delta))
            {
                int newValue = numeroPersonas + delta;
                if (newValue >= 1 && newValue <= 20) NumeroPersonas = newValue;
            }
        }

        [RelayCommand]
        async Task SubmitReservation()
        {
            if (string.IsNullOrEmpty(NombreCliente) || string.IsNullOrEmpty(TelefonoCliente))
            {
                await Application.Current.MainPage.DisplayAlert("Faltan datos", "Escribe tu nombre y teléfono", "OK");
                return;
            }
            await Task.Delay(500);
            IsFormVisible = false;
            IsSubmitted = true;
        }

        [RelayCommand]
        void ResetForm()
        {
            IsSubmitted = false;
            IsFormVisible = true;
            NombreCliente = "";
            TelefonoCliente = "";
            NumeroPersonas = 2;
        }

        [RelayCommand]
        async Task OpenMap()
        {
            // TUS COORDENADAS EXACTAS
            var location = new Location(-0.18136226826554733, -78.48019503372947);
            var options = new MapLaunchOptions { Name = "MesaGO" };

            try
            {
                await Map.OpenAsync(location, options);
            }
            catch
            {
                // Fallback por si no tiene app de mapas
                await Browser.OpenAsync("https://maps.google.com/?q=-0.18136226826554733,-78.48019503372947");
            }
        }

        [RelayCommand]
        void CallPhone()
        {
            if (PhoneDialer.Default.IsSupported) PhoneDialer.Default.Open("0983785934");
        }
    }
}