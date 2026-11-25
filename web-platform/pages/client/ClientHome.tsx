
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bike, Percent, ArrowRight, UtensilsCrossed, ShoppingBag, MapPin, ChefHat, Sparkles } from 'lucide-react';

const SPLASH_QUOTES = [
  "Espérate un ratito ñaño… estamos calentando el hornado 😎🐖",
  "Tu hambre ya llegó… vos nomás faltas 😏🍽️",
  "No te me desesperes… estamos pelando el verde 🤏🍌",
  "Cargando saborcito ecuatoriano… pilas que ya sale 😤🔥",
  "Ñañito, ya mismo está… como buen encebollado 🐟🥣",
  "El bolón está siendo amasado con cariño… y sudor 😅🍌",
  "No te vayas… ya estamos arreglando el plato bonito para vos 😌🍛",
  "Estamos viendo si quieres con ají o sin ají...🌶️🤣",
  "Aguanta un chance, que la yapa se demora 💛😅",
  "Ssssh… el cuy recién se está alistando 😴➡️🔥🐹",
  "Escaneando tu antojo… resultado: full hambre 😳🍲",
  "Cargando comida seria… nada de esas pendejaditas 🧐🍛",
  "Ñaño, ya viene tu pedido… ponte pilas nomás 😎💨",
  "Tu dieta llamó… pero no le contestamos 🤫🤣",
  "Ya mismo ñañito… estamos batiendo el juguito pa’ que quede fino 🥤😉",
  "Apagando el fogón… encendiendo tu hambre 🔥😋"
];

