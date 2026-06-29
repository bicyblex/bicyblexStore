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
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    categoryId: "",
    specs: {},
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Filtrado local

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();

    // Convertimos todos los valores a string para buscar "parecidos" en todos los campos
    const nameMatch = p.name?.toLowerCase().includes(term);
    const idMatch = p.id?.toString().includes(term);
    const priceMatch = p.price?.toString().includes(term); // Buscamos si el precio contiene el texto
    const categoryMatch = p.categories?.name?.toLowerCase().includes(term);

    // Búsqueda general: Si coincide en cualquiera de los campos anteriores
    const matchesSearch = nameMatch || idMatch || priceMatch || categoryMatch;

    // Filtro por Categoría (el select)
    const matchesCat =
      categoryFilter === "all" || p.category_id?.toString() === categoryFilter;

    // El producto debe cumplir la búsqueda general Y el filtro de categoría
    return matchesSearch && matchesCat;
  });
  // Paginación local
  const paginatedProducts = filteredProducts.slice(
    page * pageSize,
    (page + 1) * pageSize
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Resetear página al filtrar
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
    setProducts(p || []);
    setCategories(c || []);
  };

  const handleSave = async (payload) => {
    let imageUrl = payload.image; // Si es edición, mantenemos la URL actual

    // 1. Subir imagen si existe un archivo nuevo
    if (payload.imageFile) {
      try {
        // Convertimos el archivo original a WebP antes de subirlo
        const webpFile = await convertToWebP(payload.imageFile);

        // Usamos .webp como extensión fija
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.webp`;

        const { data, error } = await supabase.storage
          .from("products")
          .upload(fileName, webpFile); // Subimos el nuevo archivo optimizado

        if (error) throw error;

        // Obtener URL pública
        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      } catch (error) {
        console.error("Error al procesar/subir la imagen:", error);
        alert("Hubo un error al procesar la imagen. Inténtalo de nuevo.");
        return; // Detenemos la ejecución si la imagen falla
      }
    }

    // 2. Guardar en la base de datos
    const finalPayload = {
      name: payload.name,
      price: parseFloat(payload.price) || 0,
      stock: parseInt(payload.stock) || 0,
      category_id: parseInt(payload.categoryId),
      specs: payload.specs || {},
      image: imageUrl, // Aquí guardamos la URL pública (original o la nueva en webp)
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
    if (window.confirm("¿Eliminar?")) {
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
          setFormData({ ...p, categoryId: p.category_id?.toString() });
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
            className="p-2 border border-[#333535] text-xs"
          >
            ANTERIOR
          </button>
          <span className="p-2 text-xs font-mono">
            Pág {page + 1} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="p-2 border border-[#333535] text-xs"
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
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                className="w-full h-48 object-cover border border-[#333535]/40"
              />

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
