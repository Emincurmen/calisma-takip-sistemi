import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Chip,
  TextField,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("tr");
dayjs.extend(relativeTime);

const API_URL =
  "https://json-server-api-git-main-emins-projects-6a745c3d.vercel.app/api/users";

const App = () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dateCreated: dayjs().toISOString(),
    lastDate: null,
    konuBasligi: "",
    konuDetayi: "",
    status: "todo",
  });

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newStatus, setNewStatus] = useState("");

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

  const handleAddUser = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setData([...data, response.data]);
      setFormData({
        name: "",
        dateCreated: dayjs().toISOString(),
        lastDate: null,
        konuBasligi: "",
        konuDetayi: "",
        status: "todo",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleChipClick = (row) => {
    setSelectedRow(row);
    setNewStatus(row.status);
    setOpen(true);
  };

  const handleStatusChange = async () => {
    if (!selectedRow) return;

    try {
      const response = await axios.get(`${API_URL}?id=${selectedRow.id}`);
      const updatedData = { ...response.data, status: newStatus };
      await axios.put(`${API_URL}?id=${selectedRow.id}`, updatedData);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error("Error updating status: emin", error);
    }
  };

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row }) => (
        <Chip
          label={
            row.status === "finish"
              ? "Finished"
              : row.status === "progress"
              ? "In Progress"
              : "To Do"
          }
          color={
            row.status === "finish"
              ? "success"
              : row.status === "progress"
              ? "primary"
              : "secondary"
          }
          onClick={() => handleChipClick(row)}
          style={{ cursor: "pointer", width:"80%"}}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Atanan Kişi", width: 200 },
    { field: "konuBasligi", headerName: "Konu Başlığı", width: 250 },
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
        params.row.lastDate
          ? dayjs(params.row.lastDate).from(dayjs(params.row.dateCreated))
          : "-",
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Konu Başlığı"
          name="konuBasligi"
          value={formData.konuBasligi}
          onChange={(e) =>
            setFormData({ ...formData, konuBasligi: e.target.value })
          }
          fullWidth
        />
        <div>
          <span
            style={{
              fontSize: "18px",
              fontFamily: "poppins",
              paddingRight: "10px",
            }}
          >
            Bitiş Tarihi Ekle
          </span>
          <Switch
            checked={isSwitchChecked}
            onChange={() => setIsSwitchChecked(!isSwitchChecked)}
          />
        </div>
        {isSwitchChecked && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Bitiş Tarihi Seç"
              value={formData.lastDate}
              onChange={(date) => setFormData({ ...formData, lastDate: date })}
              minDate={dayjs()}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Status Güncelle</DialogTitle>
        <DialogContent>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="progress">In Progress</MenuItem>
            <MenuItem value="finish">Finished</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            İptal
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
