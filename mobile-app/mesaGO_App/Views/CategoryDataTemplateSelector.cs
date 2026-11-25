using mesaGO_App.Models; // Para que reconozca la clase 'Category'
using Microsoft.Maui.Controls; // Para que reconozca 'DataTemplateSelector'

namespace mesaGO_App.Views
{
    public class CategoryDataTemplateSelector : DataTemplateSelector
    {
        // Estas propiedades se llenarán desde el XAML
        public DataTemplate NormalTemplate { get; set; }
        public DataTemplate SpecialTemplate { get; set; }

        protected override DataTemplate OnSelectTemplate(object item, BindableObject container)
        {
            var category = item as Category;

            if (category == null)
                return null;

            // Si es una categoría especial (Promociones), usa la plantilla Especial (Naranja).
            // Si no, usa la plantilla Normal (Foto).
            return category.IsSpecial ? SpecialTemplate : NormalTemplate;
        }
    }
}