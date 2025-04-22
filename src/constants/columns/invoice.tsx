import { GridColDef } from "@mui/x-data-grid";
import { INV_STATUS_CANCELLED, INV_STATUS_DUE, INV_STATUS_OVERDUE, INV_STATUS_PAID } from "../../utils/colors";

export const invoiceListColumns: GridColDef[] = [
  {
    field: "invoiceNo",
    headerName: "Invoice no",
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: false,
    renderCell: (params) => {
      const status = params.value?.toLowerCase();
      const colorMap: Record<string, string> = {
        due: INV_STATUS_DUE,
        overdue: INV_STATUS_OVERDUE,
        paid: INV_STATUS_PAID,
        cancelled: INV_STATUS_CANCELLED,
      };
  
      const dotColor = colorMap[status] || "#999";
  
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: dotColor,
              display: "inline-block",
            }}
          />
          <span>{params.value}</span>
        </div>
      );
    },
  },
  {
    field: "invoiceDate",
    headerName: "Invoice Date",
    flex: 1
  },
  {
    field: "client",
    headerName: "Client",
    flex: 2
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    valueGetter: (value, row) => row.amount || 0,
  },
];
