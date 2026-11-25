using System;
using System.Collections.Generic;
using System.Text;

namespace mesaGO_App.Models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int StockMinimo { get; set; }
        public int StockActual { get; set; }
        public string Unidad { get; set; }
    }

    public class SalesData
    {
        public string Day { get; set; }
        public double Value { get; set; }
        public double BarHeight { get; set; } // Altura calculada para la barra
    }
}