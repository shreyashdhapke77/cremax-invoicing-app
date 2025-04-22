import { GridColDef } from "@mui/x-data-grid";

export const productListColumns: GridColDef[] = [
  {
    field: "productNo",
    headerName: "Product no",
    flex: 1,
    editable: false,
  },
  {
    field: "name",
    headerName: "Product Name",
    flex: 1,
    editable: false,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1
  },
  {
    field: "timesInvoiced",
    headerName: "Times Invoiced",
    flex: 1
  },
  {
    field: "totalInvoiced",
    headerName: "Total Invoiced",
    type: "number",
    align: 'right',
    headerAlign: 'right',
    width: 110,
    sortable: false,
    valueGetter: (value, row) => row.totalInvoiced || 0,
  },
];
