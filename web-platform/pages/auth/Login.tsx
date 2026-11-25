
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ALLOWED_USERS = [
    { u: 'felipe.boada@udla.edu.ec', p: '1235' },
    { u: 'ariel.tejada@udla.edu.ec', p: '1236' },
    { u: 'matias.flores@udla.edu.ec', p: '1237' },
    { u: 'alexander.valladares@udla.edu.ec', p: '1238' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = ALLOWED_USERS.find(u => u.u.toLowerCase() === email.toLowerCase() && u.p === password);

    if (user) {
      // Login exitoso
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Top Background Shape (Brand Orange) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-90">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f36b01" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.1C93.5,9,82.2,22.4,71.2,33.4C60.2,44.4,49.5,53,38.1,60.6C26.7,68.2,14.6,74.8,1.3,72.6C-12,70.4,-26.6,59.4,-39.8,49.3C-53,39.2,-64.8,30,-72.6,18.1C-80.4,6.2,-84.2,-8.4,-79.8,-21.5C-75.4,-34.6,-62.8,-46.2,-49.5,-53.8C-36.2,-61.4,-22.1,-65,-8.3,-64.8C5.5,-64.6,11,-60.6,30.5,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-sm px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Login</h1>

        <form onSubmit={handleLogin} className="relative">
          {/* Container: Dark Gray for contrast */}
          <div className="bg-zinc-800 shadow-2xl rounded-3xl overflow-hidden border border-zinc-700">
            
            {/* Username Input */}
            <div className="relative border-b border-zinc-600">
              <div className="absolute top-4 left-4 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="email"
                placeholder="Usuario (Email)"
                className="w-full py-4 pl-12 pr-4 outline-none bg-zinc-800 text-white placeholder-gray-500 font-medium transition-colors focus:bg-zinc-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute top-4 left-4 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full py-4 pl-12 pr-20 outline-none bg-zinc-800 text-white placeholder-gray-500 font-medium transition-colors focus:bg-zinc-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-4 justify-center bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Button (Floating Right - Orange) */}
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 mt-0 md:translate-x-6">
             <button 
                type="submit"
                className="bg-[#f36b01] hover:bg-[#d45d00] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center border-[4px] border-white"
             >
                <ArrowRight size={24} strokeWidth={3} />
             </button>
          </div>
        </form>
      </div>

      {/* Bottom Background Shape (Darker Orange) */}
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 opacity-90">
         <svg width="450" height="450" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#c25601" d="M39.9,-65.7C50.8,-60.3,58.3,-47.8,64.7,-35.4C71.1,-23,76.4,-10.8,74.9,0.9C73.4,12.5,65.1,23.6,56.5,33.4C47.9,43.2,39.1,51.8,28.9,58.1C18.7,64.4,7.2,68.4,-3.8,75C-14.8,81.6,-25.2,90.8,-33.5,86.8C-41.8,82.8,-47.9,65.6,-56.3,51.4C-64.7,37.2,-75.4,26,-78.9,13.1C-82.5,0.2,-78.9,-14.4,-71.4,-26.8C-63.9,-39.2,-52.5,-49.4,-40.5,-54.3C-28.5,-59.2,-15.9,-58.8,-2.6,-54.3C10.7,-49.8,21.4,-41.2,39.9,-65.7Z" transform="translate(100 100)" />
         </svg>
      </div>
      
    </div>
  );
};

export default Login;
