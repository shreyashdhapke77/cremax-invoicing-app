import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, DataGridProps } from "@mui/x-data-grid";
import "../../../styles/table.css";

type CardDataGridProps = {
  rows: any[];
  columns: GridColDef[];
  pageSize?: number;
} & Partial<DataGridProps>;

const CardDataGrid: React.FC<CardDataGridProps> = ({
  rows,
  columns,
  pageSize = 10,
  ...rest
}) => {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={() => "card-row"}
        sx={{
          backgroundColor: "#111",
          color: "#fff",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#111",
            color: "#fff",
            borderBottom: "1px solid #444",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "#333",
            color: "#fff",
            borderBottom: "1px solid #444",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#111",
            color: "#fff",
          },
          "& .MuiSelect-select, & .MuiInputBase-root": {
            backgroundColor: "#333",
            color: "#fff",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
          "& .Mui-disabled": {
            color: "rgba(255,255,255,0.5)",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: "#fff",
            },
          "& .card-row": {
            marginTop: "10px",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        {...rest}
      />
    </Box>
  );
};

export default CardDataGrid;
