
import React, { useEffect, useState } from 'react';
import { MenuService, AIService } from '../../services/api';
import { MenuItem } from '../../types';
import { Edit2, Plus, X, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';

const AdminMenu: React.FC = () => {
  // We need to flatten the menu structure for the table
  const [platos, setPlatos] = useState<(MenuItem & { categoryId: string })[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<MenuItem> & { categoryId?: string }>({
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    categoryId: 'entradas',
    image: 'https://picsum.photos/400/300',
    disponible: true
  });

  const categories = [
      {id: 'entradas', name: 'Entradas'},
      {id: 'sopas', name: 'Sopas'},
      {id: 'fuertes', name: 'Platos Fuertes'},
      {id: 'rapidos', name: 'Platos Rápidos'},
      {id: 'desayunos', name: 'Desayunos'},
      {id: 'postres', name: 'Postres'},
      {id: 'bebidas', name: 'Bebidas'},
      {id: 'extras', name: 'Extras'},
      {id: 'combos', name: 'Promociones'},
      {id: 'especialidades', name: 'Especialidades'}
  ];

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    const data = await MenuService.getAllFlat();
    setPlatos(data);
  };

  const handleToggle = async (catId: string, itemId: string) => {
    await MenuService.toggleAvailability(catId, itemId);
    loadMenu(); // Refresh
  };

  const handleDelete = async (catId: string, itemId: string) => {
    if(confirm('¿Estás seguro de eliminar este plato?')) {
        await MenuService.delete(catId, itemId);
        loadMenu();
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.ingredients) return alert("Escribe un nombre e ingredientes primero.");
    setIsGeneratingAI(true);
    const desc = await AIService.generateDescription(formData.name, formData.ingredients, 'dish');
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGeneratingAI(false);
  };

  const handleGenerateImage = async () => {
    if (!formData.name) return alert("Escribe el nombre del plato primero.");
    setIsGeneratingImage(true);
    const imageUrl = await AIService.generateImage(formData.name);
    setFormData(prev => ({ ...prev, image: imageUrl }));
    setIsGeneratingImage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
        await MenuService.update(formData.categoryId!, formData as MenuItem);
    } else {
        await MenuService.create(formData.categoryId!, formData as MenuItem);
    }
    setIsModalOpen(false);
    loadMenu();
    setFormData({ name: '', description: '', ingredients: '', price: 0, categoryId: 'entradas', image: 'https://picsum.photos/400/300', disponible: true });
  };

  const openEdit = (plato: MenuItem & { categoryId: string }) => {
      setFormData(plato);
      setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Menú</h1>
          <p className="text-gray-500">Gestión de catálogo</p>
        </div>
        <button 
            onClick={() => { setFormData({categoryId: 'entradas', image: 'https://picsum.photos/400/300', disponible: true}); setIsModalOpen(true); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} /> Nuevo Plato
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Plato</th>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Ingredientes</th>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Precio</th>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Estado</th>
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {platos.map((plato) => (
              <tr key={plato.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={plato.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100 shadow-sm" />
                    <div>
                      <p className="font-bold text-gray-900">{plato.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{plato.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
                    {categories.find(c => c.id === plato.categoryId)?.name || plato.categoryId}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{plato.ingredients || 'N/A'}</p>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                    ${plato.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleToggle(plato.categoryId, plato.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${plato.disponible ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${plato.disponible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(plato)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(plato.categoryId, plato.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CREAR/EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900">{formData.id ? 'Editar Plato' : 'Nuevo Plato'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Plato</label>
                        <input 
                            required 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            placeholder="Ej: Encebollado Mixto"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ingredientes Principales</label>
                        <input 
                            required 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.ingredients || ''}
                            onChange={e => setFormData({...formData, ingredients: e.target.value})}
                            placeholder="Ej: Albacora, yuca, cebolla, chifles..."
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Descripción Comercial</label>
                            <button 
                                type="button" 
                                onClick={handleGenerateDescription}
                                disabled={isGeneratingAI}
                                className="flex items-center gap-1 text-[10px] bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 rounded-full font-bold hover:opacity-90"
                            >
                                <Sparkles size={10} /> {isGeneratingAI ? 'Generando...' : 'Generar Texto IA'}
                            </button>
                        </div>
                        <textarea 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            placeholder="Descripción corta y vendedora..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
                            <input 
                                type="number" step="0.01" required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                            <select 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.categoryId}
                                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                            >
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase">URL de Imagen</label>
                            <button 
                                type="button" 
                                onClick={handleGenerateImage}
                                disabled={isGeneratingImage}
                                className="flex items-center gap-1 text-[10px] bg-gradient-to-r from-pink-500 to-rose-600 text-white px-2 py-1 rounded-full font-bold hover:opacity-90"
                            >
                                <ImageIcon size={10} /> {isGeneratingImage ? 'Creando...' : 'Crear Imagen IA'}
                            </button>
                        </div>
                        <div className="flex gap-4 items-center">
                            <input 
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.image}
                                onChange={e => setFormData({...formData, image: e.target.value})}
                            />
                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95">
                        Guardar Plato
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
