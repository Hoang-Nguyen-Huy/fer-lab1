import { Box, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../themes/ThemeContext";
import { getAllOrchids } from "../apis/OrchidsApi";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [orchids, setOrchids] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const data = await getAllOrchids();
        const processedOrchids = data.map((orchid, index) => ({
          ...orchid,
          id: orchid.Id || `orchid-${index + 1}`,
          index: index + 1,
        }));
        setOrchids(processedOrchids);
      } catch (error) {
        console.error("Failed to fetch orchids:", error);
      }
    };

    fetchOrchids();
  }, []);

  const handleMenuOpen = (event, orchid) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrchid(orchid);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrchid(null);
  };

  const handleUpdate = () => {
    console.log("Update", selectedOrchid);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete", selectedOrchid);
    handleMenuClose();
  };

  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: "index", headerName: "ID", width: 70 },
    { field: "name", headerName: "Orchid name", width: 130 },
    { field: "rating", headerName: "Rating", width: 130 },
    {
      field: "isSpecial",
      headerName: "Special Orchid",
      type: "boolean",
      width: 90,
    },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={`${params.row.name} orchid`}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { field: "color", headerName: "Color", width: 70 },
    { field: "origin", headerName: "Origin", widht: 90 },
    { field: "category", headerName: "Category", widht: 130 },
    {
      field: "video",
      headerName: "Video",
      width: 150,
      renderCell: (params) => (
        <iframe
          width='100%'
          height='100%'
          src={params.value}
          title={`${params.row.name} video`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ),
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={(event) => handleMenuOpen(event, params.row)}
          size='small'
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
        paddingTop: "8px",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ padding: "2rem" }}>
        <DataGrid
          rows={orchids}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
