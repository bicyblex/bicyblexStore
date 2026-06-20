import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
// Iconos para la sección de noticias
import {
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiFileText,
} from "react-icons/fi";

export default function NewsLetterForm() {
  // Estados de los Datos
  const [newsList, setNewsList] = useState([]);

  // Estados de los Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Estado del modo del modal ("create" | "edit")
  const [modalMode, setModalMode] = useState("create");

  // Noticia seleccionada
  const [selectedNews, setSelectedNews] = useState(null);

  // Estados del Formulario
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Estados de utilidad
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. Cargar Noticias desde Supabase
  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar noticias:", error.message);
    } else if (data) {
      setNewsList(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 2. Abrir Modal para Crear
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedNews(null);
    setTitle("");
    setContent("");
    setImageFile(null);
    setIsFormModalOpen(true);
  };

  // 3. Abrir Modal para Editar
  const openEditModal = (news) => {
    setModalMode("edit");
    setSelectedNews(news);
    setTitle(news.title);
    setContent(news.content);
    setImageFile(null); // Solo se reemplaza si sube uno nuevo
    setIsFormModalOpen(true);
  };

  // 4. Abrir Modal de Inspección
  const openViewModal = (news) => {
    setSelectedNews(news);
    setIsViewModalOpen(true);
  };

  // 5. Abrir Modal de Eliminación
  const openDeleteModal = (news) => {
    setSelectedNews(news);
    setIsDeleteModalOpen(true);
  };

  // 6. Capturar archivo de imagen
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // 7. Guardar Noticia (Insert / Update)
  const handleSaveNews = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let imageUrl = selectedNews?.image || "";

      // Subir imagen al Storage si se seleccionó una nueva
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("news")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("news")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // 🛠️ 1. Generar Slug automático basado en el título
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // 🛠️ 2. Generar Excerpt automático basado en el contenido (Máx 150 caracteres)
      const cleanContent = content.trim();
      const generatedExcerpt =
        cleanContent.length > 150
          ? `${cleanContent.substring(0, 147)}...`
          : cleanContent;

      const newsPayload = {
        title,
        content,
        image: imageUrl,
        slug: generatedSlug,
        excerpt: generatedExcerpt, // 👈 ¡Inyectamos el extracto requerido aquí!
      };

      if (modalMode === "create") {
        const { error } = await supabase.from("news").insert([newsPayload]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("news")
          .update(newsPayload)
          .eq("id", selectedNews.id);
        if (error) throw error;
      }

      setIsFormModalOpen(false);
      fetchNews();
    } catch (error) {
      alert(`Error en la operación de noticias: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // 8. Eliminar Noticia
  const handleDeleteNews = async () => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", selectedNews.id);

      if (error) throw error;
      setIsDeleteModalOpen(false);
      fetchNews();
    } catch (error) {
      alert(`No se pudo eliminar el boletín: ${error.message}`);
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
            Novedades y actualizaciones de la plataforma
          </span>
          <h3 className="text-xl font-black uppercase mt-1">Noticias</h3>
        </div>
        <button
          onClick={openCreateModal}
          className="font-mono flex items-center justify-center gap-2 bg-[#ffb800] text-black font-bold text-xs uppercase tracking-wider px-6 py-4 transition-all duration-300 hover:bg-white"
        >
          <FiPlus className="text-base" /> PUBLICAR NUEVA NOTICIA
        </button>
      </div>

      {/* TABLA DE NOTICIAS */}
      <div className="bg-[#080a0a] border border-[#333535]/20 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            Sincronizando feed de novedades...
          </div>
        ) : newsList.length === 0 ? (
          <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            No hay noticias publicadas en el sistema.
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#333535]/30 bg-[#0d1010]">
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4 w-[80px]">
                  ID
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
                  Título de la Noticia
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
                  Fecha de Publicación
                </th>
                <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4 text-right w-[160px]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333535]/10">
              {newsList.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#111414]/40 transition-colors"
                >
                  <td className="font-mono text-xs text-gray-500 p-4">
                    #{newsList.length - idx}
                  </td>
                  <td className="text-sm font-bold p-4 uppercase tracking-wide truncate max-w-[300px]">
                    {item.title}
                  </td>
                  <td className="font-mono text-xs text-gray-400 p-4">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "---"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openViewModal(item)}
                        className="p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-white hover:border-white transition-colors"
                        title="Ver contenido"
                      >
                        <FiEye size={14} />
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-[#ffb800] hover:border-[#ffb800] transition-colors"
                        title="Editar"
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
          <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            <div className="mb-6">
              <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
                // Terminal de Redacción
              </span>
              <h3 className="text-lg font-bold uppercase mt-1">
                {modalMode === "create"
                  ? "Redactar Nueva Noticia"
                  : "Modificar Boletín"}
              </h3>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-5">
              <div>
                <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Título de la entrada
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800]"
                />
              </div>

              <div>
                <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Cuerpo del artículo
                </label>
                <textarea
                  rows="6"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800] resize-none"
                  placeholder="Escribe el contenido principal de la noticia..."
                />
              </div>

              <div>
                <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  {modalMode === "edit"
                    ? "Cambiar Imagen de portada (Opcional)"
                    : "Imagen de Portada"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={modalMode === "create"}
                  onChange={handleFileChange}
                  className="w-full bg-[#111414] border border-[#333535]/40 p-3 font-mono text-xs text-gray-400 file:mr-4 file:bg-[#ffb800] file:text-black file:font-bold file:text-[10px] file:uppercase cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="font-mono w-full bg-[#ffb800] text-black font-bold text-xs uppercase py-4 tracking-widest transition-all hover:bg-white disabled:opacity-50"
              >
                {actionLoading
                  ? "TRANSMITIENDO DATOS..."
                  : "PUBLICAR EN LA RED"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── 2. MODAL: PREVISUALIZACIÓN DE NOTICIA ─── */}
      {isViewModalOpen && selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[550px] max-h-[85vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            <span className="font-mono text-[#ffb800] text-[10px] font-bold uppercase tracking-widest block">
              // Vista de Lectura
            </span>
            <h3 className="text-xl font-black uppercase mt-1 mb-4 border-b border-[#333535]/20 pb-2 leading-tight">
              {selectedNews.title}
            </h3>

            <div className="space-y-4">
              {selectedNews.image && (
                <div className="w-full h-[240px] bg-[#111414] border border-[#333535]/20 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase">
                <FiFileText /> Publicado el:{" "}
                {selectedNews.created_at
                  ? new Date(selectedNews.created_at).toLocaleDateString()
                  : "---"}
              </div>

              <div className="text-sm text-gray-300 bg-[#111414] p-4 border border-[#333535]/20 leading-relaxed whitespace-pre-wrap">
                {selectedNews.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. MODAL: ELIMINAR NOTICIA ─── */}
      {isDeleteModalOpen && selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#080a0a] border border-red-900/40 w-full max-w-[400px] p-6 text-center">
            <span className="font-mono text-red-500 text-[10px] font-bold uppercase tracking-widest block">
              ⚠️ Alerta de Eliminación
            </span>
            <h4 className="text-base font-bold uppercase mt-2 mb-4">
              ¿Retirar esta publicación?
            </h4>
            <p className="text-xs text-gray-400 font-mono mb-6 bg-red-950/10 border border-red-950/30 p-3 truncate">
              {selectedNews.title}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="font-mono border border-[#333535]/40 text-gray-400 hover:bg-[#111414] hover:text-white text-xs uppercase py-3"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteNews}
                disabled={actionLoading}
                className="font-mono bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 disabled:opacity-50"
              >
                {actionLoading ? "PROCESANDO..." : "SÍ, ELIMINAR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
