import { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ThemeContext } from "../themes/ThemeContext";
import { getAllOrchids } from "../apis/OrchidsApi";
import { MoreVert as MoreVertIcon, Add as AddIcon } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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

  const handleAddOrchid = () => {
    console.log("Add new orchid");
    // Implement the logic to add a new orchid
  };

  const columns = [
    { field: "index", headerName: "ID", width: 70 },
    { field: "name", headerName: "Orchid name", width: 100 },
    { field: "rating", headerName: "Rating", width: 100, type: "number" },
    {
      field: "isSpecial",
      headerName: "Special Orchid",
      type: "boolean",
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <Chip
            icon={AutoAwesomeIcon}
            sx={{
              ml: 1,
              backgroundColor: theme.chip.backgroundColor,
              color: theme.chip.color,
            }}
          />
        ) : (
          <p>Noraml</p>
        ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={`${params.row.name} orchid`}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    { field: "color", headerName: "Color", width: 100 },
    { field: "origin", headerName: "Origin", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
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
          style={{ borderRadius: "6px" }}
        ></iframe>
      ),
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 200,
      flex: 1,
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
        minHeight: "calc(100vh - 64px)", // Adjust based on your AppBar height
        backgroundColor: theme.mainContent.backgroundColor,
        color: theme.text.primary,
        padding: "68px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant='h4' component='h1' gutterBottom>
            Orchid Management
          </Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            onClick={handleAddOrchid}
          >
            Add Orchid
          </Button>
        </Box>
        <DataGrid
          rowHeight={100}
          rows={orchids}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: 0,
            borderRadius: "8px",
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.card.hoverBackgroundColor,
            },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
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
