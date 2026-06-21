import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { FiX } from "react-icons/fi";

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
      const file = payload.imageFile;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("products") // Asegúrate de que este bucket exista en Supabase
        .upload(fileName, file);

      if (error) throw error;

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 2. Guardar en la base de datos
    const finalPayload = {
      name: payload.name,
      price: parseFloat(payload.price) || 0,
      stock: parseInt(payload.stock) || 0,
      category_id: parseInt(payload.categoryId),
      specs: payload.specs || {},
      image: imageUrl, // Aquí guardamos la URL de la imagen
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
        className="bg-[#ffb800] px-6 py-3 font-bold text-black mb-6 uppercase text-xs"
      >
        + Nuevo Producto
      </button>

      <ProductTable
        products={products}
        onEdit={(p) => {
          setFormData({ ...p, categoryId: p.category_id?.toString() });
          setIsOpen(true);
        }}
        onDelete={handleDelete}
        onViewDetail={handleViewDetail}
      />

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
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
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
              className="font-mono w-full bg-[#333535] text-white text-xs uppercase py-4 mt-6 tracking-widest transition-all hover:bg-[#ffb800] hover:text-black"
            >
              Cerrar Terminal
            </button>
          </div>
        </div>
      )}
    </>
  );
};
