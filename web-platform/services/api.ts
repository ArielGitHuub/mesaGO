
import { Reserva, Ingrediente, Coupon, StaffNote, MenuItem, MenuSection, PublicHoliday } from '../types';
import { GoogleGenAI } from "@google/genai";

// --- IA CONFIGURATION ---
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

export const AIService = {
  generateDescription: async (itemName: string, ingredients: string, type: 'dish' | 'coupon'): Promise<string> => {
    if (!ai) return "Descripción no disponible (Sin API Key).";
    try {
      const model = "gemini-2.5-flash";
      let prompt = "";
      
      if (type === 'dish') {
        prompt = `Eres un experto en gastronomía ecuatoriana. Genera una descripción para el plato "${itemName}" con ingredientes: ${ingredients}.
        REGLAS ESTRICTAS:
        1. Máximo 15 palabras.
        2. Tono apetitoso y tradicional.
        3. SOLO TEXTO PLANO. PROHIBIDO usar Markdown, Negritas (**), Cursivas (*), comillas o guiones.
        4. No saludes, solo da la descripción.`;
      } else {
        prompt = `Genera una descripción corta para un cupón: "${itemName}". Detalle: ${ingredients}.
        REGLAS: Máximo 10 palabras, urgente, divertido. SOLO TEXTO PLANO. SIN FORMATO MARKDOWN.`;
      }
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      
      // Limpieza extra por seguridad
      let text = response.text?.trim() || "";
      text = text.replace(/\*/g, '').replace(/_/g, '').replace(/"/g, ''); 
      return text;

    } catch (error) {
      console.error("AI Error:", error);
      return "Delicioso plato ecuatoriano preparado al momento.";
    }
  },

  generateImage: async (itemName: string): Promise<string> => {
    // Mejora del prompt para Pollinations para evitar alucinaciones
    const cleanName = itemName.replace(/[^a-zA-Z ]/g, "");
    const prompt = encodeURIComponent(`photo of ${cleanName} ecuadorian food dish, delicious, realistic, 8k, professional food photography, restaurant lighting, no text`);
    const seed = Math.floor(Math.random() * 1000);
    return `https://image.pollinations.ai/prompt/${prompt}?nologo=true&seed=${seed}&width=400&height=300&model=flux`;
  }
};

// --- CENTRALIZED DATA STORE (Source of Truth) ---

// Initial Menu Data
let FULL_MENU_DATA: Record<string, MenuSection[]> = {
  'entradas': [
    {
      title: 'Ceviches',
      items: [
        { id: 'cev-camaron', name: 'CEVICHE DE CAMARÓN', ingredients: 'Camarón, cebolla, tomate, limón', description: 'Fresquito y clásico ñaño, el favorito de la costa.', price: 6.50, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80', disponible: true },
        { id: 'cev-pescado', name: 'CEVICHE DE PESCADO', ingredients: 'Pescado blanco, limón, cebolla', description: 'Ácido y suave, infalible para empezar el día.', price: 6.00, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=300&q=80', disponible: true },
      ]
    },
    {
      title: 'Empanadas',
      items: [
        { id: 'emp-verde', name: 'EMPANADA DE VERDE', ingredients: 'Masa de verde, queso', description: 'Crujientita y llena de queso manaba.', price: 1.50, image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=300&q=80', disponible: true },
      ]
    }
  ],
  'sopas': [
    {
      title: 'Tradicionales',
      items: [
        { id: 'caldo-gallina', name: 'CALDO DE GALLINA', ingredients: 'Gallina criolla, fideos, papa', description: 'Reconfortante y casero, cura hasta el mal de ojo.', price: 4.50, image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=300&q=80', disponible: true },
        { id: 'encebollado', name: 'ENCEBOLLADO', ingredients: 'Albacora, yuca, cebolla', description: 'El cura todo ecuatoriano, levanta muertos confirmado.', price: 5.50, image: 'https://images.unsplash.com/photo-1574484284008-be94ca452871?auto=format&fit=crop&w=300&q=80', disponible: true },
      ]
    }
  ],
  'fuertes': [
    {
      title: 'Típicos',
      items: [
        { id: 'llapingachos', name: 'LLAPINGACHOS', ingredients: 'Papa, chorizo, huevo, maní', description: 'Delicioso combo serrano con harta salsa de maní.', price: 5.50, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80', disponible: true },
        { id: 'hornado', name: 'HORNADO', ingredients: 'Cerdo, mote, tortilla', description: 'Cerdo suave con cuero crocante que suena rico.', price: 6.50, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80', disponible: true },
      ]
    }
  ]
};

// Initial Coupons Data
let coupons: Coupon[] = [
    { id: 1, title: "Estoy mimido, traeme nomas", description: "15% off a domicilio despues de las 10pm.", image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80", type: 'delivery', code: "MIMIDO15", discountDisplay: "15% OFF", activo: true },
    { id: 2, title: "Nano, abre la puerta", description: "Descuento del 10% si el pedido es despues de las 8pm.", image: "https://images.unsplash.com/photo-1619642686001-72986f773729?auto=format&fit=crop&w=400&q=80", type: 'delivery', code: "PUERTA10", discountDisplay: "10% OFF", activo: true },
    { id: 4, title: "Nanito, atiendame bonito pues", description: "Postre al 50% si comes en el local.", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80", type: 'store', code: "BONITO50", discountDisplay: "50% OFF", activo: true },
];

let notas: StaffNote[] = [];

// Initial Inventory Data
let inventario: Ingrediente[] = [
    { id: 1, nombre: "Lomo Fino", unidad: "Kg", stockActual: 1.2, stockMinimo: 5.0, categoria: 'Proteinas' },
    { id: 2, nombre: "Albacora", unidad: "Kg", stockActual: 8.5, stockMinimo: 5.0, categoria: 'Proteinas' },
    { id: 3, nombre: "Cerdo (Hornado)", unidad: "Kg", stockActual: 15.0, stockMinimo: 8.0, categoria: 'Proteinas' },
    { id: 5, nombre: "Cebolla Paiteña", unidad: "Kg", stockActual: 4.0, stockMinimo: 3.0, categoria: 'Vegetales' },
    { id: 6, nombre: "Yuca", unidad: "Kg", stockActual: 2.0, stockMinimo: 5.0, categoria: 'Vegetales' },
    { id: 8, nombre: "Verde (Plátano)", unidad: "Racimo", stockActual: 5.0, stockMinimo: 10.0, categoria: 'Frutas' },
    { id: 11, nombre: "Arroz", unidad: "Quintal", stockActual: 2.0, stockMinimo: 1.0, categoria: 'Granos' },
    { id: 13, nombre: "Queso Manaba", unidad: "Kg", stockActual: 2.5, stockMinimo: 3.0, categoria: 'Lacteos' },
    { id: 15, nombre: "Aceite", unidad: "Litro", stockActual: 1.0, stockMinimo: 10.0, categoria: 'Otros' }
];

let reservas: Reserva[] = [];

// --- SERVICES ---

export const MenuService = {
  getFullMenu: async (): Promise<Record<string, MenuSection[]>> => {
    return new Promise((resolve) => setTimeout(() => resolve({ ...FULL_MENU_DATA }), 100));
  },
  
  getAllFlat: async (): Promise<(MenuItem & { categoryId: string })[]> => {
    const flat: (MenuItem & { categoryId: string })[] = [];
    Object.keys(FULL_MENU_DATA).forEach(catKey => {
      FULL_MENU_DATA[catKey].forEach(section => {
        section.items.forEach(item => {
          flat.push({ ...item, categoryId: catKey });
        });
      });
    });
    return flat;
  },

  create: async (categoryId: string, item: MenuItem): Promise<void> => {
    const newItem = { ...item, id: Date.now().toString(), disponible: true };
    if (!FULL_MENU_DATA[categoryId]) FULL_MENU_DATA[categoryId] = [{ items: [] }];
    if (FULL_MENU_DATA[categoryId].length === 0) FULL_MENU_DATA[categoryId].push({ items: [] });
    FULL_MENU_DATA[categoryId][0].items.push(newItem);
  },

  update: async (categoryId: string, item: MenuItem): Promise<void> => {
    const sections = FULL_MENU_DATA[categoryId];
    if (!sections) return;
    for (const section of sections) {
        const idx = section.items.findIndex(i => i.id === item.id);
        if (idx !== -1) {
            section.items[idx] = { ...item };
            return;
        }
    }
  },

  delete: async (categoryId: string, itemId: string): Promise<void> => {
    const sections = FULL_MENU_DATA[categoryId];
    if (!sections) return;
    for (const section of sections) {
        section.items = section.items.filter(i => i.id !== itemId);
    }
  },

  toggleAvailability: async (categoryId: string, itemId: string): Promise<void> => {
    const sections = FULL_MENU_DATA[categoryId];
    if (!sections) return;
    for (const section of sections) {
        const item = section.items.find(i => i.id === itemId);
        if (item) {
            item.disponible = !item.disponible;
            return;
        }
    }
  }
};

export const CouponService = {
  getAll: async (): Promise<Coupon[]> => [...coupons],
  create: async (cupon: Omit<Coupon, 'id'>): Promise<Coupon> => {
    const newC = { ...cupon, id: Date.now() };
    coupons.push(newC);
    return newC;
  },
  delete: async (id: number): Promise<void> => {
    coupons = coupons.filter(c => c.id !== id);
  }
};

export const NotesService = {
  getAll: async (): Promise<StaffNote[]> => [...notas],
  create: async (nota: Omit<StaffNote, 'id' | 'fecha'>): Promise<StaffNote> => {
    const newN: StaffNote = { 
      ...nota, 
      id: Date.now(), 
      fecha: new Date().toISOString().split('T')[0] 
    };
    notas.push(newN);
    return newN;
  },
  update: async (id: number, updates: Partial<StaffNote>): Promise<StaffNote> => {
    const index = notas.findIndex(n => n.id === id);
    if (index === -1) throw new Error("Nota no encontrada");
    notas[index] = { ...notas[index], ...updates };
    return notas[index];
  },
  delete: async (id: number): Promise<void> => {
    notas = notas.filter(n => n.id !== id);
  }
};

export const InventoryService = {
  getAll: async (): Promise<Ingrediente[]> => [...inventario],
  
  updateStock: async (id: number, quantity: number): Promise<Ingrediente> => {
    const index = inventario.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Ingrediente no encontrado");
    const newStock = Math.max(0, inventario[index].stockActual + quantity);
    inventario[index].stockActual = parseFloat(newStock.toFixed(2));
    return inventario[index];
  },

  getLowStockAlerts: async (): Promise<Ingrediente[]> => {
    return inventario.filter(i => i.stockActual < i.stockMinimo);
  }
};

export const ReservaService = {
  create: async (reserva: Omit<Reserva, 'id' | 'estado'>): Promise<Reserva> => {
    const newReserva: Reserva = { ...reserva, id: Date.now(), estado: 'Pendiente' };
    reservas.push(newReserva);
    return newReserva;
  },
  getAll: async (): Promise<Reserva[]> => [...reservas]
};

export const NagerDateService = {
    getHolidays: async (year: number): Promise<PublicHoliday[]> => {
        return [
            { date: `${year}-01-01`, localName: "Año Nuevo", name: "New Year's Day" },
            { date: `${year}-02-12`, localName: "Carnaval", name: "Carnival" },
            { date: `${year}-02-13`, localName: "Carnaval", name: "Carnival" },
            { date: `${year}-05-01`, localName: "Día del Trabajo", name: "Labour Day" },
            { date: `${year}-05-24`, localName: "Batalla de Pichincha", name: "Battle of Pichincha" },
            { date: `${year}-08-10`, localName: "Primer Grito de Independencia", name: "First Cry of Independence" },
            { date: `${year}-11-02`, localName: "Día de Difuntos", name: "All Souls' Day" },
            { date: `${year}-12-25`, localName: "Navidad", name: "Christmas Day" }
        ];
    },
    isTodayHoliday: async (): Promise<{ isHoliday: boolean, holidayName?: string }> => {
        // Mock simple
        return { isHoliday: false };
    }
};
