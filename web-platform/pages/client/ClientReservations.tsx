
import React, { useState } from 'react';
import { ReservaService } from '../../services/api';
import { MapPin, Calendar, Clock, Users, User, Phone, CheckCircle, Plus, Minus, ChevronRight, ExternalLink } from 'lucide-react';

const ClientReservations: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    telefonoCliente: '',
    fecha: '',
    hora: '',
    numeroPersonas: 2
  });
  const [submitted, setSubmitted] = useState(false);

  // Business Info
  const ADDRESS = "Av. República del Salvador y Portugal, Quito";
  const PHONE_NUMBER = "0983785934";
  const PHONE_DISPLAY = "098 378 5934";
  // Updated map link to use the address query directly for better accuracy
  const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await ReservaService.create(formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateGuests = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      numeroPersonas: Math.max(1, Math.min(20, prev.numeroPersonas + delta))
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">¡Reserva Lista!</h2>
        <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
          Te esperamos el <span className="text-gray-900 font-bold">{formData.fecha}</span> a las <span className="text-gray-900 font-bold">{formData.hora}</span>.
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm mb-8 border border-gray-100">
            <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">A nombre de</span>
                <span className="font-bold text-gray-800">{formData.nombreCliente}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Mesa para</span>
                <span className="font-bold text-gray-800">{formData.numeroPersonas} personas</span>
            </div>
        </div>

        <button 
            onClick={() => setSubmitted(false)} 
            className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold w-full max-w-xs shadow-xl"
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-center">
        <h1 className="font-black text-xl uppercase tracking-tighter text-gray-900">Nueva Reserva</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto space-y-8">
        
        <form id="reservationForm" onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section: Personal Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#f36b01] uppercase tracking-wider mb-2 flex items-center gap-2">
                <User size={16} /> Tus Datos
            </h2>
            
            {/* Input Name */}
            <div className="bg-gray-50 rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Nombre Completo</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        name="nombreCliente"
                        required
                        className="w-full bg-transparent outline-none text-gray-900 font-black text-lg placeholder-gray-300"
                        placeholder="Ej. Juan Pérez"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Input Phone */}
            <div className="bg-gray-50 rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Teléfono</label>
                <div className="flex items-center gap-2">
                    <input
                        type="tel"
                        name="telefonoCliente"
                        required
                        className="w-full bg-transparent outline-none text-gray-900 font-black text-lg placeholder-gray-300"
                        placeholder="099 999 9999"
                        onChange={handleChange}
                    />
                </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Date & Time */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#f36b01] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar size={16} /> ¿Cuándo vienes?
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                    <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        required
                        className="w-full bg-transparent outline-none text-gray-900 font-bold text-base"
                        onChange={handleChange}
                    />
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3 border-2 border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                    <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Hora</label>
                    <input
                        type="time"
                        name="hora"
                        required
                        className="w-full bg-transparent outline-none text-gray-900 font-bold text-base"
                        onChange={handleChange}
                    />
                </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Guests (Visual Counter) */}
          <div className="space-y-4">
             <h2 className="text-sm font-bold text-[#f36b01] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} /> ¿Cuántos son?
            </h2>
             
             <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-500 font-medium">Personas en la mesa</span>
                
                <div className="flex items-center gap-4 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                    <button 
                        type="button"
                        onClick={() => updateGuests(-1)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 active:scale-95 transition-all"
                    >
                        <Minus size={20} />
                    </button>
                    <span className="font-black text-2xl text-gray-900 w-8 text-center">{formData.numeroPersonas}</span>
                    <button 
                        type="button"
                        onClick={() => updateGuests(1)}
                        className="w-10 h-10 rounded-lg bg-[#f36b01] text-white flex items-center justify-center hover:bg-[#d45d00] active:scale-95 transition-all shadow-md shadow-orange-200"
                    >
                        <Plus size={20} />
                    </button>
                </div>
             </div>
          </div>

        </form>

        {/* Location Card */}
        <div className="mt-8">
            <h2 className="text-sm font-bold text-[#f36b01] uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin size={16} /> Nuestra Ubicación
            </h2>
            
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-gray-300">
                    {/* Mock Map Header */}
                    <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center group-hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2 text-gray-800 font-bold text-sm truncate pr-2">
                            <MapPin size={18} className="text-[#f36b01] flex-shrink-0" />
                            <span className="truncate">Av. República del Salvador y Portugal</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-[#f36b01] flex-shrink-0" />
                    </div>
                    
                    {/* Map Visual Representation - REAL GOOGLE MAPS EMBED */}
                    <div className="h-48 relative bg-gray-100">
                        {/* Google Maps Embed */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790242566088!2d-78.4824587250352!3d-0.18151783547847935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7c364132b9%3A0xc477963d0473507!2sAv.+Rep%C3%BAblica+del+Salvador+%26+Portugal%2C+Quito!5e0!3m2!1ses!2sec!4v1716920000000!5m2!1ses!2sec" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                        ></iframe>
                        
                        {/* Overlay to prevent interaction with iframe and allow clicking the parent link */}
                        <div className="absolute inset-0 bg-transparent z-10 cursor-pointer"></div>

                        {/* Custom Pin Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="flex flex-col items-center -mt-6 transform group-hover:scale-110 transition-transform duration-300 relative">
                                <div className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg mb-2 whitespace-nowrap text-[#f36b01] border border-gray-100">
                                    ¡Te esperamos aquí!
                                </div>
                                <div className="relative">
                                    <MapPin size={40} className="text-[#f36b01] fill-[#f36b01] drop-shadow-xl relative z-10" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-full blur-[2px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={14} className="text-[#f36b01]" /> 
                            <span className="font-semibold">10:00 AM - 11:00 PM</span>
                        </div>
                        <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-gray-600 justify-end hover:text-[#f36b01] z-10 relative">
                            <Phone size={14} className="text-[#f36b01]" /> 
                            <span className="font-semibold">{PHONE_DISPLAY}</span>
                        </a>
                    </div>
                </div>
            </a>
        </div>

      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 z-20">
        <button 
            type="submit" 
            form="reservationForm"
            className="w-full bg-[#f36b01] text-white py-4 rounded-full font-black text-lg uppercase tracking-wide shadow-xl shadow-orange-200 hover:bg-[#d45d00] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
            Confirmar Reserva <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ClientReservations;
