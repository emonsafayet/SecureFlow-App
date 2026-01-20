import { TablePagination } from "@mui/material";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      rowsPerPage={pageSize}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onRowsPerPageChange={(e) =>
        onPageSizeChange(parseInt(e.target.value, 10))
      }
    />
  );
}
