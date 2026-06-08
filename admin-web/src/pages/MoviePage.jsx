import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { createMovie, deleteMovie, getMovies, updateMovie } from "../api/movie.api.js";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import MovieDialog from "../components/movie/MovieDialog.jsx";

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
    const payload = {
      title: form.title,
      runningTime: Number(form.runningTime),
      description: form.description,
    };

    if (selectedMovie) {
      await updateMovie(selectedMovie.id, payload);
    } else {
      await createMovie(payload);
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
    const data = await getMovies();
    setMovies(data);
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
    await deleteMovie(selectedMovie.id);

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

      <MovieDialog
        open={open}
        form={form}
        isEdit={!!selectedMovie}
        onClose={handleClose}
        onChange={handleChange}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Movie"
        description={
          <>
            이 영화를 삭제하시겠습니까?
            <br />
            삭제된 영화 정보는 복구할 수 없습니다.
          </>
        }
        targetName={selectedMovie?.title}
        onClose={handleDeleteClose}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default MoviePage;