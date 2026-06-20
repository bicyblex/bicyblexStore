import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

export const ProductTable = ({ products, onEdit, onDelete, loading }) => (
  <div className="bg-[#080a0a] border border-[#333535]/20 overflow-x-auto">
    {loading ? (
      <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
        Sincronizando índices del sistema...
      </div>
    ) : products.length === 0 ? (
      <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
        No hay productos registrados.
      </div>
    ) : (
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-[#333535]/30 bg-[#0d1010]">
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              ID
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              Producto
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              Categoría
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              Precio
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              Stock
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4">
              Especificaciones
            </th>
            <th className="font-mono text-[10px] text-gray-500 uppercase tracking-wider p-4 text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#333535]/10">
          {products.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-[#111414]/40 transition-colors"
            >
              <td className="font-mono text-xs text-gray-500 p-4">
                #{item.id}
              </td>
              <td className="text-sm font-bold p-4 uppercase tracking-wide">
                {item.name}
              </td>
              <td className="font-mono text-xs text-[#ffb800]/80 p-4">
                {item.categories?.name || "Sin categoría"}
              </td>
              <td className="text-sm p-4">${item.price}</td>
              <td className="text-sm p-4">{item.stock || 0}</td>
              <td className="p-4">
                <div className="bg-[#0c0f0f] border border-[#333535] p-2 rounded text-[10px] space-y-1 max-w-[200px]">
                  {item.specs &&
                    Object.entries(item.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4">
                        <span className="text-gray-500 capitalize">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  {(!item.specs || Object.keys(item.specs).length === 0) && (
                    <span className="text-gray-700 italic">Sin specs</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-[#ffb800] hover:border-[#ffb800] transition-colors"
                    title="Modificar"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
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
);
