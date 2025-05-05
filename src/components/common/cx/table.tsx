import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, DataGridProps } from "@mui/x-data-grid";
import "../../../styles/table.css";
import { DARK_THEME_BG, WHITE } from "../../../utils/colors";

type CardDataGridProps = {
  rows: any[];
  columns: GridColDef[];
  pageSize?: number;
} & Partial<DataGridProps>;

const CardDataGrid: React.FC<CardDataGridProps> = ({
  rows,
  columns,
  pageSize = 12,
  ...rest
}) => {
  return (
    <Box sx={{height: 'auto', width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={() => "card-row"}
        rowHeight={45}
        sx={{
          paddingTop: '10px',
          backgroundColor: DARK_THEME_BG,
          color: WHITE,
          border: "none",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: DARK_THEME_BG,
            color: WHITE,
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: WHITE,
          },
          "& .MuiDataGrid-virtualScroller": {
            borderTop: "none",
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            color: WHITE,
            borderBottom: "none",
            borderTopColor: "black"
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: DARK_THEME_BG,
            color: WHITE,
            borderTop: "none",
          },
          "& .MuiSelect-select, & .MuiInputBase-root": {
            backgroundColor: "#333",
            color: WHITE,
          },
          "& .MuiSvgIcon-root": {
            color: WHITE,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: WHITE,
            },
          "& .card-row": {
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
        pageSizeOptions={[12, 24, 36]}
        {...rest}
      />
    </Box>
  );
};

export default CardDataGrid;
