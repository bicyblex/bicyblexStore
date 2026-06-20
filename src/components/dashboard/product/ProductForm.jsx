import React from "react";
import { FiX } from "react-icons/fi";

// He ajustado las llaves para que coincidan EXACTAMENTE con tus slugs de la BD
const CONFIG = {
  bicicletas: [
    { key: "aro", label: "Aro" },
    { key: "material", label: "Material" },
    { key: "freno", label: "Freno" },
  ],
  "bicimotos-electricas": [
    { key: "autonomia", label: "Autonomía" },
    { key: "potencia", label: "Potencia" },
    { key: "velocidad", label: "Velocidad" },
  ],
  "kits-electricos": [
    { key: "voltaje", label: "Voltaje" },
    { key: "potencia", label: "Potencia" },
    { key: "bateria", label: "Batería" },
  ],
  accesorios: [
    { key: "material", label: "Material" },
    { key: "color", label: "Color" },
    { key: "compatibilidad", label: "Compatibilidad" },
  ],
};

export const ProductForm = ({
  formData,
  setFormData,
  categories,
  onClose,
  onSave,
}) => {
  // Buscamos la categoría seleccionada
  const cat = categories.find(
    (c) => c.id.toString() === formData.categoryId?.toString()
  );

  // CORRECCIÓN: Usamos el slug directamente (cat.slug), que coincide con el CONFIG
  const fields = cat ? CONFIG[cat.slug] || [] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#080a0a] border border-[#333535] p-8 w-[500px]">
        <button onClick={onClose} className="text-white float-right">
          <FiX />
        </button>
        <h2 className="text-[#ffb800] font-bold mb-4">
          {formData.id ? "EDITAR PRODUCTO" : "NUEVO PRODUCTO"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-4"
        >
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre"
            className="w-full bg-[#111414] p-2 border border-[#333535] text-white"
          />
          <div className="flex gap-4">
            <input
              required
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Precio"
              className="w-full bg-[#111414] p-2 border border-[#333535] text-white"
            />
            <input
              required
              type="number"
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              placeholder="Stock"
              className="w-full bg-[#111414] p-2 border border-[#333535] text-white"
            />
          </div>
          <select
            required
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: e.target.value,
                specs: {},
              })
            }
            className="w-full bg-[#111414] p-2 border border-[#333535] text-white"
          >
            <option value="">Selecciona Categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase">
              Imagen del producto
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, imageFile: e.target.files[0] })
              }
              className="w-full bg-[#111414] p-2 border border-[#333535] text-white text-sm"
            />
          </div>
          {fields.map((f) => (
            <input
              key={f.key}
              placeholder={f.label}
              value={formData.specs[f.key] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, [f.key]: e.target.value },
                })
              }
              className="w-full bg-[#161a1a] p-2 border border-[#333535] text-white"
            />
          ))}
          <button
            type="submit"
            className="w-full bg-[#ffb800] py-3 font-bold uppercase text-black hover:bg-white transition-colors"
          >
            Guardar Producto
          </button>
        </form>
      </div>
    </div>
  );
};
