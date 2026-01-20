import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
} from "@mui/material";
import { useMemo } from "react";
import type { DataTableProps, SortOrder } from "./types";
import { TextFilter } from "../filters/TextFilter";
import { SelectFilter } from "../filters/SelectFilter";

/* ----------------------------------
   Helpers
----------------------------------- */

const toText = (v: unknown) =>
  v === null || v === undefined ? "" : String(v);

/* ----------------------------------
   Component
----------------------------------- */

export function DataTable<T extends object>({
  columns,
  rows,
  pagination,
  onPageChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
  filters,
  onFilterChange,
  serverSide = false,
}: DataTableProps<T>) {
  const data = useMemo(() => {
    if (serverSide) return rows;

    let result = [...rows];

    /* Global search */
    if (search) {
      result = result.filter((r) =>
        (Object.values(r) as unknown[]).some((v) =>
          toText(v).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    /* Column filters */
    if (filters) {
      result = result.filter((r) =>
        Object.entries(filters).every(([k, v]) =>
          v
            ? toText(r[k as keyof T])
                .toLowerCase()
                .includes(toText(v).toLowerCase())
            : true
        )
      );
    }

    /* Sorting */
    if (sort?.orderBy && sort.order) {
      const key = sort.orderBy;
      result.sort((a, b) => {
          const av = a[key as keyof T];
        const bv = b[key as keyof T];

        if (av < bv) return sort.order === "asc" ? -1 : 1;  
        if (av > bv) return sort.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [rows, search, filters, sort, serverSide]);

  return (
    <Paper>
      {/* Search */}
      {onSearchChange && (
        <Box p={2}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search..."
            value={search || ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Box>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            {/* Header */}
            <TableRow>
              {columns.map((c) => (
                <TableCell key={String(c.field)}>
                  {c.sortable ? (
                    <TableSortLabel
                      active={sort?.orderBy === c.field}
                      direction={sort?.order as SortOrder}
                      onClick={() =>
                        onSortChange?.({
                          orderBy: c.field,
                          order:
                            sort?.order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      {c.header}
                    </TableSortLabel>
                  ) : (
                    c.header
                  )}
                </TableCell>
              ))}
            </TableRow>

            {/* Filters */}
            {onFilterChange && (
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={String(c.field)}>
                    {c.filterable && c.filterType === "text" && (
                      <TextFilter
                        value={filters?.[c.field] || ""}
                        onChange={(value) =>
                          onFilterChange(c.field, value)
                        }
                      />
                    )}

                    {c.filterable && c.filterType === "select" && (
                      <SelectFilter
                        value={filters?.[c.field] || ""}
                        options={c.options || []}
                        onChange={(value) =>
                          onFilterChange(c.field, value)
                        }
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>

          {/* Body */}
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={String(c.field)}>
                    {c.render
                      ? c.render(row)
                      : toText(row[c.field as keyof T])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination && onPageChange && (
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page}
          rowsPerPage={pagination.pageSize}
          onPageChange={(_, p) =>
            onPageChange(p, pagination.pageSize)
          }
          onRowsPerPageChange={(e) =>
            onPageChange(0, parseInt(e.target.value, 10))
          }
        />
      )}
    </Paper>
  );
}