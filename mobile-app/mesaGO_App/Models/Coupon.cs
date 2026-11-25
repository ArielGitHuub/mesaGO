using System;
using System.Collections.Generic;
using System.Text;

namespace mesaGO_App.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Type { get; set; } // holiday, store, delivery, auto
        public string Code { get; set; }
        public string DiscountDisplay { get; set; }
        public double? OriginalPrice { get; set; }
        public double? Price { get; set; }
        public bool IsLimited { get; set; } // Para el borde amarillo
    }

    public class PublicHoliday
    {
        public System.DateTime Date { get; set; }
        public string LocalName { get; set; }
    }
}