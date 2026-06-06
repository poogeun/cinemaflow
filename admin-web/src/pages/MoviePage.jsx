import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../api/axios.js";

const MoviePage = () => {
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
    {
      field: "createdAt",
      headerName: "Created", 
      width: 140,
      valueFormatter: (value) => {
        return new Date(value).toISOString().slice(0,10);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, height: "100%", alignItems: "center" }}>
          <Button
            size="small"
            onClick={() => handleEditOpen(params.row)}
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
            onClick={() => handleDeleteOpen(params.row) }
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

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [keyword, setKeyword] = useState("");

  const [form, setForm] = useState({
    title: "",
    runningTime: "",
    description: "",
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const filterdMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (selectedMovie) {
      await api.put(`/movies/${selectedMovie.id}`, {
        title: form.title,
        runningTime: Number(form.runningTime),
        description: form.description,
      });
    } else {
      await api.post("/movies", {
        title: form.title,
        runningTime: Number(form.runningTime),
        description: form.description,
      });
    }

    await fetchMovies();

    setForm({
      title: "",
      runningTime: "",
      description: "",
    });

    setSelectedMovie(null);

    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    setForm({
      title: "",
      runningTime: "",
      description: "",
    });

    setSelectedMovie(null);
  };

  const fetchMovies = async () => {
    const response = await api.get("/movies");

    setMovies(response.data);
  };

  const handleDeleteOpen = (movie) => {
    setSelectedMovie(movie);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setSelectedMovie(null);
    setDeleteOpen(false);
  }

  const handleDelete = async () => {
    await api.delete(`/movies/${selectedMovie.id}`);

    await fetchMovies();
    handleDeleteClose();
  };

  const handleEditOpen = (movie) => {
    setSelectedMovie(movie);

    setForm({
      title: movie.title,
      runningTime: movie.runningTime,
      description: movie.description ?? "",
    });

    setOpen(true);
  }

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
          rows={filterdMovies}
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
        slotProps={{
          paper: {
            sx: {
              borderRadius: 6,
              p: 1,
              boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
            },
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
            {selectedMovie ? "Edit Movie" : "Add Movie"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#6b7280",
            }}
          >
            {selectedMovie
              ? "영화 정보를 수정합니다."
              : "새로운 영화 정보를 등록합니다."}
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
            }}
          >
            {selectedMovie ? "Update Movie" : "Save Movie"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 6,
              p: 3,
              boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
            },
          },
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            bgcolor: "#fef2f2",
            color: "#dc2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 900,
            mb: 2.2,
          }}
        >
          !
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.4px",
            mb: 1,
          }}
        >
          Delete Movie
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          이 영화를 삭제하시겠습니까?
          <br />
          삭제된 영화는 정보를 복구할 수 없습니다.
        </Typography>

        <Box
          sx={{
            mt: 2,
            px: 2,
            py: 1.6,
            borderRadius: 3,
            bgcolor: "#f9fafb",
            border: "1px solid #e5e7eb",
            fontWeight: 800,
          }}
        >
          {selectedMovie?.title}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.2,
            mt: 3.2,
          }}
        >
          <Button
            onClick={handleDeleteClose}
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
            onClick={handleDelete}
            sx={{
              borderRadius: 3,
              px: 2.5,
              py: 1.2,
              bgcolor: "#dc2626",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 800,
              "&:hover": {
                bgcolor: "#b91c1c",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MoviePage;