
import React, { useState, useEffect } from 'react';
import { NagerDateService, CouponService } from '../../services/api';
import { Tag, Clock, MapPin, Bike, Ticket, Check, ShoppingBag, PartyPopper, CalendarOff, Calendar } from 'lucide-react';
import { Coupon, PublicHoliday } from '../../types';

const ClientCoupons: React.FC = () => {
  // Default filter is 'holiday' to show the section first as requested
  const [filter, setFilter] = useState<'holiday' | 'all' | 'store' | 'delivery' | 'auto'>('holiday');
  const [isHolidayActive, setIsHolidayActive] = useState(false);
  const [activeHolidayName, setActiveHolidayName] = useState<string>('');
  const [upcomingHolidays, setUpcomingHolidays] = useState<PublicHoliday[]>([]);
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        // 1. Check if TODAY is a holiday
        const status = await NagerDateService.isTodayHoliday();
        setIsHolidayActive(status.isHoliday);
        if (status.holidayName) setActiveHolidayName(status.holidayName);

        // 2. Fetch all holidays to show the calendar
        const year = new Date().getFullYear();
        const holidays = await NagerDateService.getHolidays(year);
        
        // Filter only future holidays or today
        const todayStr = new Date().toISOString().split('T')[0];
        const future = holidays.filter(h => h.date >= todayStr).slice(0, 5); // Show next 5
        setUpcomingHolidays(future);

        // 3. Fetch Coupons
        const items = await CouponService.getAll();
        setCoupons(items);
    };
    fetchData();
  }, []);

  const displayedCoupons = coupons.filter(c => {
    if (!c.activo) return false;
    if (filter === 'holiday') {
       return c.type === 'limited';
    }
    if (filter === 'all') {
        return c.type !== 'limited';
    }
    return c.type === filter;
  });

  const handleRedeem = (id: number) => {
    setRedeemed([...redeemed, id]);
  };

  const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', weekday: 'short' };
      return new Date(dateString + 'T00:00:00').toLocaleDateString('es-EC', options);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-center font-black text-2xl uppercase tracking-tight text-gray-900">Cupones</h1>
      </div>

      <div className="overflow-x-auto whitespace-nowrap p-4 bg-white border-b border-gray-100 no-scrollbar">
        <div className="flex space-x-2">
          {/* HOLIDAY TAB - FIRST */}
          <button 
            onClick={() => setFilter('holiday')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${filter === 'holiday' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
          >
            <PartyPopper size={16} /> Feriados
          </button>

          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            <Ticket size={16} /> Todos
          </button>
          <button 
            onClick={() => setFilter('store')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${filter === 'store' ? 'bg-[#f36b01] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            <MapPin size={16} /> En Local
          </button>
          <button 
            onClick={() => setFilter('delivery')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${filter === 'delivery' ? 'bg-[#f36b01] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            <Bike size={16} /> Domicilio
          </button>
          <button 
            onClick={() => setFilter('auto')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${filter === 'auto' ? 'bg-[#f36b01] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            <ShoppingBag size={16} /> Xtra / Recoger
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* HOLIDAY LOCKED STATE + CALENDAR */}
        {filter === 'holiday' && !isHolidayActive && (
            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[250px]">
                    <div className="bg-gray-100 p-6 rounded-full mb-6">
                        <CalendarOff size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-2">
                        ¡Aun no es feriado!
                    </h2>
                    <p className="text-gray-500 max-w-xs mx-auto mb-4 text-sm leading-relaxed">
                        Esta sección es mágica. Aquí aparecerán cupones explosivos <b>automáticamente</b> cuando detectemos una fecha festiva en Ecuador.
                    </p>
                </div>

                {/* UPCOMING HOLIDAYS CALENDAR */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-[#f36b01] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Calendar size={16} /> Próximos Feriados
                    </h3>
                    
                    <div className="space-y-3">
                        {upcomingHolidays.length > 0 ? (
                            upcomingHolidays.map((h, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-transparent hover:border-orange-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-100 text-[#f36b01] font-bold text-xs px-2 py-1 rounded uppercase min-w-[50px] text-center">
                                            {formatDate(h.date).split(',')[0]}
                                        </div>
                                        <span className="font-bold text-gray-700 text-sm">{h.localName}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">{formatDate(h.date).split(',')[1]}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-xs text-center py-2">Cargando calendario...</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* COUPON LIST (Only shows if valid) */}
        {((filter !== 'holiday') || (filter === 'holiday' && isHolidayActive)) && displayedCoupons.map((coupon) => (
          <div key={coupon.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border ${coupon.type === 'limited' ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-gray-100'}`}>
            <div className="relative h-40">
              <img src={coupon.image} alt={coupon.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                 {coupon.type === 'limited' && (
                   <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 shadow-sm animate-pulse">
                     <Clock size={12} /> {activeHolidayName || 'Tiempo Limitado'}
                   </span>
                 )}
                 {coupon.type === 'store' && <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur">Local</span>}
                 {coupon.type === 'delivery' && <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur">Delivery</span>}
                 {coupon.type === 'auto' && <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur">Xtra / Recoger</span>}
              </div>
            </div>

            <div className="p-4 relative">
              <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-gray-200 -mt-[1px]"></div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-gray-50 rounded-full -translate-x-2 -translate-y-2"></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-gray-50 rounded-full translate-x-2 -translate-y-2"></div>

              <div className="mt-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight pr-4">{coupon.title}</h3>
                    <div className="text-right whitespace-nowrap">
                        {coupon.originalPrice && (
                            <span className="block text-xs text-gray-400 line-through">${coupon.originalPrice.toFixed(2)}</span>
                        )}
                        {coupon.price !== undefined ? (
                            <span className="block text-xl font-black text-[#f36b01]">${coupon.price.toFixed(2)}</span>
                        ) : (
                            <span className="block text-xl font-black text-[#f36b01]">{coupon.discountDisplay}</span>
                        )}
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-1 leading-snug">{coupon.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded uppercase">
                        CODIGO: {coupon.code}
                    </div>
                    <button 
                        onClick={() => handleRedeem(coupon.id)}
                        disabled={redeemed.includes(coupon.id)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                            redeemed.includes(coupon.id)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#f36b01] text-white hover:bg-[#d45d00] shadow-lg shadow-orange-200'
                        }`}
                    >
                        {redeemed.includes(coupon.id) ? (
                            <span className="flex items-center gap-1"><Check size={14}/> Canjeado</span>
                        ) : 'Canjear'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* EMPTY STATE FOR OTHER FILTERS */}
        {filter !== 'holiday' && displayedCoupons.length === 0 && (
             <div className="text-center py-10 text-gray-400">
                 <p>No hay cupones disponibles en esta categoría.</p>
             </div>
        )}

      </div>
    </div>
  );
};

export default ClientCoupons;
