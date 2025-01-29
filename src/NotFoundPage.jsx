import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const NotFoundPage = () => {

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Box>
        <Typography variant="h1" color="primary" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Üzgünüz, aradığınız sayfa bulunamadı.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Sayfa taşınmış olabilir ya da hiç var olmamış olabilir.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
