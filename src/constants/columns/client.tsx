import { GridColDef } from "@mui/x-data-grid";

export const clientListColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Client Id",
    flex: 1
  },
  {
    field: "name",
    headerName: "Client Name",
    flex: 1,
    editable: false,
  },
  {
    field: "numberOfInvoices",
    headerName: "Number of Invoices",
    flex: 1
  },
  {
    field: "numberOfDrafts",
    headerName: "Number of Drafts",
    flex: 1
  },
  {
    field: "totalInvoiced",
    headerName: "Total Invoiced",
    flex: 1,
  },
  {
    field: "totalUnpaid",
    headerName: "Total Unpaid",
    type: "number",
    align: 'right',
    headerAlign: 'right',
    valueGetter: (value, row) => row.totalUnpaid || 0,
  },
];
