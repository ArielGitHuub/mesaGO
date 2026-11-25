
import React, { useEffect, useState } from 'react';
import { InventoryService } from '../../services/api';
import { Ingrediente } from '../../types';
import { AlertTriangle, TrendingUp, DollarSign, Package, Users, Clock, Archive, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [lowStock, setLowStock] = useState<Ingrediente[]>([]);
  const [realTimeSales, setRealTimeSales] = useState(1245.00);
  const [platesSold, setPlatesSold] = useState(84);

  useEffect(() => {
    const fetchInventory = async () => {
      const data = await InventoryService.getLowStockAlerts();
      setLowStock(data);
    };
    fetchInventory();

    // Simulación de Ventas en Tiempo Real
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const saleAmount = Math.floor(Math.random() * 20) + 5;
        setRealTimeSales(prev => prev + saleAmount);
        setPlatesSold(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const weeklyData = [
    { name: 'Lun', ventas: 400 },
    { name: 'Mar', ventas: 300 },
    { name: 'Mie', ventas: 500 },
    { name: 'Jue', ventas: 278 },
    { name: 'Vie', ventas: 189 },
    { name: 'Sab', ventas: 239 },
    { name: 'Dom', ventas: 349 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Vista general en tiempo real</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Sistema Operativo
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Ventas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Ventas Hoy</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">${realTimeSales.toFixed(2)}</h3>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center gap-1 font-bold">
            <TrendingUp size={12} /> +12% vs ayer
          </p>
        </div>

        {/* Card 2: Platos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Platos Servidos</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">{platesSold}</h3>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
              <Package size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Cocina activa</p>
        </div>

        {/* Card 3: Reservas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Reservas Activas</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">12</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
              <Users size={24} />
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-4 font-bold">4 pendientes</p>
        </div>

        {/* Card 4: Inventory Summary */}
        <Link to="/admin/inventario" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-red-500 rounded-bl-full -mr-8 -mt-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Inventario</p>
              <h3 className={`text-3xl font-black mt-2 ${lowStock.length > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {lowStock.length > 0 ? `${lowStock.length} Alertas` : 'OK'}
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${lowStock.length > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-50 text-gray-600'}`}>
              <Archive size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
             <p className="text-xs text-gray-500 font-medium">Ver stock completo</p>
             <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6 text-gray-800">Rendimiento Semanal</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} prefix="$" />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="ventas" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
            <Clock className="text-gray-400" size={20} />
            Alertas y Actividad
          </h3>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {lowStock.length > 0 && (
               <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                     <AlertTriangle size={16} className="text-red-500" />
                     <span className="text-sm font-bold text-red-700">Stock Crítico ({lowStock.length})</span>
                  </div>
                  {lowStock.map(i => (
                      <div key={i.id} className="flex justify-between text-xs text-red-600 mb-1 border-b border-red-100 pb-1 last:border-0 last:pb-0">
                          <span>{i.nombre}</span>
                          <span className="font-bold">{i.stockActual} {i.unidad}</span>
                      </div>
                  ))}
                  <Link to="/admin/inventario" className="block text-center text-xs font-bold text-red-500 mt-2 hover:underline">Gestionar Inventario</Link>
               </div>
            )}

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-xs font-bold text-gray-500 uppercase block mb-2">Hace 2 min</span>
               <p className="text-sm text-gray-700">Nueva reserva creada por <b>Maria L.</b> para 6 personas.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-xs font-bold text-gray-500 uppercase block mb-2">Hace 15 min</span>
               <p className="text-sm text-gray-700">Pedido #2934 entregado con éxito.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
