'use client';

import { useState, useMemo } from 'react';
import type { ColumnDef, SortState, FilterState } from '../model/types';

type Props<TRow extends { id: number | string }> = {
  columns: ColumnDef<TRow>[];
  rows: TRow[];
  sectionLabel: string;
  onEdit: (row: TRow) => void;
  onDelete: (row: TRow) => Promise<void>;
  onCreate: () => void;
  canCreate?: boolean;
  canDelete?: boolean;
};

function cellValue<TRow>(row: TRow, key: keyof TRow): string {
  const v = row[key];
  if (v === null || v === undefined) return '';
  return String(v);
}

function sortRows<TRow>(rows: TRow[], sort: SortState): TRow[] {
  if (!sort) return rows;
  return [...rows].sort((a, b) => {
    const av = (a as Record<string, unknown>)[sort.key];
    const bv = (b as Record<string, unknown>)[sort.key];
    const an = Number(av);
    const bn = Number(bv);
    let cmp: number;
    if (!isNaN(an) && !isNaN(bn)) {
      cmp = an - bn;
    } else {
      cmp = String(av ?? '').localeCompare(String(bv ?? ''), 'ru');
    }
    return sort.direction === 'asc' ? cmp : -cmp;
  });
}

function filterRows<TRow>(
  rows: TRow[],
  globalFilter: string,
  columnFilters: FilterState,
  columns: ColumnDef<TRow>[],
): TRow[] {
  const gl = globalFilter.toLowerCase().trim();

  return rows.filter((row) => {
    // Global filter: any text column contains the query
    if (gl) {
      const matches = columns.some((col) => {
        if (col.render) return false; // skip custom-rendered cells for global filter
        return cellValue(row, col.key as keyof TRow).toLowerCase().includes(gl);
      });
      if (!matches) return false;
    }

    // Per-column filters
    for (const [key, query] of Object.entries(columnFilters)) {
      if (!query.trim()) continue;
      const val = cellValue(row, key as keyof TRow).toLowerCase();
      if (!val.includes(query.toLowerCase())) return false;
    }

    return true;
  });
}

export function AdminDataTable<TRow extends { id: number | string }>({
  columns,
  rows,
  sectionLabel,
  onEdit,
  onDelete,
  onCreate,
  canCreate = true,
  canDelete = true,
}: Props<TRow>) {
  const [sort, setSort] = useState<SortState>(null);
  const [columnFilters, setColumnFilters] = useState<FilterState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pendingDeleteRow, setPendingDeleteRow] = useState<TRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const processedRows = useMemo(() => {
    const sorted = sortRows(rows, sort);
    return filterRows(sorted, globalFilter, columnFilters, columns);
  }, [rows, sort, globalFilter, columnFilters, columns]);

  function handleSort(key: string) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  }

  function getSortIcon(key: string) {
    if (!sort || sort.key !== key) return <span className="ml-1 text-neutral-300">↕</span>;
    return (
      <span className="ml-1 text-neutral-700">
        {sort.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  }

  async function handleConfirmDelete() {
    if (!pendingDeleteRow) return;
    setDeleting(true);
    await onDelete(pendingDeleteRow);
    setDeleting(false);
    setPendingDeleteRow(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-normal tracking-wide">{sectionLabel}</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Поиск по всем полям..."
            className="border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:border-neutral-500 w-52"
          />
          {canCreate && (
            <button
              onClick={onCreate}
              className="bg-[#1e5945] text-white px-3 py-1 text-sm hover:bg-[#174836] transition-colors"
            >
              + Создать
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-neutral-200">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-neutral-50">
            {/* Header row with column labels and sort */}
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    'border-b border-neutral-200 px-2 py-2 text-left font-medium text-neutral-600 whitespace-nowrap',
                    col.width ?? '',
                    col.sortable !== false ? 'cursor-pointer select-none hover:bg-neutral-100' : '',
                  ].join(' ')}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  {col.label}
                  {col.sortable !== false && getSortIcon(col.key)}
                </th>
              ))}
              <th className="border-b border-neutral-200 px-2 py-2 text-left font-medium text-neutral-600 whitespace-nowrap w-20">
                Действия
              </th>
            </tr>
            {/* Filter row */}
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="border-b border-neutral-200 px-1 py-1">
                  {col.filterable !== false ? (
                    <input
                      type="text"
                      value={columnFilters[col.key] ?? ''}
                      onChange={(e) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [col.key]: e.target.value,
                        }))
                      }
                      placeholder="фильтр..."
                      className="w-full border border-neutral-200 px-1 py-0.5 text-xs focus:outline-none focus:border-neutral-400 font-normal"
                    />
                  ) : (
                    <span />
                  )}
                </th>
              ))}
              <th className="border-b border-neutral-200 px-1 py-1" />
            </tr>
          </thead>
          <tbody>
            {processedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-3 py-6 text-center text-neutral-400"
                >
                  Ничего не найдено
                </td>
              </tr>
            ) : (
              processedRows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50 border-b border-neutral-100">
                  {columns.map((col) => {
                    const value = row[col.key as keyof TRow];
                    return (
                      <td key={col.key} className="px-2 py-1.5 align-top max-w-[200px]">
                        {col.render ? (
                          col.render(value, row)
                        ) : (
                          <span className="line-clamp-2 break-words">
                            {value === null || value === undefined ? (
                              <span className="text-neutral-300">—</span>
                            ) : (
                              String(value)
                            )}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-2 py-1.5 align-top whitespace-nowrap">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-neutral-600 underline text-xs hover:text-neutral-900 mr-2"
                    >
                      Ред.
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => setPendingDeleteRow(row)}
                        className="text-red-500 underline text-xs hover:text-red-700"
                      >
                        Удал.
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Rows count */}
      <p className="text-xs text-neutral-400">
        {processedRows.length} из {rows.length} записей
      </p>

      {/* Delete confirmation toast */}
      {pendingDeleteRow && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-neutral-300 shadow-lg px-4 py-3 flex items-center gap-4 z-50 text-sm">
          <span className="text-neutral-700">
            Удалить запись #{pendingDeleteRow.id}?
          </span>
          <button
            onClick={handleConfirmDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-3 py-1 text-xs hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? 'Удаление...' : 'Да, удалить'}
          </button>
          <button
            onClick={() => setPendingDeleteRow(null)}
            className="text-neutral-500 underline text-xs hover:text-neutral-800"
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}
