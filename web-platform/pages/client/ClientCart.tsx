
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, MapPin, Clock, Ticket } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ClientCart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const deliveryFee = 2.69; 
  const total = cartTotal > 0 ? cartTotal + deliveryFee : 0;

  // --- REUSABLE COMPONENTS ---

  const DeliveryInfo = () => (
    <div className="bg-white p-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-2 text-sm">
            <MapPin size={20} className="text-[#f36b01] fill-[#f36b01]" />
            <span className="font-bold text-[#f36b01]">Entregar en:</span>
            <span className="text-gray-600 truncate max-w-[180px] sm:max-w-xs">Fray Leonardo Muriald...</span>
         </div>
         <button className="text-sm text-gray-800 font-medium hover:underline">Cambiar</button>
      </div>
      <div className="flex items-center gap-2 text-sm pl-0">
         <div className="relative">
            <Clock size={20} className="text-[#f36b01]" />
         </div>
         <span className="font-bold text-[#f36b01]">Cuando:</span>
         <span className="text-gray-600">30 min</span>
      </div>
    </div>
  );

  const PromoBanner = ({ showBadge = true }: { showBadge?: boolean }) => (
    <div className="bg-[#1A1A1A] text-white p-4 mx-4 mt-4 rounded-full flex items-center justify-between shadow-lg relative mb-6">
        <div className="flex items-center gap-2">
            <Ticket size={20} className="text-white fill-white" />
            <span className="font-bold text-sm">¿Tienes un código?</span>
        </div>
        <div className="flex items-center gap-4">
            <span className="font-bold text-sm">Mi billetera</span>
            {showBadge && (
               <div className="bg-[#f36b01] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
            )}
        </div>
    </div>
  );

  const EmptyCartIcon = () => (
    <div className="relative w-32 h-32 mx-auto mb-6">
       {/* Styled to look like the reference bag */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-gray-900">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {/* Red Plus Circle Button */}
      <div className="absolute bottom-0 right-0 bg-[#f36b01] text-white rounded-full w-10 h-10 flex items-center justify-center border-[3px] border-white translate-x-1 translate-y-1 shadow-sm">
          <Plus size={22} strokeWidth={3} />
      </div>
    </div>
  );

  // --- EMPTY STATE VIEW ---
  if (cartItems.length === 0) {
     return (
        <div className="bg-white min-h-screen flex flex-col pb-24">
          <div className="p-4 flex items-center justify-center relative border-b border-gray-100 shadow-sm z-10">
             <h1 className="font-black text-xl uppercase tracking-tighter text-gray-900">CARRITO</h1>
             <Link to="/menu" className="absolute right-4 text-gray-800">
                <X size={28} strokeWidth={2.5} />
             </Link>
          </div>
          
          <DeliveryInfo />
          {/* Badge hidden in empty state as per reference */}
          <PromoBanner showBadge={false} />

          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-10">
             
             <EmptyCartIcon />

             <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter scale-y-90">TU CARRITO ESTÁ VACÍO</h2>
             <p className="text-gray-600 text-center mb-10 px-6 font-bold leading-tight text-lg">
                ¿Qué esperas? Explora nuestro menú y empieza a comprar.
             </p>
             
             <Link to="/menu" className="bg-[#1A1A1A] text-white px-12 py-4 rounded-full font-bold text-lg w-full max-w-xs text-center shadow-xl hover:bg-black transition-colors">
                Explorar menú
             </Link>
          </div>
        </div>
     );
  }

  // --- FILLED STATE VIEW ---
  return (
    <div className="bg-white min-h-screen pb-32">
       {/* Sticky Header */}
       <div className="p-4 flex items-center justify-center relative border-b border-gray-100 bg-white sticky top-0 z-30 shadow-sm">
             <h1 className="font-black text-xl uppercase tracking-tighter text-gray-900">CARRITO</h1>
             <Link to="/menu" className="absolute right-4 text-gray-800">
                <X size={28} strokeWidth={2.5} />
             </Link>
       </div>

       <div className="overflow-y-auto">
        <DeliveryInfo />
        <PromoBanner showBadge={true} />

        <div className="px-6 space-y-8 mt-2">
            {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0 pt-2">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium text-gray-800 text-sm uppercase tracking-wide">{item.nombre}</h3>
                                {item.descripcion && <p className="text-xs text-gray-400 mt-1">{item.descripcion}</p>}
                            </div>
                            <span className="font-bold text-gray-900 text-lg">$ {item.precio.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-800 hover:text-gray-800 transition-colors"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="font-bold text-xl w-4 text-center">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 rounded-full border-gray-800 flex items-center justify-center text-gray-800 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {/* Actions Links */}
                        <div className="flex gap-6 text-base text-gray-800">
                            <button className="hover:underline">Editar</button>
                            <button onClick={() => removeFromCart(item.id)} className="hover:underline">Eliminar</button>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Separator */}
            <div className="border-t border-gray-100 my-4"></div>
        </div>
       </div>

       {/* Bottom Floating Bar */}
       <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
           <button className="w-full bg-[#f36b01] text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl flex justify-between items-center hover:bg-[#d45d00] transition-colors active:scale-95 transform duration-100">
               <span>Ir a pagar</span>
               <span>$ {total.toFixed(2)}</span>
           </button>
       </div>
    </div>
  );
}

export default ClientCart;
