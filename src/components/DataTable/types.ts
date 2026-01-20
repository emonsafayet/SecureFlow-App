import type React from "react";

/* -----------------------------
   Sorting
------------------------------ */
export type SortOrder = "asc" | "desc";

export interface SortState<T> {
  orderBy?: keyof T;
  order?: SortOrder;
}

/* -----------------------------
   Column Definition
------------------------------ */
export interface Column<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  
  filterType?: "text" | "select";
  options?: { label: string; value: string }[];

  render?: (row: T) => React.ReactNode;
}

/* -----------------------------
   Pagination
------------------------------ */
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

/* -----------------------------
   API Result (Optional Helper)
------------------------------ */
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

/* -----------------------------
   DataTable Props
------------------------------ */
export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];

  /** Pagination */
  pagination?: PaginationState;
  onPageChange?: (page: number, pageSize: number) => void;

  /** Sorting */
  sort?: SortState<T>;
  onSortChange?: (sort: SortState<T>) => void;

  /** Global search */
  search?: string;
  onSearchChange?: (value: string) => void;

  /** Column filters */
  filters?: Partial<Record<keyof T, string>>;
  onFilterChange?: (field: keyof T, value: string) => void;

  /** Server-side mode */
  serverSide?: boolean;
}
