"use client";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "../ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { convertViewsToShortForm } from "../../utils/viewsCalculate";
import { Link } from "react-router-dom";

export function DataTableDemo({ data, setData, columns }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  //   const [clickedRow, setClickedRow] = useState(null);
  // console.log(data.length)

  const handleSelect = (e, column) => {
    const selectedValue = e;
    const updatedData = data.map((item) => {
      let updatedValue = item[selectedValue];

      return {
        ...item,
        [column]: updatedValue,
      };
    });
    setData(updatedData);
  };

  const getColumn = () => {
    let newColumns = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ];
    columns.map((elm) => {
      newColumns.push({
        accessorKey: elm.key,
        header: elm.label,
        cell: ({ row }) => (
          <div className="capitalize">
            {(() => {
              switch (elm.key) {
                case "createdAt":
                  return <div>{row.original.createdAt.toLocaleString()}</div>;
                case "isActive":
                  return <div>{row.getValue(elm.key).toString()}</div>;
                case "subscribers":
                case "totalVideos":
                case "totalViews":
                  return (
                    <div>{convertViewsToShortForm(row.getValue(elm.key))}</div>
                  );
                case "avatar":
                  return (
                    <div>
                      <img
                        src={row.getValue(elm.key)}
                        alt="thumbnail"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  );
                default:
                  return <div>{row.getValue(elm.key)}</div>;
              }
            })()}
          </div>
        ),
      });
    });
    return newColumns;
  };

  const table = useReactTable({
    data,
    columns: getColumn(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  //   const handleFirstColumnClick = (row) => {
  //     setRow(row.original);
  //     setClickedRow(true);
  //   };

  //   useEffect(() => {
  //     if (clickedRow) {
  //       setIsSheetOpen(true);
  //       setClickedRow(false);
  //     }
  //   }, [clickedRow]);

  return (
    <div className="w-full h-full flex flex-col justify-between md:h-[70vh] lg:h-[70vh] overflow-x-auto">
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              </>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id}>
                      <Link to={`/${row.original.username}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handlePagination('previous')}
              // disabled={isPreviousDisabled}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handlePagination('next')}
              // disabled={isNextDisabled}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div> */}
        </Table>
      </div>
    </div>
  );
}
