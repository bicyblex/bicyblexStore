import React from "react";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
  onViewDetail,
  loading,
  // Nuevas props para la lógica
  totalPages,
  page,
  setPage,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => (
  <div className="space-y-4">
    {/* Controles integrados en la tabla */}
    <div className="flex gap-4 mb-4  justify-between">
      <input
        placeholder="BUSCAR PRODUCTO..."
        className="font-mono bg-[#080a0a] border border-[#333535] p-3 text-xs text-white w-64 uppercase outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="bg-[#080a0a] border border-[#333535] p-3 text-xs text-white w-48 uppercase outline-none"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="all">TODAS LAS CATEGORÍAS</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>

    <div className="bg-[#080a0a] border border-[#333535]/20 overflow-x-auto">
      {loading ? (
        <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
          Sincronizando...
        </div>
      ) : products.length === 0 ? (
        <div className="p-10 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
          No hay resultados.
        </div>
      ) : (
        <table className="w-full text-left border-collapse min-w-[800px]">
          {/* ... (TU THEAD ES EL MISMO) ... */}
          <thead>
            <tr className="border-b border-[#333535]/30 bg-[#0d1010]">
              <th className="font-mono text-[10px] text-gray-500 p-4">ID</th>
              <th className="font-mono text-[10px] text-gray-500 p-4">
                PRODUCTO
              </th>
              <th className="font-mono text-[10px] text-gray-500 p-4">
                CATEGORÍA
              </th>
              <th className="font-mono text-[10px] text-gray-500 p-4">
                PRECIO
              </th>
              <th className="font-mono text-[10px] text-gray-500 p-4">STOCK</th>
              <th className="font-mono text-[10px] text-gray-500 p-4 text-right">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333535]/10">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-[#111414]/40">
                <td className="font-mono text-xs p-4">#{item.id}</td>
                <td className="text-sm font-bold p-4 uppercase">{item.name}</td>
                <td className="text-xs p-4 text-[#ffb800]">
                  {item.categories?.name}
                </td>
                <td className="text-sm p-4">${item.price}</td>
                <td className="text-sm p-4">{item.stock}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onViewDetail(item)}
                      className="cursor-pointer p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-white hover:border-white transition-colors"
                      title="Ver contenido"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="cursor-pointer p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-[#ffb800] hover:border-[#ffb800] transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="cursor-pointer p-2 bg-[#111414] border border-[#333535]/40 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* Paginación integrada en el componente */}
    <div className="flex justify-center gap-4">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="text-[10px] border p-2"
      >
        ANTERIOR
      </button>
      <span className="text-[10px] p-2 font-mono">
        PÁGINA {page + 1} de {totalPages || 1}
      </span>
      <button
        disabled={page >= totalPages - 1}
        onClick={() => setPage(page + 1)}
        className="text-[10px] border p-2"
      >
        SIGUIENTE
      </button>
    </div>
  </div>
);
