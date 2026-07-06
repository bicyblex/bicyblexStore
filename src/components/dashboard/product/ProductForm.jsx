import React from "react";
import { FiX, FiPlus } from "react-icons/fi";

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
  isSaving,
}) => {
  const cat = categories.find(
    (c) => c.id.toString() === formData.categoryId?.toString()
  );
  const fields = cat ? CONFIG[cat.slug] || [] : [];

  // Calcular total de imágenes (existentes en BD + nuevos archivos seleccionados)
  const totalImages =
    (formData.image?.length || 0) + (formData.imageFiles?.length || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#080a0a] border border-[#333535]/40 w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="mb-6">
          <span className="font-mono text-[#ffb800] text-[10px] font-bold tracking-widest uppercase block">
            Gestiona tu inventario
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
          className="space-y-4"
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

          {/* Bloque de Imágenes Multiples */}
          <div>
            <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-2">
              Imágenes del Producto ({totalImages}/7)
            </label>
            <div className="space-y-2">
              {/* Imágenes existentes */}
              {formData.image?.map((url, i) => (
                <div
                  key={`ex-${i}`}
                  className="flex gap-2 items-center bg-[#111414] border border-[#333535]/40 p-2"
                >
                  <span className="text-[10px] text-gray-400 truncate w-full">
                    Imagen cargada: {url.split("/").pop()}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        image: formData.image.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              {/* Inputs nuevos */}
              {formData.imageFiles?.map((_, index) => (
                <div key={`new-${index}`} className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const newFiles = [...(formData.imageFiles || [])];
                      newFiles[index] = e.target.files[0];
                      setFormData({ ...formData, imageFiles: newFiles });
                    }}
                    className="w-full bg-[#111414] border border-[#333535]/40 p-2 text-xs text-gray-400 file:bg-[#ffb800] file:text-black file:border-0 file:text-[10px] file:font-bold file:uppercase cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        imageFiles: formData.imageFiles.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              {totalImages < 7 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      imageFiles: [...(formData.imageFiles || []), null],
                    })
                  }
                  className="cursor-pointer w-full py-2 border border-dashed border-[#333535] text-[10px] text-gray-500 hover:text-white hover:border-[#ffb800] transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus /> AGREGAR IMAGEN
                </button>
              )}
            </div>
          </div>

          {fields.length > 0 && (
            <div className="pt-2 border-t border-[#333535]/30">
              <label className="font-mono block text-[10px] font-bold uppercase text-gray-500 mb-3">
                Especificaciones Técnicas
              </label>
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
            disabled={isSaving} // Deshabilita el botón nativamente
            className={`font-mono w-full font-bold text-xs uppercase py-4 mt-2 tracking-widest transition-all ${
              isSaving
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#ffb800] text-black hover:bg-white cursor-pointer"
            }`}
          >
            {isSaving ? "PROCESANDO DATOS..." : "GUARDAR REGISTRO"}
          </button>
        </form>
      </div>
    </div>
  );
};
