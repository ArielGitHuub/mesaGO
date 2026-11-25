
import React, { useEffect, useState } from 'react';
import { NotesService } from '../../services/api';
import { StaffNote } from '../../types';
import { StickyNote, Trash2, Plus, Save, X, Edit2 } from 'lucide-react';

const AdminNotes: React.FC = () => {
  const [notes, setNotes] = useState<StaffNote[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<StaffNote>>({
    titulo: '',
    mensaje: '',
    prioridad: 'Media'
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await NotesService.getAll();
    setNotes(data);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
        await NotesService.update(formData.id, formData);
    } else {
        await NotesService.create(formData as any);
    }
    setIsModalOpen(false);
    loadNotes();
    setFormData({ titulo: '', mensaje: '', prioridad: 'Media' });
  };

  const handleDelete = async (id: number) => {
    if(confirm('¿Borrar esta nota?')) {
        await NotesService.delete(id);
        loadNotes();
    }
  };

  const openEdit = (note: StaffNote) => {
      setFormData(note);
      setIsModalOpen(true);
  };

  const openCreate = () => {
      setFormData({ titulo: '', mensaje: '', prioridad: 'Media' });
      setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notas de Staff</h1>
            <p className="text-gray-500">Comunicación interna y avisos</p>
        </div>
        <button onClick={openCreate} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-yellow-200 transition-all">
            <Plus size={20}/> Nueva Nota
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map(n => (
            <div key={n.id} className={`p-6 rounded-2xl border relative group transform hover:-rotate-1 transition-all hover:shadow-md ${
                n.prioridad === 'Alta' ? 'bg-red-50 border-red-100 text-red-900' : 
                n.prioridad === 'Media' ? 'bg-yellow-50 border-yellow-100 text-yellow-900' :
                'bg-blue-50 border-blue-100 text-blue-900'
            }`}>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(n)} className="text-gray-400 hover:text-blue-600"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(n.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                </div>
                
                <div className="flex items-center gap-2 mb-2 opacity-70">
                    <StickyNote size={18} />
                    <span className="font-bold uppercase tracking-wider text-xs">{n.fecha}</span>
                    <span className="text-[10px] border border-current px-1 rounded uppercase">{n.prioridad}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{n.titulo}</h3>
                <p className="opacity-90 leading-relaxed text-sm whitespace-pre-wrap">{n.mensaje}</p>
            </div>
        ))}
        {notes.length === 0 && <p className="text-gray-400 text-center col-span-2 py-10">No hay avisos pendientes.</p>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900">{formData.id ? 'Editar Nota' : 'Nueva Nota'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
                </div>
                
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título</label>
                        <input 
                            required 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-yellow-500 outline-none"
                            value={formData.titulo}
                            onChange={e => setFormData({...formData, titulo: e.target.value})}
                            placeholder="Ej: Mesa 4 Dañada"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prioridad</label>
                        <select 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                            value={formData.prioridad}
                            onChange={e => setFormData({...formData, prioridad: e.target.value as any})}
                        >
                            <option value="Baja">Baja (Azul)</option>
                            <option value="Media">Media (Amarillo)</option>
                            <option value="Alta">Alta (Rojo)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mensaje</label>
                        <textarea 
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none h-32 resize-none"
                            value={formData.mensaje}
                            onChange={e => setFormData({...formData, mensaje: e.target.value})}
                            placeholder="Describe el problema..."
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-yellow-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <Save size={20}/> Guardar Nota
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotes;
