import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTablePagination } from './DataTablePagination';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export type DataTableProps<TData extends object, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchableColumns?: Array<keyof TData>;
  isLoading?: boolean;
  maxHeight?: 'max-h-96' | 'max-h-[600px]' | 'max-h-screen' | 'max-h-full';
};

function createGlobalFilterFn<TData extends object>(
  searchableColumns?: Array<keyof TData>
) {
  return (row: any, columnId: string, filterValue: string): boolean => {
    const item = row.original as TData;
    const columnsToSearch = searchableColumns?.length
      ? searchableColumns
      : (Object.keys(item) as Array<keyof TData>);

    return columnsToSearch.some(columnId => {
      const value = item[columnId];
      if (value == null) return false;
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };
}

export function DataTable<TData extends object, TValue>({
  columns,
  searchPlaceholder = 'Search...',
  searchableColumns,
  data,
  isLoading = false,
  maxHeight = 'max-h-[600px]',
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('');

  const globalFilterFn = useMemo(
    () => createGlobalFilterFn<TData>(searchableColumns),
    [searchableColumns]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  return (
    <>
      <div className="mb-4 mt-14 flex justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter ?? ''}
          onChange={event => {
            const value = event.target.value;
            setGlobalFilter(String(value));
          }}
          className="max-w-sm"
          aria-label="Search"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              View Only <SlidersHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`overflow-auto rounded-md border ${maxHeight}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
