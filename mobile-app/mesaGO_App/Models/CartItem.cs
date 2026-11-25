using System;
using System.Collections.Generic;
using System.Text;

namespace mesaGO_App.Models
{
    public class CartItem
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public string Imagen { get; set; }
        public int Quantity { get; set; }

        // Propiedad calculada: Total = Precio * Cantidad
        public double Total => Precio * Quantity;
    }
}