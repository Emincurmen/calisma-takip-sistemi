import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import "./App.css";

export default function App() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [selectedRows, setSelectedRows] = React.useState({});

  // Checkbox değişimi olduğunda çalışacak fonksiyon
  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns(handleCheckboxChange, selectedRows)}
        disableColumnMenu
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        getRowHeight={() => "auto"}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        getRowClassName={(params) =>
          selectedRows[params.id] ? "strikethrough" : ""
        }
      />
    </div>
  );
}

const columns = (handleCheckboxChange, selectedRows) => [
  {
    field: "checkbox",
    headerName: "",
    width: 50,
    renderCell: (params) => (
      <input
        type="checkbox"
        checked={!!selectedRows[params.id]}
        onChange={() => handleCheckboxChange(params.id)}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "number",
    flex: 1,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "dersDetay",
    headerName: "Konu",
    type: "string",
    flex: 1.5,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
];

const tarih = new Date();

// Türkçe tarih ve saat formatı
const turkceTarih = tarih.toLocaleString("tr-TR", {
  dateStyle: "long", // Uzun tarih formatı: "24 Ocak 2025"
  timeStyle: "short", // Kısa saat formatı: "13:45"
});

const rows = [
  {
    id: 1,
    name: "Emin Cürmen",
    dateCreated: turkceTarih,
    dersDetay: "Matematik Logaritma",
  },
  {
    id: 2,
    name: "Emin Cürmen",
    dateCreated: "2015-03-25",
    dersDetay: "Critical Thinking",
  },
  {
    id: 3,
    name: "Emin Cürmen",
    dateCreated: "2015-03-25",
    dersDetay: "Critical Thinking",
  },
  {
    id: 4,
    name: "Emin Cürmen",
    dateCreated: "2015-03-25",
    dersDetay: "Critical Thinking",
  },
];

// CSS ile üstü çizme efekti
document.styleSheets[0].insertRule(
  `.strikethrough .MuiDataGrid-cell { text-decoration: line-through; }`,
  document.styleSheets[0].cssRules.length
);
