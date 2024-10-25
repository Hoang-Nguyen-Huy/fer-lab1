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
  useTheme,
  useMediaQuery,
  alpha,
  Rating,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ThemeContext } from "../themes/ThemeContext";
import { getAllOrchids } from "../apis/OrchidsApi";
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
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
    { field: "name", headerName: "Orchid name", width: 130, flex: 0.5 },
    {
      field: "rating",
      headerName: "Rating",
      width: 140,
      renderCell: (params) => (
        <Box>
          <Rating name='read-only' value={Number(params.value)} readOnly />
        </Box>
      ),
    },
    {
      field: "isSpecial",
      headerName: "Special Orchid",
      width: 150,
      renderCell: (params) =>
        params.value === "true" ? (
          <Chip
            icon={<AutoAwesomeIcon />}
            label='Special'
            size='small'
            sx={{
              backgroundColor: alpha(theme.chip.backgroundColor, 0.1),
              color: theme.chip.color,
              borderColor: theme.chip.borderColor,
              "& .MuiChip-icon": {
                color: theme.icon.color,
              },
            }}
          />
        ) : (
          <Chip
            label='Normal'
            size='small'
            variant='outlined'
            sx={{
              borderColor: alpha(theme.chip.borderColor, 0.5),
              color: theme.text.secondary,
            }}
          />
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
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
          sx={{ color: theme.icon.color }}
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
        padding: isMobile ? "16px" : "68px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: isMobile ? "16px" : "24px",
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.card.color,
          boxShadow: theme.elevation[3],
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{ fontWeight: "bold", color: theme.text.primary }}
          >
            Orchid Management
          </Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddOrchid}
            sx={{
              backgroundColor: theme.button.primary,
              color: theme.text.primary,
              "&:hover": {
                backgroundColor: theme.button.hover,
              },
              marginTop: isMobile ? 2 : 0,
              boxShadow: theme.elevation[1],
            }}
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
            border: `1px solid ${theme.divider}`,
            borderRadius: "8px",
            "& .MuiDataGrid-root": {
              backgroundColor: alpha(theme.card.backgroundColor, 0.6),
              color: theme.text.primary,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: alpha(theme.header.backgroundColor, 0.8),
              color: theme.text.primary,
              borderBottom: `2px solid ${theme.divider}`,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${alpha(theme.divider, 0.3)}`,
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: alpha(theme.action.hover, 0.1),
            },
            "& .MuiDataGrid-footer": {
              backgroundColor: alpha(theme.card.backgroundColor, 0.8),
              color: theme.text.secondary,
              borderTop: `1px solid ${theme.divider}`,
            },
            "& .MuiTablePagination-root": {
              color: theme.text.secondary,
            },
            "& .MuiButtonBase-root": {
              color: theme.text.primary,
            },
            "& .MuiCheckbox-root": {
              color: theme.icon.color,
            },
            "& .MuiDataGrid-columnSeparator": {
              color: theme.divider,
            },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              sx: {
                color: theme.text.primary,
                "& .MuiButton-root": {
                  color: theme.text.primary,
                },
                "& .MuiInputBase-root": {
                  color: theme.text.primary,
                  borderColor: theme.divider,
                },
              },
            },
          }}
        />
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            backgroundColor: theme.card.backgroundColor,
            color: theme.text.primary,
            boxShadow: theme.elevation[2],
          },
        }}
      >
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