const ClientHome: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a random quote on mount
    const randomQuote = SPLASH_QUOTES[Math.floor(Math.random() * SPLASH_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Background Typography Pattern Simulation */}
      <div className="bg-black h-16 overflow-hidden relative flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 flex flex-col justify-center leading-none text-white text-4xl font-black uppercase whitespace-nowrap select-none animate-pulse">
           {/* Repetimos la frase muchas veces para asegurar que cubra todo el ancho sin huecos */}
           <div className="-ml-60">
             BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY
           </div>
           {/* Segunda línea desplazada para efecto ladrillo */}
           <div className="-ml-20">
             DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO DE LEY BUENAZO RICO SABOR YAPITA AJICITO
           </div>
         </div>
         <div className="z-10 text-white font-bold text-sm flex items-center gap-2">
            <span>¿Necesitas ayuda?</span>
         </div>
      </div>

      <div className="p-4 space-y-4 -mt-8 relative z-10">
        
        {/* SECTION 1: SPLASH SCREEN / QUOTE (Small & Straight Text) */}
        <div className="bg-[#f36b01] rounded-2xl p-3 shadow-lg relative overflow-hidden flex items-center justify-center text-center min-h-[60px]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-200 to-transparent"></div>
            
            <div className="relative z-10 max-w-[90%]">
                <p className="text-white font-bold text-sm leading-tight drop-shadow-sm not-italic">
                   {quote.replace(/"/g, '')}
                </p>
            </div>
            
            <div className="absolute right-2 bottom-2 opacity-20">
                <Sparkles size={16} className="text-yellow-300" />
            </div>
        </div>

        {/* SECTION 2: MAIN PROMO (6 Side Images - Varied Sizes - Dynamic Collage) */}
        <div className="bg-[#f36b01] rounded-3xl p-4 shadow-xl relative overflow-hidden text-center text-white min-h-[380px] flex flex-col items-center justify-center">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-300 to-transparent"></div>
            
            {/* --- LEFT SIDE IMAGES --- */}
            {/* Top Left (Medium) */}
            <div className="absolute top-4 -left-2 z-10 transform rotate-[6deg]">
               <img 
                 src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=250&q=80" 
                 className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-xl" 
                 alt="Food TL" 
               />
            </div>
            {/* Middle Left (Large) */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-0 transform -rotate-[12deg]">
               <img 
                 src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80" 
                 className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-md opacity-90" 
                 alt="Food ML" 
               />
            </div>
            {/* Bottom Left (Small) */}
            <div className="absolute bottom-6 left-2 z-10 transform rotate-[15deg]">
               <img 
                 src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=150&q=80" 
                 className="w-20 h-20 rounded-xl border-2 border-white object-cover shadow-xl" 
                 alt="Food BL" 
               />
            </div>

            {/* --- RIGHT SIDE IMAGES --- */}
            {/* Top Right (Small) */}
            <div className="absolute top-5 right-1 z-10 transform -rotate-[8deg]">
               <img 
                 src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=150&q=80" 
                 className="w-20 h-20 rounded-xl border-2 border-white object-cover shadow-xl" 
                 alt="Food TR" 
               />
            </div>
            {/* Middle Right (Large) */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-8 z-0 transform rotate-[10deg]">
               <img 
                 src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=250&q=80" 
                 className="w-36 h-36 rounded-3xl border-4 border-white object-cover shadow-md opacity-90" 
                 alt="Food MR" 
               />
            </div>
            {/* Bottom Right (Medium) */}
            <div className="absolute bottom-4 -right-2 z-10 transform -rotate-[15deg]">
               <img 
                 src="https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=250&q=80" 
                 className="w-28 h-28 rounded-2xl border-4 border-white object-cover shadow-xl" 
                 alt="Food BR" 
               />
            </div>


            {/* CENTER TEXT CONTENT */}
            <div className="relative z-20 flex flex-col items-center w-full px-2">
              
              {/* LOGO MESAGO */}
              <div className="mb-4 relative">
                 {/* Simulated Hat Icon positioned over the 'e' */}
                 <ChefHat className="absolute -top-6 left-[1.9rem] text-white w-10 h-10 transform -rotate-6 fill-white" strokeWidth={1.5} />
                 <h1 className="text-[4.5rem] font-black tracking-tighter flex items-baseline drop-shadow-md leading-none">
                    <span>mesa</span><span className="uppercase">GO</span>
                 </h1>
              </div>
              
              <h2 className="text-xl font-bold uppercase leading-none mb-6 drop-shadow-md opacity-100 tracking-wider text-white relative z-20">
                LAS MEJORES PROMOS
              </h2>

              <div className="relative mb-2 z-20 w-full text-center">
                 {/* HASTA - Centered relative to percentage */}
                 <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl font-bold text-white drop-shadow-md">HASTA</span>
                 
                 <span className="text-[120px] font-black leading-none tracking-tighter drop-shadow-xl relative z-10 block">
                    25<span className="text-7xl align-top">%</span>
                 </span>
                 
                 {/* DSCTO - Centered relative to percentage */}
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-4xl font-bold text-white drop-shadow-md z-20 whitespace-nowrap">DSCTO.</span>
              </div>

            </div>
        </div>

        {/* BIG MENU BUTTON */}
        <Link to="/menu" className="block w-full bg-slate-900 text-white rounded-2xl p-5 shadow-lg hover:bg-slate-800 transition-all transform active:scale-95 group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-full group-hover:bg-slate-600 transition-colors">
                        <UtensilsCrossed size={28} className="text-white" />
                    </div>
                    <div className="text-left">
                        <span className="block font-black text-2xl uppercase italic tracking-tighter">VER MENÚ</span>
                        <span className="text-slate-400 text-xs">Descubre todos nuestros platos</span>
                    </div>
                </div>
                <div className="bg-white text-slate-900 rounded-full p-2">
                    <ArrowRight size={20} strokeWidth={3} />
                </div>
            </div>
        </Link>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {/* Domicilio */}
          <Link to="/menu" className="bg-[#f36b01] text-white rounded-2xl py-4 px-2 flex flex-col items-center justify-center text-center shadow-md hover:bg-[#d45d00] transition-colors">
            <Bike size={28} className="mb-2" />
            <span className="font-black text-xs uppercase italic leading-none mb-1">MESAGO</span>
            <span className="font-bold text-[10px] opacity-90">A DOMICILIO</span>
          </Link>

          {/* En Local */}
          <Link to="/reservas" className="bg-[#f36b01] text-white rounded-2xl py-4 px-2 flex flex-col items-center justify-center text-center shadow-md hover:bg-[#d45d00] transition-colors">
            <MapPin size={28} className="mb-2" />
            <span className="font-black text-xs uppercase italic leading-none mb-1">MESAGO</span>
            <span className="font-bold text-[10px] opacity-90">EN EL LOCAL</span>
          </Link>

           {/* Xtra (Recoger) */}
           <Link to="/menu" className="bg-[#f36b01] text-white rounded-2xl py-4 px-2 flex flex-col items-center justify-center text-center shadow-md hover:bg-[#d45d00] transition-colors">
            <ShoppingBag size={28} className="mb-2" />
            <span className="font-black text-xs uppercase italic leading-none mb-1">MESAGO</span>
            <span className="font-bold text-[10px] opacity-90">XTRA (RECOGER)</span>
          </Link>
        </div>

        {/* Coupons Banner */}
        <Link to="/cupones" className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm group">
           <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-full group-hover:scale-110 transition-transform">
                 <Percent size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="font-bold text-lg text-gray-900 leading-none">CUPONES</span>
                 <span className="text-xs text-gray-500">Ahorra en tus pedidos</span>
              </div>
           </div>
           <ArrowRight className="text-gray-300 group-hover:text-orange-500 transition-colors" />
        </Link>

      </div>
    </div>
  );
};

export default ClientHome;
