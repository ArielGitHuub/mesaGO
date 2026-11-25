
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Utensils, 
  FileText, 
  MapPin, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Pencil
} from 'lucide-react';

const ClientProfile: React.FC = () => {
  const menuItems = [
    { icon: Pencil, label: "Editar perfil", path: "#" },
    { icon: Utensils, label: "Pedidos", path: "#" },
    { icon: FileText, label: "Datos para la factura", path: "#" },
    { icon: MapPin, label: "Dirección de entrega", path: "#" },
    { icon: Bell, label: "Notificaciones", path: "#" },
    { icon: HelpCircle, label: "Ayuda", path: "#" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Top Version Indicator */}
      <div className="flex justify-between items-center p-4">
        {/* Brand Stripes Decoration */}
        <div className="flex gap-1 h-6">
           <div className="w-1.5 bg-[#f36b01] h-full"></div>
           <div className="w-1.5 bg-[#f36b01] h-full"></div>
           <div className="w-1.5 bg-[#f36b01] h-full"></div>
        </div>
        <span className="text-gray-400 text-xs font-medium">Versión 3.8.12</span>
      </div>

      {/* User Header */}
      <div className="px-6 mb-8 flex items-center gap-4">
        <div className="w-16 h-16 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
             {/* Mock Avatar */}
             <User size={36} className="text-gray-800" />
        </div>
        <div>
           <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">HOLA, Ariel!</h1>
           <p className="text-gray-500 text-sm">arielgtejada@hotmail.com</p>
        </div>
      </div>

      {/* Account Section */}
      <div className="px-4">
        <h2 className="text-gray-400 font-bold text-sm mb-3 px-2">Cuenta</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={index}>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-50 p-2 rounded-full text-gray-700 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <item.icon size={20} strokeWidth={2} />
                        </div>
                        <span className="font-bold text-gray-800 text-sm">{item.label}</span>
                    </div>
                    {/* Small chevron purely visual */}
                    <ChevronRight size={16} className="text-gray-300" />
                </button>
                {/* Divider Line */}
                {index < menuItems.length - 1 && (
                    <div className="h-[1px] bg-gray-100 mx-4"></div>
                )}
            </div>
          ))}

          {/* Logout Special Item */}
          <div className="h-[1px] bg-gray-100 mx-4"></div>
          
          <button className="w-full flex items-center gap-4 p-4 hover:bg-orange-50 transition-colors group text-[#f36b01]">
                <div className="bg-orange-50 p-2 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                    <LogOut size={20} strokeWidth={2} className="text-[#f36b01]" />
                </div>
                <span className="font-bold text-sm">Cerrar sesión</span>
          </button>

        </div>
      </div>

      {/* Admin Link (Footer) */}
      <div className="mt-12 text-center pb-8">
         <Link 
            to="/login" 
            className="inline-block text-xs text-gray-300 hover:text-gray-500 transition-colors font-medium"
            aria-label="Admin Login"
         >
            Login Admin
         </Link>
      </div>

    </div>
  );
};

export default ClientProfile;
