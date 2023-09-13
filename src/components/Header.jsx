import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        margin: "0 auto",
      }}
    >
      <Typography
        component="div"
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#9F91FE",
          marginTop: "10px",
          marginBottom: "40px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/movies")}
      >
        📽️ Movies
      </Typography>
    </Box>
  );
};

export default Header;
