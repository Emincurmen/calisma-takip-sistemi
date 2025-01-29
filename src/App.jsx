import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Chip, TextField, Switch } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.locale("tr"); // Türkçe ayarla

const API_URL =
  "https://json-server-api-git-main-emins-projects-6a745c3d.vercel.app/api/users";

const App = () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: "",
    lastDate: null,
    konuBasligi: "",
    konuDetayi: "",
    status: "todo",
  });
  const handleSwitchChange = (event) => {
    setIsSwitchChecked(event.target.checked);
  };
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

  const handleDateChange = (date) => {
    setFormData({ ...formData, lastDate: date });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setData([...data, response.data]);
      setFormData({
        name: "",
        dateCreated: "",
        lastDate:null,
        konuBasligi: "",
        konuDetayi: "",
        status: "todo",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  dayjs.extend(relativeTime);

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
    {
      field: "lastDate",
      headerName: "Son Tarih",
      width: 200,
      renderCell: (params) =>
        params.row.lastDate === "-" ? "-":
        dayjs(params.row.lastDate).from(dayjs(params.row.dateCreated)),
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
        <div>
          <span style={{fontSize:"18px",fontFamily:"poppins",paddingRight:"10px"}}>bitiş tarihi ekle</span>
          <Switch
            checked={isSwitchChecked}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        
        {isSwitchChecked ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Bitiş Tarihi Seç"
              value={formData.lastDate}
              onChange={handleDateChange} // handleDateChange ile date'yi al
              minDate={dayjs()} // Bitiş tarihi bugünden önce olamaz
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : formData.lastDate = "-"}
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
