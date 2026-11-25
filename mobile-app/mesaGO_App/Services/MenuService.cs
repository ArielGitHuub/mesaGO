using mesaGO_App.Models;
using System.Collections.Generic;
using MenuItem = mesaGO_App.Models.MenuItem;

namespace mesaGO_App.Services
{
    public static class MenuService
    {
        // Base de datos completa del menú
        public static Dictionary<string, List<MenuSection>> MenuData = new Dictionary<string, List<MenuSection>>
        {
            {
                "entradas", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Ceviches",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "cev-camaron", Name = "CEVICHE DE CAMARÓN", Description = "Ingredientes: CAMARÓN, CEBOLLA MORADA, TOMATE, LIMÓN, CULANTRO, SALSA DE TOMATE. Descripción: FRESQUITO Y CLÁSICO, EL FAVORITO DE LA COSTA.", Price = 6.50, Image = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "cev-pescado", Name = "CEVICHE DE PESCADO", Description = "Ingredientes: PESCADO BLANCO, LIMÓN, CEBOLLA MORADA, CULANTRO, TOMATE. Descripción: ÁCIDO Y SUAVE, INFALIBLE PARA EMPEZAR.", Price = 6.00, Image = "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "cev-mixto", Name = "CEVICHE MIXTO", Description = "Ingredientes: CAMARÓN, PESCADO, CALAMAR, LIMÓN, CEBOLLA MORADA, CULANTRO. Descripción: PARA EL QUE QUIERE UN POCO DE TODO.", Price = 7.00, Image = "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Empanadas",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "emp-verde", Name = "EMPANADA DE VERDE", Description = "Ingredientes: MASA DE VERDE, QUESO, ACEITE. Descripción: CRUJIENTITA Y LLENA DE QUESO.", Price = 1.50, Image = "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "emp-morocho", Name = "EMPANADA DE MOROCHO", Description = "Ingredientes: MOROCHO, CARNE MOLIDA, CEBOLLA, ESPECIAS. Descripción: LA CLÁSICA DE LAS ESQUINITAS.", Price = 1.50, Image = "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "emp-viento", Name = "EMPANADA DE VIENTO", Description = "Ingredientes: MASA FINA, QUESO, AZÚCAR. Descripción: SUAVE, HUEQUITA Y DULCECITA.", Price = 1.25, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Ensaladas",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "ens-mixta", Name = "ENSALADA MIXTA", Description = "Ingredientes: LECHUGA, TOMATE, PEPINO, CEBOLLA, LIMÓN. Descripción: FRESCA Y SENCILLA, ACOMPAÑA TODO.", Price = 2.00, Image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "ens-cesar", Name = "ENSALADA CÉSAR", Description = "Ingredientes: LECHUGA, POLLO, CROTONES, QUESO, SALSA CÉSAR. Descripción: LA CÉSAR DE TODA LA VIDA.", Price = 3.00, Image = "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Otros",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "humita", Name = "HUMITA", Description = "Ingredientes: MAÍZ MOLIDO, QUESO, MANTEQUILLA. Descripción: SUAVECITA Y CALIENTE, COMO EN CASA.", Price = 1.75, Image = "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "quimbolito", Name = "QUIMBOLITO", Description = "Ingredientes: HARINA DE MAÍZ, MANTEQUILLA, PASAS, HUEVO. Descripción: DULCE TRADICIONAL ENVUELTO EN HOJA.", Price = 1.75, Image = "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "sopas", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Tradicionales",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "caldo-gallina", Name = "CALDO DE GALLINA", Description = "Ingredientes: GALLINA, FIDEOS, PAPA, CEBOLLA, CULANTRO, AJO. Descripción: RECONFORTANTE Y CASERO, EL CLÁSICO DEL ALMUERZO.", Price = 4.50, Image = "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "sancocho", Name = "SANCOCHO", Description = "Ingredientes: CARNE DE RES, YUCA, VERDURAS, VERDE, CEBOLLA, ESPECIAS. Descripción: ESPESITO Y SABROSO, PARA RECARGAR ENERGÍA.", Price = 4.50, Image = "https://images.unsplash.com/photo-1547592166-23acbe3b624b?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "caldo-bolas", Name = "CALDO DE BOLAS", Description = "Ingredientes: BOLAS DE VERDE RELLENAS DE CARNE, CALDO DE RES, VERDURAS. Descripción: TRADICIÓN PURO SABOR, UNA JOYA DE LA SIERRA.", Price = 5.00, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "caldo-salchicha", Name = "CALDO DE SALCHICHA", Description = "Ingredientes: SALCHICHA AMARILLA, MANÍ, CEBOLLA, VERDURAS, ORÉGANO. Descripción: POTENTE Y SABROSITO, EL PREFERIDO DE MUCHOS.", Price = 4.50, Image = "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Mariscos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "encebollado", Name = "ENCEBOLLADO", Description = "Ingredientes: ALBACORA, YUCA, CEBOLLA ENCUTIDA, LIMÓN, CULANTRO. Descripción: EL CURA TODO ECUATORIANO, IDEAL PARA REVIVIR.", Price = 5.50, Image = "https://images.unsplash.com/photo-1574484284008-be94ca452871?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "cazuela", Name = "CAZUELA", Description = "Ingredientes: MANÍ, VERDE, MARISCOS O PESCADO, CEBOLLA, ESPECIAS. Descripción: CREMOSITA Y CON SABOR A COSTA PURA.", Price = 6.00, Image = "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "fuertes", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Secos Tradicionales",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "seco-pollo", Name = "SECO DE POLLO", Description = "Ingredientes: pollo, tomate, cebolla, naranjilla. Descripción: Jugoso, aromático y tradicional.", Price = 5.50, Image = "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "seco-res", Name = "SECO DE RES", Description = "Ingredientes: res, ajo, tomate, naranjilla. Descripción: Carne suave con salsa espesa y llena de sabor.", Price = 6.00, Image = "https://images.unsplash.com/photo-1574484284008-be94ca452871?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "seco-chivo", Name = "SECO DE CHIVO", Description = "Ingredientes: carne de chivo, cebolla, cerveza o chicha. Descripción: Aroma intenso y cocción lenta al estilo serrano.", Price = 7.50, Image = "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Carnes",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "carne-asada", Name = "CARNE ASADA", Description = "Ingredientes: carne de res, ajo, comino. Descripción: Jugosa, marinada y dorada al punto perfecto.", Price = 6.00, Image = "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chuleta-frita", Name = "CHULETA FRITA", Description = "Ingredientes: chuleta de cerdo, ajo. Descripción: Crujiente por fuera y suave por dentro.", Price = 5.50, Image = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "fritada", Name = "FRITADA", Description = "Ingredientes: carne de cerdo, manteca, cebolla. Descripción: Cerdo dorado lentamente hasta quedar jugoso.", Price = 6.00, Image = "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "hornado", Name = "HORNADO", Description = "Ingredientes: cerdo horneado, ajo, especias. Descripción: Cerdo suave por dentro y con cuero crocante.", Price = 6.50, Image = "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chicharron", Name = "CHICHARRÓN", Description = "Ingredientes: cerdo, sal. Descripción: Crocante y perfecto para los amantes del cerdo.", Price = 5.50, Image = "https://images.unsplash.com/photo-1605333190849-623223023023?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Típicos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "llapingachos", Name = "LLAPINGACHOS", Description = "Ingredientes: tortillas de papa, queso, chorizo. Descripción: Delicioso combo serrano con papa, queso y chorizo.", Price = 5.50, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "guatita", Name = "GUATITA", Description = "Ingredientes: mondongo, maní, papa. Descripción: Cremosa, suave y muy tradicional.", Price = 5.00, Image = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "churrasco", Name = "CHURRASCO ECUATORIANO", Description = "Ingredientes: carne, arroz, papas fritas, huevo. Descripción: Plato completo, grande y supercontundente.", Price = 7.00, Image = "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Mariscos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "encocado", Name = "ENCOCADO (PESCADO/CAMARÓN)", Description = "Ingredientes: coco rallado, mariscos, pimiento, cebolla. Descripción: Cremoso, aromático y con clásico sabor costeño.", Price = 7.00, Image = "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "arroz-marinero", Name = "ARROZ MARINERO", Description = "Ingredientes: arroz, camarón, calamar, pulpo, condimentos. Descripción: Lleno de mariscos y preparado al estilo tradicional.", Price = 7.50, Image = "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "pescado-frito", Name = "PESCADO FRITO", Description = "Ingredientes: pescado, limón, ajo. Descripción: Crujiente y perfecto para acompañar con arroz y ensalada.", Price = 6.00, Image = "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "camarones-apanados", Name = "CAMARONES APANADOS", Description = "Ingredientes: camarón, pan rallado, huevo. Descripción: Crocantes, dorados y servidos con limón.", Price = 6.50, Image = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "rapidos", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Hamburguesas & Hot Dogs",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "hamburguesa-clasica", Name = "HAMBURGUESA CLÁSICA ECUATORIANA", Description = "Ingredientes: carne aliñada, pan, lechuga, tomate, queso, papas encima, salsas. Descripción: Jugosita, con salsas de puesto y toque callejero.", Price = 3.50, Image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "hot-dog", Name = "HOT DOG DE ESQUINA", Description = "Ingredientes: pan, salchicha, papas estrelladas, mayonesa, ketchup, mostaza. Descripción: Rápido, llenador y tradicional de los carritos nocturnos.", Price = 2.00, Image = "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Papas & Clásicos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "salchipapas", Name = "SALCHIPAPAS ECUATORIANAS", Description = "Ingredientes: papas fritas, salchicha, mayonesa, ketchup, mostaza, salsa rosada, ají. Descripción: Papas doradas con lluvia de salsas. Infaltables.", Price = 3.00, Image = "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chuzos", Name = "CHUZOS CALLEJEROS", Description = "Ingredientes: carne o pollo aliñado, pan, chimichurri o salsa BBQ. Descripción: Asaditos al carbón, ideales para la noche.", Price = 2.50, Image = "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Sánduches",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "sanduche-pollo", Name = "SÁNDUCHE DE POLLO", Description = "Ingredientes: pollo desmechado, lechuga, tomate, queso, pan, mayonesa. Descripción: Suave, práctico y bien casero.", Price = 2.50, Image = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "sanduche-jamon", Name = "SÁNDUCHE DE JAMÓN Y QUESO", Description = "Ingredientes: jamón, queso, pan suave, lechuga, tomate, mayonesa. Descripción: El clásico simple y rápido.", Price = 2.50, Image = "https://images.unsplash.com/photo-1553909489-cd47e5900137?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "desayunos", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Con Verde",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "bolon", Name = "BOLÓN", Description = "Ingredientes: verde majado, queso y/o chicharrón, sal. Descripción: El clásico desayuno costeño, llenador y sabroso.", Price = 3.00, Image = "https://images.unsplash.com/photo-1604544203292-2367c19df3e3?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "tigrillo-des", Name = "TIGRILLO", Description = "Ingredientes: verde machacado, huevo, queso, cebolla. Descripción: Cremoso, salado y perfecto para arrancar con energía.", Price = 3.50, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "tortilla-verde", Name = "TORTILLA DE VERDE", Description = "Ingredientes: verde rallado, huevo, sal. Descripción: Ligera, doradita y acompañada de lo que tú quieras.", Price = 2.00, Image = "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Clásicos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "huevos-gusto", Name = "HUEVOS AL GUSTO", Description = "Ingredientes: huevos, sal, aceite, cebolla (opcional). Descripción: Revueltos, fritos o pericos, como más te guste.", Price = 2.00, Image = "https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "cafe-pan", Name = "CAFÉ + PAN", Description = "Ingredientes: café pasado, pan fresco (o pan con queso/mantequilla). Descripción: Simple, rápido y tradicional.", Price = 1.50, Image = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Fuertes",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "caldo-salchicha-des", Name = "CALDO DE SALCHICHA", Description = "Ingredientes: salchicha criolla, verde, maní, cebolla, especias. Descripción: El desayuno poderoso de los que necesitan energía extra.", Price = 4.50, Image = "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "postres", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Tradicionales Ecuatorianos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "tres-leches", Name = "TRES LECHES", Description = "Ingredientes: bizcocho, leche evaporada, leche condensada, crema de leche. Descripción: Suave, húmedo y dulzón.", Price = 2.50, Image = "https://images.unsplash.com/photo-1563729768-6af7846bc4c7?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "flan-coco", Name = "FLAN DE COCO", Description = "Ingredientes: leche, huevos, azúcar, coco rallado. Descripción: Cremoso, dulce y con aroma tropical.", Price = 2.00, Image = "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "dulce-guayaba", Name = "DULCE DE GUAYABA CON QUESO", Description = "Ingredientes: pasta de guayaba, queso fresco. Descripción: Mezcla clásica de dulce y salado.", Price = 1.50, Image = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Helados y Postres Fríos",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "helado-paila", Name = "HELADO DE PAILA", Description = "Ingredientes: fruta natural, hielo, azúcar. Descripción: Artesanal, refrescante y frutal.", Price = 2.50, Image = "https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "helado-mora", Name = "HELADO DE MORA", Description = "Ingredientes: mora, leche o crema, azúcar. Descripción: Ácido y dulce en balance perfecto.", Price = 1.75, Image = "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "mousse-maracuya", Name = "MOUSSE DE MARACUYÁ", Description = "Ingredientes: maracuyá, crema, azúcar, gelatina. Descripción: Cremoso y con toque tropical.", Price = 2.75, Image = "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Bocaditos Dulces / Repostería",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "quesadillas", Name = "QUESADILLAS QUITEÑAS", Description = "Ingredientes: harina, queso, mantequilla, azúcar. Descripción: Suaves, dulces y tradicionales.", Price = 1.50, Image = "https://images.unsplash.com/photo-1614999908611-37367803e639?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "milhojas", Name = "MILHOJAS", Description = "Ingredientes: hojaldre, crema pastelera, azúcar. Descripción: Crujientes capas con crema pastelera.", Price = 2.00, Image = "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "torta-chocolate", Name = "TORTA DE CHOCOLATE 70%", Description = "Ingredientes: cacao ecuatoriano, mantequilla, harina, azúcar. Descripción: Intensa, artesanal y chocolatera.", Price = 2.75, Image = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "bebidas", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "Naturales",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "jugos-naturales", Name = "JUGOS NATURALES", Description = "Papaya, naranja, mora o sandía, preparados al momento.", Price = 1.50, Image = "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "agua-saborizada", Name = "AGUA SABORIZADA", Description = "Agua ligera con toques de fruta natural.", Price = 1.00, Image = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chicha", Name = "CHICHA (JORA O ARROZ)", Description = "Bebida tradicional ecuatoriana, refrescante y ligeramente fermentada.", Price = 1.50, Image = "https://images.unsplash.com/photo-1582230725350-a937a3424d67?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Calientes",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "cafe", Name = "CAFÉ", Description = "Café pasado ecuatoriano.", Price = 1.00, Image = "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chocolate", Name = "CHOCOLATE CALIENTE", Description = "Chocolate espeso con aroma nacional.", Price = 1.50, Image = "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "avena", Name = "AVENA CALIENTE", Description = "Clásica y reconfortante, ideal en las mañanas.", Price = 1.00, Image = "https://images.unsplash.com/photo-1517093157656-b9ecfe967795?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Frías Comerciales",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "gaseosas", Name = "GASEOSAS", Description = "Variedad de sodas comunes.", Price = 1.00, Image = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "agua-embotellada", Name = "AGUA EMBOTELLADA", Description = "Hidratación clásica.", Price = 1.00, Image = "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80" }
                        }
                    },
                    new MenuSection
                    {
                        Title = "Cervezas Ecuatorianas",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "pilsener", Name = "PILSENER", Description = "Clásica cerveza ecuatoriana, sabor ligero.", Price = 2.00, Image = "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "club", Name = "CLUB", Description = "Más cuerpo y aroma, ideal para acompañar comidas.", Price = 2.25, Image = "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "artesanales", Name = "ARTESANALES ECUATORIANAS", Description = "Variedades locales como Bandidos del Páramo, Sinners o similares.", Price = 3.50, Image = "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "extras", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "", // Sin subcategoría, se deja vacío
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "arroz", Name = "ARROZ", Description = "Porción de arroz blanco, suelto y recién preparado.", Price = 1.00, Image = "https://images.unsplash.com/photo-1586558357065-51db0d71891b?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "menestra", Name = "MENESTRA", Description = "Menestra casera de lentejas o fréjol, al estilo ecuatoriano.", Price = 1.50, Image = "https://images.unsplash.com/photo-1547592166-23acbe3b624b?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "papas-fritas", Name = "PAPAS FRITAS", Description = "Papas doradas y crocantes.", Price = 1.50, Image = "https://images.unsplash.com/photo-1573080496987-a199f8cd7210?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "mote", Name = "MOTE", Description = "Mote suave, perfecto como acompañamiento típico.", Price = 1.00, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "tostado", Name = "TOSTADO", Description = "Maíz tostado crujiente.", Price = 1.00, Image = "https://images.unsplash.com/photo-1600336153113-66225596047f?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "ensalada", Name = "ENSALADA", Description = "Ensalada fresca de la casa.", Price = 1.00, Image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "maduro-verde", Name = "MADURO / VERDE FRITO", Description = "Plátano frito al gusto: dulce o salado.", Price = 1.00, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "combos", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "yapa-casa", Name = "⭐ YAPA DE LA CASA", Description = "Un regalo a lo ecuatoriano. (1 plato fuerte + 1 extra + yapa sorpresa).", Price = 6.00, OriginalPrice = 8.00, Image = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "no-plata", Name = "⭐ NO HAY PLATA PERO HAY HAMBRE", Description = "Barato, llenador y sabroso. (Bolón mixto + huevo + agua saborizada).", Price = 4.00, OriginalPrice = 5.00, Image = "https://images.unsplash.com/photo-1586558357065-51db0d71891b?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "nanito", Name = "⭐ ÑAÑITO SURTIDO", Description = "Probando de todo un poco. (Llapingachos pequeños + mini churrasco + ensalada).", Price = 5.50, OriginalPrice = 7.00, Image = "https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "dieta", Name = "⭐ NI LA DIETA ME DETIENE", Description = "Para romper la dieta con estilo. (Hornado + empanada de viento + bebida).", Price = 7.00, OriginalPrice = 9.00, Image = "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "finalin", Name = "⭐ MEJOR QUE UN FINALÍN", Description = "Perfecto para revivir. (Encebollado grande + chifles + gaseosa).", Price = 6.00, OriginalPrice = 8.00, Image = "https://images.unsplash.com/photo-1574484284008-be94ca452871?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "killer", Name = "⭐ LLAPINGACHO KILLER", Description = "Poderoso y lleno de sabor serrano. (Llapingachos grandes + chorizo + ensalada).", Price = 4.50, OriginalPrice = 6.00, Image = "https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            },
            {
                "especialidades", new List<MenuSection>
                {
                    new MenuSection
                    {
                        Title = "",
                        Items = new List<MenuItem>
                        {
                            new MenuItem { Id = "fav-abdala", Name = "⭐ EL FAVORITO DE ABDALÁ", Description = "Ingredientes: guatita sin limón, arroz, sopa del día, bebida. Descripción: Completo, contundente y político (pero sin limón). Solo apto para amantes bandidos.", Price = 8.50, Image = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "chivo-premium", Name = "⭐ SECO DE CHIVO PREMIUM", Description = "Ingredientes: chivo cocido lento, cerveza, especias. Descripción: Aromático, suave y elegante.", Price = 9.00, Image = "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "hornado-oro", Name = "⭐ HORNADO DE ORO", Description = "Ingredientes: cerdo horneado por horas, cuero crocante. Descripción: Tiernito, jugoso y adictivo.", Price = 9.00, Image = "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "arroz-marinero-max", Name = "⭐ ARROZ MARINERO MAX", Description = "Ingredientes: extra mariscos, vegetales salteados. Descripción: El plato playero más completo.", Price = 9.50, Image = "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=300&q=80" },
                            new MenuItem { Id = "caldo-bolas-real", Name = "⭐ CALDO DE BOLAS REAL", Description = "Ingredientes: bolas de verde gigantes, carne premium. Descripción: Una versión superior al tradicional.", Price = 8.50, Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80" }
                        }
                    }
                }
            }
        };
    }
}