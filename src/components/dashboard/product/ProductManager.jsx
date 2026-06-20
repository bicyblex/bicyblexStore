import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";

export const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    </>
  );
};
