import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const rows = [
  {
    id: 1,
    title: "Interstellar",
    runningTime: 169,
    description: "Space science fiction movie",
    createdAt: "2026-06-01",
  },
  {
    id: 2,
    title: "Dune",
    runningTime: 155,
    description: "Epic science fiction film",
    createdAt: "2026-06-01",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "title", headerName: "Title", flex: 1 },
  {
    field: "runningTime",
    headerName: "Running Time",
    width: 150,
    renderCell: (params) => (
      <Chip
        label={`${params.value} min`}
        size="small"
        sx={{
          bgcolor: "#eef2ff",
          color: "#4f46e5",
          fontWeight: 700,
          borderRadius: 999,
        }}
      />
    ),
  },
  { field: "description", headerName: "Description", flex: 1.5 },
  { field: "createdAt", headerName: "Created", width: 140 },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    renderCell: () => (
      <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
        <Button
          size="small"
          sx={{
            bgcolor: "#f3f4f6",
            color: "#111827",
            fontWeight: 700,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#e5e7eb",
            },
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          sx={{
            bgcolor: "#fef2f2",
            color: "#dc2626",
            fontWeight: 700,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#fee2e2",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

const MoviePage = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    runningTime: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(form);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900
            }}
          >
            Movie Management
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            영화 정보를 등록하고 관리합니다.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 800,
            bgcolor: "#4f46e5",
          }}
        >
          + Add Movie
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
        }}
      >
        <TextField
          placeholder="Search movie title ..."
          size="small"
          sx={{
            width: 360,
          }} 
        />
      </Paper>

      <Paper 
        sx={{ 
          p: 2,
          borderRadius: 5,
          boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
        }}  
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          sx={{
            border: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: 800,
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },            

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f3f4f6",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #f3f4f6",
            },
          }} 
        />
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 6,
            p: 1,
            boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            pt: 3,
            pb: 1
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.4px",
            }}
          >
            Add Movie
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#6b7280",
            }}
          >
            새로운 영화 정보를 등록합니다.
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2.2,
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 800,
                color: "#374151",
              }}
            >
              Title
            </Typography>

            <TextField
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              placeholder="Enter movie title"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  height: 46,
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 800,
                color: "#374151",
              }}
            >
              Running Time
            </Typography>

            <TextField
              name="runningTime"
              value={form.runningTime}
              onChange={handleChange}
              fullWidth
              placeholder="Enter running time in minutes"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  height: 46,
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 800,
                color: "#374151",
              }}
            >
              Description
            </Typography>

            <TextField
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={4}
              placeholder="Enter movie description"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Box>                    
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: 3,
              px: 2.5,
              py: 1.2,
              bgcolor: "#f3f4f6",
              color: "#111827",
              textTransform: "none",
              fontWeight: 800,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 2.5,
              py: 1.2,
              bgcolor: "#4f46e5",
              textTransform: "none",
              fontWeight: 800,              
            }}>
            Save Movie
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MoviePage;