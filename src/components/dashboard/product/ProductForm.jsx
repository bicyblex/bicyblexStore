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
  "kits-electricos": [{ key: "descripcion", label: "Descripcion" }],
  accesorios: [
    { key: "Dato 1", label: "Dato 1" },
    { key: "Dato 2", label: "Dato 2" },
    { key: "Dato 3", label: "Dato 3" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="mb-6">
          <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
            // Terminal de Gestión de Inventario
          </span>
          <h3 className="text-lg font-bold uppercase mt-1">
            {formData.id ? "Modificar Producto" : "Registrar Nuevo Producto"}
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-5"
        >
          <div>
            <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Nombre del producto
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                Precio
              </label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800]"
              />
            </div>
            <div>
              <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
                Stock
              </label>
              <input
                required
                type="number"
                value={formData.stock || ""}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800]"
              />
            </div>
          </div>

          <div>
            <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Categoría
            </label>
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
              className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white focus:outline-none focus:border-[#ffb800] uppercase"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Imagen del Producto
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, imageFile: e.target.files[0] })
              }
              className="w-full bg-[#111414] border border-[#333535]/40 p-3 font-mono text-xs text-gray-400 file:mr-4 file:bg-[#ffb800] file:text-black file:font-bold file:text-[10px] file:uppercase cursor-pointer"
            />
          </div>

          {fields.length > 0 && (
            <div className="pt-2 border-t border-[#333535]/30">
              <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-3">
                Especificaciones Técnicas
              </label>
              {/* Grid de 2 columnas para las especificaciones */}
              <div className="grid grid-cols-1 gap-3">
                {fields.map((f) => (
                  <input
                    key={f.key}
                    placeholder={f.label}
                    required
                    value={formData.specs[f.key] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, [f.key]: e.target.value },
                      })
                    }
                    className="w-full bg-[#111414] border border-[#333535]/40 p-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[#ffb800]"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="font-mono w-full bg-[#ffb800] text-black font-bold text-xs uppercase py-4 mt-2 tracking-widest transition-all hover:bg-white"
          >
            Guardar en el sistema
          </button>
        </form>
      </div>
    </div>
  );
};
