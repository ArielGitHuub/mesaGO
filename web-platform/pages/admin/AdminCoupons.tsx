
import React, { useEffect, useState } from 'react';
import { CouponService, AIService } from '../../services/api';
import { Coupon } from '../../types';
import { Plus, Trash2, Tag, Sparkles } from 'lucide-react';

const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({ 
      code: '', description: '', discountDisplay: '', type: 'store', title: '' 
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    const data = await CouponService.getAll();
    setCoupons(data);
  };

  const handleDelete = async (id: number) => {
    await CouponService.delete(id);
    loadCoupons();
  };

  const handleGenerateDescription = async () => {
    if (!newCoupon.discountDisplay) return alert("Escribe el descuento primero (ej: 20% OFF)");
    setIsGeneratingAI(true);
    const desc = await AIService.generateDescription(`Cupón ${newCoupon.code}`, `Descuento de ${newCoupon.discountDisplay}`, 'coupon');
    setNewCoupon(prev => ({ ...prev, description: desc }));
    setIsGeneratingAI(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await CouponService.create({ 
        ...newCoupon, 
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80',
        activo: true 
    } as any);
    setNewCoupon({ code: '', description: '', discountDisplay: '', type: 'store', title: '' });
    loadCoupons();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cupones</h1>
        <p className="text-gray-500">Gestiona descuentos y promociones</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Form */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 h-fit">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-indigo-600"/> Nuevo Cupón
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
                <input 
                    placeholder="TÍTULO (Ej: Lunes Loco)" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold"
                    value={newCoupon.title}
                    onChange={e => setNewCoupon({...newCoupon, title: e.target.value})}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        placeholder="CÓDIGO (Ej: HOLA10)" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold uppercase"
                        value={newCoupon.code}
                        onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                        required
                    />
                    <input 
                        placeholder="Descuento (Ej: 20% OFF)" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3"
                        value={newCoupon.discountDisplay}
                        onChange={e => setNewCoupon({...newCoupon, discountDisplay: e.target.value})}
                        required
                    />
                </div>
                
                <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3"
                    value={newCoupon.type}
                    onChange={e => setNewCoupon({...newCoupon, type: e.target.value as any})}
                >
                    <option value="store">En Local</option>
                    <option value="delivery">Domicilio</option>
                    <option value="auto">Xtra / Recoger</option>
                    <option value="limited">Feriado / Limitado</option>
                </select>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Descripción</label>
                        <button 
                            type="button" 
                            onClick={handleGenerateDescription}
                            disabled={isGeneratingAI}
                            className="flex items-center gap-1 text-[10px] bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 rounded-full font-bold hover:opacity-90"
                        >
                            <Sparkles size={10} /> {isGeneratingAI ? 'Generando...' : 'Generar IA'}
                        </button>
                    </div>
                    <textarea 
                        placeholder="Descripción del cupón..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none h-24"
                        value={newCoupon.description}
                        onChange={e => setNewCoupon({...newCoupon, description: e.target.value})}
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
                    Crear Cupón
                </button>
            </form>
        </div>

        {/* List */}
        <div className="space-y-4">
            {coupons.map(c => (
                <div key={c.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center group">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Tag size={16} className="text-indigo-500" />
                            <span className="font-black text-lg text-gray-900">{c.code}</span>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{c.discountDisplay}</span>
                        </div>
                        <p className="font-bold text-sm text-gray-800">{c.title}</p>
                        <p className="text-xs text-gray-500">{c.description}</p>
                    </div>
                    <button onClick={() => handleDelete(c.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
            {coupons.length === 0 && <p className="text-gray-400 text-center py-10">No hay cupones activos.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
