import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getColDefs(resultData) {
  let colDefs = []

  const rowMapTable = resultData.tableResult.rowMapTable
  for (let i = 0; i < rowMapTable.columnNames.length; ++i) {
    if (i === 0) {
      colDefs.push({
        field: rowMapTable.columnNames[i],
        cellRenderer: "timestampCellRenderer",
      })
    }
    else {
      colDefs.push({
        field: rowMapTable.columnNames[i],
        cellRenderer: "dataValueCellRenderer",
      });
    }
  }
  return colDefs;
}