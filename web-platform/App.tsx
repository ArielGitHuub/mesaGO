import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  ChefHat, 
  Menu as MenuIcon,
  X,
  Home,
  TicketPercent,
  ShoppingBag,
  User,
  StickyNote
} from 'lucide-react';

// Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminNotes from './pages/admin/AdminNotes';
import ClientHome from './pages/client/ClientHome';
import ClientMenu from './pages/client/ClientMenu';
import ClientReservations from './pages/client/ClientReservations';
import ClientCoupons from './pages/client/ClientCoupons';
import ClientCart from './pages/client/ClientCart';
import ClientProfile from './pages/client/ClientProfile';
import Login from './pages/auth/Login';

// Context
import { CartProvider, useCart } from './context/CartContext';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const location = useLocation();

  const adminLinks = [
      { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/admin/menu', label: 'Gestión Menú', icon: MenuIcon },
      { path: '/admin/cupones', label: 'Cupones', icon: TicketPercent },
      { path: '/admin/notas', label: 'Notas Staff', icon: StickyNote },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 shadow-xl`}>
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-[#f36b01]">
          <ChefHat size={32} />
          <span>mesaGO</span>
        </div>
        <button onClick={toggle} className="lg:hidden text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        <div className="text-xs uppercase text-slate-500 font-semibold mb-2 px-2">Admin Panel</div>
        
        {adminLinks.map(link => (
            <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'hover:bg-slate-800 text-slate-300'}`}
            >
                <link.icon size={20} /> {link.label}
            </Link>
        ))}
        
        <div className="mt-8 border-t border-slate-700 pt-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300">
            <Home size={20} /> Volver a la App
          </Link>
        </div>
      </nav>
    </div>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const { totalItems } = useCart(); // Access cart count
  const isActive = (path: string) => location.pathname === path;

  // Don't show bottom nav on login page or admin pages
  if (location.pathname === '/login' || location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/cupones', label: 'Cupones', icon: TicketPercent },
    { path: '/carrito', label: 'Carrito', icon: ShoppingBag, badge: totalItems },
    { path: '/reservas', label: 'Reservas', icon: CalendarCheck },
    { path: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${isActive(item.path) ? 'text-[#f36b01]' : 'text-gray-400'}`}
          >
            <div className="relative">
              <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              {item.badge !== undefined && item.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#f36b01] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </div>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // If Admin, show Sidebar layout
  if (isAdmin) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50 font-inter">
        <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10 lg:hidden p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                <MenuIcon size={24} />
                </button>
                <span className="font-bold text-lg text-gray-800">Administración</span>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<AdminMenu />} />
              <Route path="/admin/cupones" element={<AdminCoupons />} />
              <Route path="/admin/notas" element={<AdminNotes />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  // If Client or Login, show Mobile App layout logic
  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 ${location.pathname !== '/login' ? 'pb-20' : ''}`}>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ClientHome />} />
          <Route path="/menu" element={<ClientMenu />} />
          <Route path="/reservas" element={<ClientReservations />} />
          <Route path="/cupones" element={<ClientCoupons />} />
          <Route path="/carrito" element={<ClientCart />} />
          <Route path="/perfil" element={<ClientProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <BottomNavigation />
    </div>
  );
};

const Root = () => (
  <CartProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CartProvider>
);

export default Root;