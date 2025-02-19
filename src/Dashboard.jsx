import { useState } from "react";
import { Tabs, Tab, Box, Typography, CssBaseline } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import App from "./App";
import Topbar from "./Topbar";
import Grid from "@mui/material/Grid2";

const tabData = [
  { label: "Dashboard", icon: <DashboardIcon />, content: <App /> },
  {
    label: "Ayarlar",
    icon: <SettingsIcon />,
    content: "Ayarlar sayfası içeriği",
  },
  {
    label: "Profil",
    icon: <AccountCircleIcon />,
    content: "Profil bilgileri burada olacak",
  },
];

export default function VerticalTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const leftPanel = (
    
      <Tabs
        orientation="vertical"
        indicatorColor="secondary"
        textColor="secondary"
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        sx={{
          "& .MuiTab-root": {
            justifyContent: "flex-start",
            textTransform: "none",
          },
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
  );
  
  return (
    <>
      {/* CssBaseline ile body'nin varsayılan margin'i sıfırlandı */}
      <CssBaseline />
      <Grid
        container
        sx={{
          display: "flex",
          height: "100vh",
          bgcolor: "gray",
          flexDirection: "row",
        }}
      >
        {/* Sidebar (Sol Panel - Sabit Kalacak) */}
        <Grid
      item
      sx={{
        width: "190px",
        bgcolor: "white",
        boxShadow: 2,
        borderRight: "1px solid #ddd", // Daha net ayrım için çizgi
        padding: 2,
        position: "fixed", // Sabit konumlandırma
        height: "100%", // Tüm ekranı kaplasın
        display:{xs:"none",sm:"block"}
      }}
      >
        {leftPanel}
      </Grid>
        {/* Sağ Panel - İçerik Alanı */}
        <Grid
          item
          sx={{
            padding: 3,
            height: "100vh",
            overflowY: "auto", // İçerik fazla olursa scroll edilebilir
            bgcolor: "white",
            width: {xs:"100%", md:"calc(100% - 190px)"}, // Sidebar genişliği kadar sağa kaydır
            marginLeft:{xs:0, md:"190px"} , // Sidebar genişliği kadar sağa kaydır
          }}
        >
          <Topbar leftBar={leftPanel}/>
          <Box mt={5}>{tabData[selectedTab].content}</Box>
        </Grid>
      </Grid>
    </>
  );
}
