
import React, { useEffect, useState } from 'react';
import { InventoryService } from '../../services/api';
import { Ingrediente, InventoryCategory } from '../../types';
import { Archive, Plus, Minus, AlertTriangle, Search } from 'lucide-react';

const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState<Ingrediente[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory | 'Todos'>('Todos');
  const [search, setSearch] = useState('');

  const categories: InventoryCategory[] = ['Proteinas', 'Vegetales', 'Frutas', 'Granos', 'Lacteos', 'Otros'];

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const data = await InventoryService.getAll();
    setInventory([...data]); // Copy to force refresh
  };

  const handleUpdateStock = async (id: number, amount: number) => {
    await InventoryService.updateStock(id, amount);
    loadInventory();
  };

  const filteredItems = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    const matchesSearch = item.nombre.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inventario</h1>
          <p className="text-gray-500">Control de stock e ingredientes</p>
        </div>
        
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                placeholder="Buscar ingrediente..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
        <button 
            onClick={() => setSelectedCategory('Todos')}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${selectedCategory === 'Todos' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
        >
            Todos
        </button>
        {categories.map(cat => (
            <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
            const isLowStock = item.stockActual < item.stockMinimo;
            return (
                <div key={item.id} className={`bg-white p-6 rounded-2xl border shadow-sm relative transition-all ${isLowStock ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-200'}`}>
                    {isLowStock && (
                        <div className="absolute -top-3 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <AlertTriangle size={12} /> STOCK BAJO
                        </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1">{item.categoria}</span>
                            <h3 className="font-bold text-gray-900 text-lg">{item.nombre}</h3>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                            <Archive size={20} />
                        </div>
                    </div>

                    <div className="flex items-end justify-between bg-gray-50 rounded-xl p-3">
                        <div className="text-center">
                            <span className="block text-xs text-gray-400 font-bold uppercase">Mínimo</span>
                            <span className="font-bold text-gray-600">{item.stockMinimo} {item.unidad}</span>
                        </div>
                        <div className="text-center border-l border-gray-200 pl-4 flex-1">
                            <span className="block text-xs text-gray-400 font-bold uppercase mb-1">Actual</span>
                            <div className="flex items-center justify-center gap-3">
                                <button 
                                    onClick={() => handleUpdateStock(item.id, -1)}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 active:scale-90 transition-all"
                                >
                                    <Minus size={12} />
                                </button>
                                <span className={`text-xl font-black ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                                    {item.stockActual}
                                </span>
                                <span className="text-xs font-bold text-gray-500 self-end mb-1">{item.unidad}</span>
                                <button 
                                    onClick={() => handleUpdateStock(item.id, 1)}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 active:scale-90 transition-all"
                                >
                                    <Plus size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default AdminInventory;
