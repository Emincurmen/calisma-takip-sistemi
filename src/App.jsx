import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Chip, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("tr"); // Türkçe ayarla

const API_URL =
  "https://json-server-api-git-main-emins-projects-6a745c3d.vercel.app/api/users";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: "",
    lastDate: dayjs(),
    konuBasligi: "",
    konuDetayi: "",
    status: "todo",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setData([...data, response.data]);
      setFormData({
        name: "",
        dateCreated: "",
        lastDate: dayjs(),
        konuBasligi: "",
        konuDetayi: "",
        status: "todo",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const columns = [
    {
      field: "checkbox",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <Chip
            rounded
            skin="light"
            size="small"
            label={
              row.status === "finish"
                ? "Finished"
                : row.status === "progress"
                ? "in progress"
                : "To Do"
            }
            color={
              row.status === "finish"
                ? "success"
                : row.status === "progress"
                ? "primary"
                : "secondary"
            }
          />
        );
      },
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Atanan Kişi", width: 200 },
    {
      field: "konuBasligi",
      headerName: "Konu Başlığı",
      width: 250,
      renderCell: (params) => (
        <div
          style={{
            textDecoration: params.row.isSelected ? "line-through" : "none",
          }}
        >
          {params.row.konuBasligi}
        </div>
      ),
    },
    {
      field: "dateCreated",
      headerName: "Oluşturma Tarihi",
      width: 200,
      renderCell: (params) =>
        dayjs(params.row.dateCreated).format("D MMM YY HH:mm"),
    },
  ];

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <h1>Ders Takip Sistemi</h1>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          flexDirection: "column",
        }}
      >
        <TextField
          label="Atanacak Kişi"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Konu Başlığı"
          name="konuBasligi"
          value={formData.konuBasligi}
          onChange={handleInputChange}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            label="Başlangıç Tarihi"
            value={dayjs().format("YYYY-MM-DD")}
            disabled
          />
          <DatePicker
            label="Bitiş Tarihi Seç"
            value={formData.lastDate}
            onChange={handleInputChange}
            minDate={dayjs()} // Bitiş tarihi bugünden önce olamaz
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {/* <Autocomplete
          disablePortal
          options={deadLineOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        /> */}
        <Button variant="contained" onClick={handleAddUser} fullWidth>
          Çalışma Ekle
        </Button>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default App;
