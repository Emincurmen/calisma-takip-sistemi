import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Drawer
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid2";

const Topbar = ({ leftBar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    // Eğer tıklama olayını başlatan element bir Drawer değilse menüyü kapat
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        left: { xs: 0, md: "190px" }, // Mobilde tam ekran, masaüstünde sidebar kadar boşluk bırak
        width: { xs: "90%", md: "calc(100% - 600px)" }, // Sidebar'ı kaplamasın
        maxWidth: "1200px", // Sağ panelde çok geniş olmasın
        margin: "0 auto", // Ortalamak için
        boxSizing: "border-box",
        boxShadow: 2,
        borderRadius: 2, // Köşeleri yuvarlat
        mt: 2, // Yukarıdan boşluk bırak
      }}
    >
      <Toolbar>
        {/* Sol Menü Butonu */}
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon  sx={{ display: { xs: "block", sm: "none" } }} />
        </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {leftBar}
          </Drawer>

        {/* Başlık */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        {/* Bildirim Butonu */}
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profil Avatarı ve Menü */}
        <Box sx={{ ml: 2 }}>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
