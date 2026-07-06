import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { convertToWebP } from "../../../utils/imageUtils";
import { FiPlus, FiX } from "react-icons/fi";

export const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null); // Nuevo estado
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    categoryId: "",
    specs: {},
    image: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Filtrado local

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = p.name?.toLowerCase().includes(term);
    const idMatch = p.id?.toString().includes(term);
    const categoryMatch = p.categories?.name?.toLowerCase().includes(term);
    return (
      (nameMatch || idMatch || categoryMatch) &&
      (categoryFilter === "all" || p.category_id?.toString() === categoryFilter)
    );
  });

  const paginatedProducts = filteredProducts.slice(
    page * pageSize,
    (page + 1) * pageSize
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, categoryFilter]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: p } = await supabase
      .from("products")
      .select("*, categories(name)");
    const { data: c } = await supabase.from("categories").select("*");
    // Aseguramos que 'image' siempre sea un array
    setProducts(
      (p || []).map((prod) => ({
        ...prod,
        image: Array.isArray(prod.image) ? prod.image : [],
      }))
    );
    setCategories(c || []);
  };

  const handleSave = async (payload) => {
    if (isSaving) return; // Protección: no hacer nada si ya se está guardando

    setIsSaving(true); // Bloquear al inicio

    let finalImages = payload.image || [];

    // 1. Subir nuevos archivos
    if (payload.imageFiles && payload.imageFiles.length > 0) {
      try {
        const uploadPromises = payload.imageFiles.map(async (file) => {
          if (!file) return null;
          const webpFile = await convertToWebP(file);
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}.webp`;
          const { error } = await supabase.storage
            .from("products")
            .upload(fileName, webpFile);
          if (error) throw error;
          return supabase.storage.from("products").getPublicUrl(fileName).data
            .publicUrl;
        });

        const newUrls = (await Promise.all(uploadPromises)).filter(
          (url) => url !== null
        );
        finalImages = [...finalImages, ...newUrls];
        setIsOpen(false);
        loadData();
      } catch (error) {
        console.error("Error al subir:", error);
        alert("Error al procesar las imágenes.");
        return;
      } finally {
        setIsSaving(false); // Desbloquear siempre, pase lo que pase
      }
    }

    const finalPayload = {
      name: payload.name,
      price: parseFloat(payload.price) || 0,
      stock: parseInt(payload.stock) || 0,
      category_id: parseInt(payload.categoryId),
      specs: payload.specs || {},
      image: finalImages, // Guardamos el array completo
      tag: payload.tag || "general",
    };

    if (payload.id) {
      await supabase.from("products").update(finalPayload).eq("id", payload.id);
    } else {
      await supabase.from("products").insert([finalPayload]);
    }

    setIsOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      await supabase.from("products").delete().eq("id", id);
      loadData();
    }
  };
  const handleViewDetail = (item) => {
    setDetailProduct(item);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
        <div>
          <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
            Manten tu inventario al día
          </span>
          <h3 className="text-xl font-black uppercase mt-1">Productos </h3>
        </div>
        <button
          onClick={() => {
            setFormData({
              id: null,
              name: "",
              price: "",
              categoryId: "",
              specs: {},
              image: [],
              imageFiles: [],
            });
            setIsOpen(true);
          }}
          className="font-mono flex items-center justify-center gap-2 bg-[#ffb800] text-black font-bold text-xs uppercase tracking-wider px-6 py-4 transition-all duration-300 hover:bg-white cursor-pointer"
        >
          + Publicar Nuevo Producto
        </button>
      </div>

      <ProductTable
        products={paginatedProducts}
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        // PASA LA FUNCIÓN REAL AQUÍ:
        onEdit={(p) => {
          setFormData({
            ...p,
            categoryId: p.category_id?.toString(),
            imageFiles: [],
          });
          setIsOpen(true);
        }}
        onDelete={handleDelete}
        onViewDetail={handleViewDetail}
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="cursor-pointer p-2 border border-[#333535] text-xs"
          >
            ANTERIOR
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="cursor-pointer p-2 border border-[#333535] text-xs"
          >
            SIGUIENTE
          </button>
        </div>
      )}
      {isOpen && (
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[500px] max-h-[90vh] overflow-y-auto p-8 relative">
            {/* Botón Cerrar */}
            <button
              onClick={() => setDetailProduct(null)}
              className="cursor-pointer absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            {/* Cabecera */}
            <div className="mb-6">
              <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
                // Ficha técnica del producto
              </span>
              <h3 className="text-lg font-bold uppercase mt-1">
                {detailProduct.name}
              </h3>
            </div>

            {/* Cuerpo del Modal */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-2 my-6">
                {detailProduct.image?.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Prod ${i}`}
                    className="w-full h-24 object-cover border border-[#333535]/40"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111414] p-3 border border-[#333535]/40">
                  <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                    Categoría
                  </label>
                  <span className="text-sm text-white">
                    {detailProduct.categories?.name || "N/A"}
                  </span>
                </div>
                <div className="bg-[#111414] p-3 border border-[#333535]/40">
                  <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                    Precio
                  </label>
                  <span className="text-sm text-white">
                    ${detailProduct.price}
                  </span>
                </div>
                <div className="bg-[#111414] p-3 border border-[#333535]/40">
                  <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                    Stock
                  </label>
                  <span className="text-sm text-white">
                    {detailProduct.stock || 0}
                  </span>
                </div>
                <div className="bg-[#111414] p-3 border border-[#333535]/40">
                  <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                    Tag
                  </label>
                  <span className="text-sm text-white uppercase">
                    {detailProduct.tag || "-"}
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div>
                <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-2">
                  Especificaciones
                </label>
                <div className="bg-[#111414] border border-[#333535]/40 p-1">
                  {detailProduct.specs &&
                  Object.keys(detailProduct.specs).length > 0 ? (
                    Object.entries(detailProduct.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between px-3 py-2 border-b border-[#333535]/20 last:border-0"
                      >
                        <span className="text-xs text-gray-500 capitalize">
                          {key}:
                        </span>
                        <span className="text-xs text-white font-mono">
                          {value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 italic text-xs p-3">
                      Sin especificaciones registradas.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setDetailProduct(null)}
              className="cursor-pointer font-mono w-full bg-[#333535] text-white text-xs uppercase py-4 mt-6 tracking-widest transition-all hover:bg-[#ffb800] hover:text-black"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
