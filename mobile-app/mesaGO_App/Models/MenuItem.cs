using System;
using System.Collections.Generic;
using System.Text;

namespace mesaGO_App.Models
{
    public class MenuItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double? OriginalPrice { get; set; }
        public string Image { get; set; }
    }
}