import type { ReactNode } from 'react';

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'date';

export type SelectOption = { value: string; label: string };

export type ColumnDef<TRow> = {
  key: keyof TRow & string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  readOnly?: boolean;
  width?: string;
  type?: FieldType;
  options?: SelectOption[];
  render?: (value: TRow[keyof TRow], row: TRow) => ReactNode;
};

export type SortState = { key: string; direction: 'asc' | 'desc' } | null;

export type FilterState = Record<string, string>;
