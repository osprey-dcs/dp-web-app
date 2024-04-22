import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function getColDefs(resultData) {
  let colDefs = []
  console.log(resultData.dataColumns);
  for (const col of resultData.dataColumns) {
    colDefs.push({ field: col.name });
  }

  console.log(colDefs);
  return colDefs;
}