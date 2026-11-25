
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bike, MapPin, Store, Menu as MenuIcon, ChevronDown, Plus, ArrowLeft, Minus, RefreshCw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MenuService } from '../../services/api'; // Import Service
import { MenuItem, MenuSection } from '../../types';

interface Category {
  id: string;
  name: string;
  image?: string;
  isSpecial?: boolean;
}

const ClientMenu: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [serviceMode, setServiceMode] = useState<'delivery' | 'local' | 'xtra'>('delivery');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeSubFilter, setActiveSubFilter] = useState<string>('Todos');
  const [menuData, setMenuData] = useState<Record<string, MenuSection[]>>({});
  const [loading, setLoading] = useState(true);
  
  // State for quantity selectors map
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchMenu = async () => {
        const data = await MenuService.getFullMenu();
        setMenuData(data);
        setLoading(false);
    };
    fetchMenu();
  }, []);

  const categories: Category[] = [
    { 
      id: 'combos', 
      name: 'PROMOCIONES', 
      isSpecial: true 
    },
    { 
      id: 'especialidades', 
      name: 'ESPECIALIDADES DE LA CASA', 
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'entradas', 
      name: 'ENTRADAS', 
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'sopas', 
      name: 'SOPAS', 
      image: 'https://images.unsplash.com/photo-1547592166-23acbe3b624b?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'fuertes', 
      name: 'PLATOS FUERTES', 
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'rapidos', 
      name: 'PLATOS RÁPIDOS', 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'desayunos', 
      name: 'DESAYUNOS', 
      image: 'https://images.unsplash.com/photo-1533089862017-ec329abb0a51?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'postres', 
      name: 'POSTRES', 
      image: 'https://images.unsplash.com/photo-1563729768-6af7846bc4c7?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'bebidas', 
      name: 'BEBIDAS', 
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' 
    },
    { 
      id: 'extras', 
      name: 'EXTRAS Y ACOMPAÑAMIENTOS', 
      image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=300&q=80' 
    }
  ];

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveSubFilter('Todos');
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const updateItemQuantity = (id: string, val: number) => {
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    addToCart({
      id: item.id,
      nombre: item.name,
      descripcion: item.description || '',
      precio: item.price,
      imagen: item.image
    }, qty);
    navigate('/carrito');
  };

  const ServiceHeader = () => (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={() => selectedCategory ? handleBack() : navigate('/')} className="p-1 -ml-2 text-gray-800">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center cursor-pointer" onClick={() => {
            if(serviceMode === 'delivery') setServiceMode('local');
            else if(serviceMode === 'local') setServiceMode('xtra');
            else setServiceMode('delivery');
        }}>
          <div className="flex items-center gap-2 font-black uppercase text-gray-900 text-lg leading-none">
            {serviceMode === 'delivery' && <><Bike size={20} className="fill-gray-900" /> A DOMICILIO</>}
            {serviceMode === 'local' && <><Store size={20} className="fill-gray-900" /> EN EL LOCAL</>}
            {serviceMode === 'xtra' && <><MapPin size={20} className="fill-gray-900" /> XTRA (RECOGER)</>}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 font-medium mt-1">
            <span className="truncate max-w-[200px]">Casa - Fray Leonardo Muriald...</span>
            <ChevronDown size={14} />
          </div>
        </div>

        <button className="p-1 -mr-2 text-gray-800">
          <MenuIcon size={28} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );

  if (loading) {
      return <div className="flex items-center justify-center min-h-screen"><RefreshCw className="animate-spin text-[#f36b01]" /></div>;
  }

  if (selectedCategory) {
    const sections = menuData[selectedCategory.id] || [];
    // Identify subcategories if any section has a title
    const hasSubCategories = sections.some(s => s.title);
    
    const filteredSections = activeSubFilter === 'Todos' 
        ? sections 
        : sections.filter(s => s.title === activeSubFilter);

    return (
        <div className="bg-white min-h-screen pb-24">
            <ServiceHeader />
            
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={handleBack} className="bg-gray-100 p-2 rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-black text-2xl uppercase text-gray-800 tracking-tighter">{selectedCategory.name}</h1>
                </div>

                {/* Sub-Category Filter Bar */}
                {hasSubCategories && (
                    <div className="flex overflow-x-auto gap-2 pb-2 mb-6 no-scrollbar">
                        <button 
                            onClick={() => setActiveSubFilter('Todos')}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${activeSubFilter === 'Todos' ? 'bg-[#f36b01] text-white border-[#f36b01]' : 'bg-white text-gray-600 border-gray-200'}`}
                        >
                            Todos
                        </button>
                        {sections.map((s, idx) => s.title && (
                            <button 
                                key={idx}
                                onClick={() => setActiveSubFilter(s.title!)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${activeSubFilter === s.title ? 'bg-[#f36b01] text-white border-[#f36b01]' : 'bg-white text-gray-600 border-gray-200'}`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                )}

                {filteredSections.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">Pronto tendremos deliciosos platos aqui.</p>
                ) : (
                    filteredSections.map((section, idx) => (
                        <div key={idx} className="mb-8">
                            {/* Only show title if we are viewing 'Todos' or if we want to reinforce the section */}
                            {section.title && !hasSubCategories && (
                                <h2 className="font-bold text-lg text-[#f36b01] uppercase mb-4 border-b border-gray-100 pb-2">
                                    {section.title}
                                </h2>
                            )}
                            {/* Show titles within 'Todos' view for organization */}
                            {section.title && activeSubFilter === 'Todos' && (
                                 <h2 className="font-bold text-lg text-[#f36b01] uppercase mb-4 border-b border-gray-100 pb-2">
                                    {section.title}
                                </h2>
                            )}

                            <div className="space-y-6">
                                {section.items.map((item) => {
                                    if(item.disponible === false) return null; // Don't show unavailable items
                                    return (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            {item.originalPrice && (
                                              <div className="absolute top-0 right-0 bg-[#f36b01] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                                OFERTA
                                              </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.name}</h3>
                                            {item.description && (
                                                <p className="text-gray-500 text-xs mb-2 leading-snug">{item.description}</p>
                                            )}
                                            
                                            {/* Price and Quantity Selector Row */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex flex-col">
                                                  {item.originalPrice && (
                                                    <span className="text-xs text-gray-400 line-through font-medium"> Antes: ${item.originalPrice.toFixed(2)}</span>
                                                  )}
                                                  <span className={`font-black text-gray-900 text-lg ${item.originalPrice ? 'text-[#f36b01]' : ''}`}>
                                                    $ {item.price.toFixed(2)}
                                                  </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-8">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const q = quantities[item.id] || 1;
                                                                if (q > 1) updateItemQuantity(item.id, q - 1);
                                                            }}
                                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#f36b01] active:scale-95"
                                                        >
                                                            <Minus size={14} strokeWidth={3} />
                                                        </button>
                                                        <span className="font-bold text-gray-900 text-sm w-4 text-center">{quantities[item.id] || 1}</span>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const q = quantities[item.id] || 1;
                                                                if (q < 5) updateItemQuantity(item.id, q + 1);
                                                            }}
                                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#f36b01] active:scale-95"
                                                        >
                                                            <Plus size={14} strokeWidth={3} />
                                                        </button>
                                                    </div>

                                                    <button 
                                                        onClick={() => handleAddToCart(item)}
                                                        className="bg-[#f36b01] text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-md active:scale-95 transition-transform hover:bg-[#d45d00]"
                                                    >
                                                        <Plus size={20} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <ServiceHeader />

      <div className="px-6 py-4">
        <h1 className="font-black text-4xl uppercase text-gray-800 tracking-tighter mb-6">MENU</h1>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col group cursor-pointer" onClick={() => handleCategoryClick(cat)}>
              
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm mb-3">
                
                {cat.isSpecial ? (
                  <div className="w-full h-full bg-[#f36b01] flex flex-col items-center justify-center text-white p-2 text-center relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-300 to-transparent"></div>
                     
                     <div className="relative z-10 transform scale-90">
                        <div className="bg-white text-[#f36b01] text-[8px] font-black px-1 mb-1 inline-block skew-x-[-10deg]">
                            RED WEEK
                        </div>
                        <div className="text-[10px] font-bold leading-none mb-1">HASTA</div>
                        <div className="text-6xl font-black leading-none tracking-tighter">
                            25<span className="text-3xl align-top">%</span>
                        </div>
                        <div className="text-sm font-bold tracking-widest">DSCTO.</div>
                     </div>

                     <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-center overflow-hidden opacity-30">
                        <span className="text-[8px] font-black uppercase rotate-90 whitespace-nowrap">RED WEEK RED WEEK</span>
                     </div>
                     <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-center overflow-hidden opacity-30">
                        <span className="text-[8px] font-black uppercase -rotate-90 whitespace-nowrap">RED WEEK RED WEEK</span>
                     </div>
                  </div>
                ) : (
                  <>
                    <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                  </>
                )}
              </div>

              <h3 className="text-center font-bold text-gray-800 text-sm leading-tight px-1 uppercase">
                {cat.name}
              </h3>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMenu;
