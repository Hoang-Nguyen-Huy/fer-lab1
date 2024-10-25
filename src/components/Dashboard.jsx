/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
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
  Modal,
  TextField,
  Switch,
  FormControl,
  Select,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeContext } from "../themes/ThemeContext";
import {
  createOrchid,
  deleteOrchid,
  getAllOrchids,
  updateOrchid,
} from "../apis/OrchidsApi";
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  AutoAwesome as AutoAwesomeIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { categories } from "../OrchidCategory";
import { countries } from "../OrchidOrigin";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  rating: Yup.number().min(0).max(5).required("Rating is required"),
  isSpecial: Yup.boolean(),
  color: Yup.string().required("Color is required"),
  origin: Yup.string().required("Origin is required"),
  category: Yup.string().required("Category is required"),
  detail: Yup.string().required("Detail is required"),
  video: Yup.string().nullable(),
});

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [orchids, setOrchids] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  useEffect(() => {
    fetchOrchids();
  }, []);

  const handleMenuOpen = (event, orchid) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrchid(orchid);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrchid(null);
    setModalMode("create");
  };

  const handleUpdate = (orchid) => {
    setSelectedOrchid(orchid);
    setModalMode("update");
    setIsModalOpen(true);
    setImagePreview(orchid.image);
  };

  const handleDelete = async () => {
    try {
      await deleteOrchid(selectedOrchid.Id);
      await fetchOrchids();
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting orchid: ", error);
    }
  };

  const handleAddOrchid = () => {
    setModalMode("create");
    setIsModalOpen(true);
    setImagePreview(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: 0,
      isSpecial: false,
      color: "",
      origin: "",
      category: "",
      detail: "",
      video: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let imageUrl = "";
        if (
          (values.image && modalMode === "create") ||
          (modalMode === "update" && values.image !== selectedOrchid.image)
        ) {
          const storageRef = ref(storage, `orchid-images/${values.image.name}`);
          await uploadBytes(storageRef, values.image);
          imageUrl = await getDownloadURL(storageRef);
        }

        const orchidData = {
          ...values,
          image:
            imageUrl === "" && selectedOrchid.image !== null
              ? selectedOrchid.image
              : imageUrl,
        };

        if (modalMode === "create") {
          await createOrchid(orchidData);
        } else if (modalMode === "update" && selectedOrchid) {
          await updateOrchid(selectedOrchid.Id, orchidData);
          handleMenuClose();
        } else {
          throw new Error("Invalid modal mode or missing selectedOrchid");
        }

        await fetchOrchids();
        resetForm();
        setIsModalOpen(false);
        setImagePreview(null);
      } catch (error) {
        console.error(
          `Error ${modalMode === "create" ? "creating" : "updating"} orchid:`,
          error
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (selectedOrchid && modalMode === "update") {
      formik.setValues({
        name: selectedOrchid.name,
        rating: selectedOrchid.rating,
        isSpecial: selectedOrchid.isSpecial,
        color: selectedOrchid.color,
        origin: selectedOrchid.origin,
        category: selectedOrchid.category,
        detail: selectedOrchid.detail,
        video: selectedOrchid.video,
        image: selectedOrchid.image,
      });
      setImagePreview(selectedOrchid.image);
    }
  }, [selectedOrchid, modalMode]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.currentTarget.files[0]);
  };

  const columns = [
    {
      field: "index",
      headerClassName: "super-app-theme--header",
      headerName: "ID",
      width: 60,
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Orchid name",
      width: 140,
    },
    {
      field: "rating",
      headerClassName: "super-app-theme--header",
      headerName: "Rating",
      width: 140,
      renderCell: (params) => (
        <Rating name='read-only' value={Number(params.value)} readOnly />
      ),
    },
    {
      field: "isSpecial",
      headerClassName: "super-app-theme--header",
      headerName: "Special Orchid",
      width: 150,
      renderCell: (params) =>
        params.value ? (
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
      headerClassName: "super-app-theme--header",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "src/assets/images/image.jpg"}
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
    {
      field: "color",
      headerClassName: "super-app-theme--header",
      headerName: "Color",
      width: 100,
    },
    {
      field: "origin",
      headerClassName: "super-app-theme--header",
      headerName: "Origin",
      width: 130,
    },
    {
      field: "category",
      headerClassName: "super-app-theme--header",
      headerName: "Category",
      width: 130,
    },
    {
      field: "video",
      headerClassName: "super-app-theme--header",
      headerName: "Video",
      width: 150,
      renderCell: (params) => (
        <iframe
          width='100%'
          height='100%'
          src={
            params.value ||
            "https://www.youtube.com/embed/dQw4w9WgXcQ?si=xaqoh0xatwfp_iun"
          }
          title={`${params.row.name} video`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          style={{ borderRadius: "6px" }}
        ></iframe>
      ),
    },
    {
      field: "detail",
      headerClassName: "super-app-theme--header",
      headerName: "Detail",
      width: 200,
      flex: 1,
    },
    {
      field: "actions",
      headerClassName: "super-app-theme--header",
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
        minHeight: "calc(100vh - 64px)",
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
          disableRowSelectionOnClick
          sx={{
            border: `1px solid ${theme.divider}`,
            borderRadius: "8px",
            "& .MuiDataGrid-root": {
              backgroundColor: alpha(theme.card.backgroundColor, 0.6),
              color: theme.text.primary,
            },
            "& .super-app-theme--header": {
              backgroundColor: theme.mainContent.backgroundColor,
              color: theme.text.primary,
              borderBottom: `2px solid ${theme.divider}`,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${alpha(theme.divider, 0.3)}`,
              color: theme.text.primary,
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
        <MenuItem onClick={() => handleUpdate(selectedOrchid)}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        disableScrollLock={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.card.backgroundColor,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
            color: theme.text.primary,
          }}
        >
          <Typography variant='h6' component='h2' gutterBottom>
            {modalMode === "create" ? "Add New Orchid" : "Update Orchid"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ gap: 2 }}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Orchid Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <FormControl fullWidth>
                <Box>
                  <Typography component='legend'>Rating</Typography>
                </Box>
                <Rating
                  name='rating'
                  value={Number(formik.values.rating)}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("rating", newValue);
                  }}
                />
              </FormControl>
              <Box>
                <Typography component='legend'>Special Orchid</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      name='isSpecial'
                      checked={formik.values.isSpecial}
                      onChange={formik.handleChange}
                    />
                  }
                />
              </Box>
              <TextField
                fullWidth
                id='color'
                name='color'
                label='Orchid Color'
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
              <FormControl fullWidth>
                <InputLabel id='origin-label'>Orchid Origin</InputLabel>
                <Select
                  labelId='origin-label'
                  id='origin'
                  name='origin'
                  label='Orchid Origin'
                  value={formik.values.origin}
                  onChange={formik.handleChange}
                  error={formik.touched.origin && Boolean(formik.errors.origin)}
                >
                  {countries.map((c) => (
                    <MenuItem key={c.code} value={c.label}>
                      <img
                        loading='lazy'
                        width='20'
                        srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                        alt=''
                      />
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='category-label'>Orchid Category</InputLabel>
                <Select
                  labelId='category-label'
                  id='category'
                  name='category'
                  label='Orchid Category'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id='detail'
                name='detail'
                label='Detail'
                multiline
                rows={4}
                value={formik.values.detail}
                onChange={formik.handleChange}
                error={formik.touched.detail && Boolean(formik.errors.detail)}
                helperText={formik.touched.detail && formik.errors.detail}
              />
              <TextField
                fullWidth
                id='video'
                name='video'
                label='Orchid Video URL'
                value={formik.values.video}
                onChange={formik.handleChange}
                error={formik.touched.video && Boolean(formik.errors.video)}
                helperText={formik.touched.video && formik.errors.video}
              />
              <input
                accept='image/*'
                style={{ display: "none" }}
                id='raised-button-file'
                type='file'
                onChange={(event) => {
                  onSelectFile(event);
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor='raised-button-file'>
                <Button
                  variant='contained'
                  component='span'
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <img
                    src={imagePreview}
                    alt='Image preview'
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={formik.isSubmitting}
                sx={{ mt: 2 }}
              >
                {formik.isSubmitting
                  ? "Submitting..."
                  : modalMode === "create"
                  ? "Submit"
                  : "Update"}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
