'use client';

import { useEffect, useRef, useTransition } from 'react';
import type { ColumnDef } from '../model/types';
import type { ActionResult } from '@/features/admin-news-crud/actions';

type Props<TRow> = {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnDef<TRow>[];
  initialData: Partial<TRow> | null;
  onSubmit: (formData: FormData) => Promise<ActionResult>;
  title: string;
};

export function AdminRecordModal<TRow>({
  isOpen,
  onClose,
  columns,
  initialData,
  onSubmit,
  title,
}: Props<TRow>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const editableColumns = columns.filter((col) => !col.readOnly);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await onSubmit(formData);
      if (result.success) {
        onClose();
      } else if (errorRef.current) {
        errorRef.current.textContent = result.error ?? 'Ошибка сохранения';
      }
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h3 className="text-base font-normal tracking-wide">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-3">
          {editableColumns.map((col) => {
            const defaultValue =
              initialData && col.key in (initialData as object)
                ? String((initialData as Record<string, unknown>)[col.key] ?? '')
                : '';

            return (
              <div key={col.key} className="flex flex-col gap-1">
                <label className="text-xs text-neutral-500 uppercase tracking-wide">
                  {col.label}
                </label>

                {col.type === 'textarea' ? (
                  <textarea
                    name={col.key}
                    defaultValue={defaultValue}
                    rows={3}
                    className="border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:border-neutral-500 resize-y"
                  />
                ) : col.type === 'select' && col.options ? (
                  <select
                    name={col.key}
                    defaultValue={defaultValue}
                    className="border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:border-neutral-500 bg-white"
                  >
                    {col.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                    name={col.key}
                    defaultValue={defaultValue}
                    className="border border-neutral-300 px-2 py-1.5 text-sm focus:outline-none focus:border-neutral-500"
                  />
                )}
              </div>
            );
          })}

          <p ref={errorRef} className="text-red-600 text-xs min-h-[1rem]" />

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#1e5945] text-white px-4 py-2 text-sm hover:bg-[#174836] transition-colors disabled:opacity-50"
            >
              {isPending ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-500 text-sm underline hover:text-neutral-800"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
