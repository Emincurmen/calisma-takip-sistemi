import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import moment from "moment-timezone"; // moment-timezone'u doğrudan import edin.

console.log(moment().tz("Europe/Istanbul").format("D MMM YYYY HH:mm"))

const API_URL = "https://json-server-api-git-main-emins-projects-6a745c3d.vercel.app/api/users";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: new Date().toLocaleString("tr-TR"),
    dersDetay: "",
    isSelected: false,
  });
  const [selectedId, setSelectedId] = useState(null);

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
        dateCreated: new Date().toLocaleString("tr-TR"),
        dersDetay: "",
        isSelected: false,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCheckboxChange = async (id) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return { ...row, isSelected: !row.isSelected };
      }
      return row;
    });
  
    const updatedUser = updatedData.find((row) => row.id === id);
  
    setData(updatedData);
  
    try {
      await axios.put(`${API_URL}?id=${id}`, updatedUser);
      console.log("Updated user:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  const columns = [
    {
      field: "checkbox",
      headerName: "Seçim",
      width: 100,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.row.isSelected}
              onChange={() => handleCheckboxChange(params.row.id)}
            />
          }
        />
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Ad Soyad", width: 200 },
    { field: "dateCreated", headerName: "Oluşturma Tarihi", width: 200 },
    {
      field: "dersDetay",
      headerName: "Ders Detayı",
      width: 250,
      renderCell: (params) => (
        <div style={{ textDecoration: params.row.isSelected ? "line-through" : "none" }}>
          {params.row.dersDetay}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, maxWidth: "375px", margin: "0 auto" }}>
      <h1>Ders Takip Sistemi</h1>

      <div style={{ marginBottom: 20, display: "flex", gap: 10, flexDirection: "column" }}>
        <TextField
          label="Ad Soyad"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Ders Detayı"
          name="dersDetay"
          value={formData.dersDetay}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddUser} fullWidth>
          Kullanıcı Ekle
        </Button>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={data} columns={columns} pageSize={5} disableSelectionOnClick />
      </div>

      {selectedId && (
        <div style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCheckboxChange(selectedId)}
            fullWidth
          >
            Değişikliği Gönder
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
