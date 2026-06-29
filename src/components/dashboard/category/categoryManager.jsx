import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiFolder } from "react-icons/fi";

export default function CategoriesForm() {
  // Estados de los Datos
  const [categoriesList, setCategoriesList] = useState([]);

  // Estados de los Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Estado del modo ("create" | "edit")
  const [modalMode, setModalMode] = useState("create");

  // Categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Estados del Formulario
  const [name, setName] = useState("");

  // Estados de utilidad
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. Cargar Categorías desde Supabase
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error al cargar categorías:", error.message);
    } else if (data) {
      setCategoriesList(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Abrir Modal para Crear
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCategory(null);
    setName("");
    setIsFormModalOpen(true);
  };

  // 3. Abrir Modal para Editar
  const openEditModal = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setName(category.name);
    setIsFormModalOpen(true);
  };

  // 4. Abrir Modal de Eliminación
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // 5. Guardar Categoría (Insert / Update)
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      // Generar slug automático a partir del nombre
      const generatedSlug = name
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const categoryPayload = {
        name,
        slug: generatedSlug,
      };

      if (modalMode === "create") {
        const { error } = await supabase
          .from("categories")
          .insert([categoryPayload]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("categories")
          .update(categoryPayload)
          .eq("id", selectedCategory.id);
        if (error) throw error;
      }

      setIsFormModalOpen(false);
      fetchCategories();
    } catch (error) {
      alert(`Error en la operación de categorías: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Eliminar Categoría
  const handleDeleteCategory = async () => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", selectedCategory.id);

      if (error) throw error;
      setIsDeleteModalOpen(false);
      fetchCategories();
    } catch (error) {
      alert(`No se pudo eliminar la categoría: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* SECCIÓN ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
        <div>
          <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
            Clasificación del inventario general
          </span>
          <h3 className="text-xl font-black uppercase mt-1">Categorías</h3>
        </div>
        <button
          onClick={openCreateModal}
          className="cursor-pointer font-mono flex items-center justify-center gap-2 bg-[#ffb800] text-black font-bold text-xs uppercase tracking-wider px-6 py-4 transition-all duration-300 hover:bg-white"
        >
          <FiPlus className="text-base" /> AGREGAR CATEGORÍA
        </button>
      </div>

      {/* TABLA DE CATEGORÍAS */}
      <div className="bg-[#080a0a] border border-[#333535]/20 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            Sincronizando índices del sistema...
          </div>
        ) : categoriesList.length === 0 ? (
          <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            No hay categorías registradas.
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-[#333535]/30 bg-[#0d1010]">
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4 w-[80px]">
                  ID
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
                  Nombre de Categoría
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
                  Slug Indexado
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4 text-right w-[120px]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333535]/10">
              {categoriesList.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#111414]/40 transition-colors"
                >
                  <td className="font-mono text-xs text-gray-500 p-4">
                    #{idx + 1}
                  </td>
                  <td className="text-sm font-bold p-4 uppercase tracking-wide">
                    {item.name}
                  </td>
                  <td className="font-mono text-xs text-[#ffb800]/80 p-4">
                    /{item.slug}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-[#ffb800] hover:border-[#ffb800] transition-colors"
                        title="Modificar"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ─── 1. MODAL: FORMULARIO (CREAR / EDITAR) ─── */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[450px] p-8 relative">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="cursor-pointer absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            <div className="mb-6">
              <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
                Crea una nueva categoria
              </span>
              <h3 className="text-lg font-bold uppercase mt-1">
                {modalMode === "create"
                  ? "Nueva Categoría"
                  : "Modificar Categoría"}
              </h3>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-5">
              <div>
                <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Nombre de la Categoría
                </label>
                <div className="relative flex items-center">
                  <FiFolder className="absolute left-3 text-gray-500 text-sm" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Repuestos, Cascos, Ropa..."
                    className="w-full bg-[#111414] border border-[#333535]/40 p-3 pl-10 text-sm text-white focus:outline-none focus:border-[#ffb800] uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="cursor-pointer font-mono w-full bg-[#ffb800] text-black font-bold text-xs uppercase py-4 tracking-widest transition-all hover:bg-white disabled:opacity-50"
              >
                {actionLoading ? "REGISTRANDO..." : "GUARDAR CATEGORÍA"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── 2. MODAL: ELIMINAR CATEGORÍA ─── */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#080a0a] border border-red-900/40 w-full max-w-[400px] p-6 text-center">
            <span className="font-mono text-red-500 text-[10px] font-bold uppercase tracking-widest block">
              ⚠️ Alerta del Sistema
            </span>
            <h4 className="text-base font-bold uppercase mt-2 mb-4">
              ¿Eliminar categoría?
            </h4>
            <p className="text-xs text-gray-400 font-mono mb-6 bg-red-950/10 border border-red-950/30 p-3 truncate">
              {selectedCategory.name}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="font-mono border border-[#333535]/40 text-gray-400 hover:bg-[#111414] hover:text-white text-xs uppercase py-3"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteCategory}
                disabled={actionLoading}
                className="font-mono bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 disabled:opacity-50"
              >
                {actionLoading ? "ELIMINANDO..." : "SÍ, CONFIRMAR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
