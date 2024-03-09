import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        p: 2,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.500" }}
        variant="rectangular"
        width="100%"
        height={118}
        animation="wave"
      />
      <Skeleton
        sx={{ bgcolor: "grey.500" }}
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
      />
    </Box>
  );
}
