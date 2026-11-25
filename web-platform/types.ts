
// Domain Models based on the document

export type InventoryCategory = 'Proteinas' | 'Vegetales' | 'Frutas' | 'Granos' | 'Lacteos' | 'Otros';

export interface Ingrediente {
  id: number;
  nombre: string;
  unidad: string; // Kg, Gr, Unidad
  stockActual: number;
  stockMinimo: number;
  categoria: InventoryCategory;
}

export interface RecetaItem {
  ingredienteId: number;
  cantidadNecesaria: number;
}

// Unified Menu Types
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  ingredients?: string; // New field for detailed ingredients list
  price: number;
  originalPrice?: number;
  image: string;
  disponible?: boolean; // For admin toggling
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface Reserva {
  id: number;
  fecha: string; // ISO Date
  hora: string;
  numeroPersonas: number;
  nombreCliente: string;
  telefonoCliente: string;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}

export interface Coupon {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'store' | 'delivery' | 'auto' | 'limited';
  code: string;
  price?: number;
  originalPrice?: number;
  discountDisplay?: string;
  activo: boolean;
}

export interface StaffNote {
  id: number;
  titulo: string;
  mensaje: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  fecha: string;
}

export interface PublicHoliday {
    date: string;
    localName: string;
    name: string;
}
