import { useEffect, useState } from "react";
import { deleteScreening, getScreenings, updateScreening } from "../api/screening.api.js";
import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getMovies } from "../api/movie.api.js";
import { getTheaters } from "../api/theater.api.js";
import { createScreening } from "../api/screening.api.js";
import ScreeningDialog from "../components/screening/ScreeningDialog.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const formatDateTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ScreeningPage = () => {
  const [screenings, setScreenings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);

  const [form, setForm] = useState({
    movieId: "",
    theaterId: "",
    startDate: "",
    startTime: "",
  });

  const fetchScreenings = async () => {
    const data = await getScreenings();
    console.log(data);
    setScreenings(data);
  };

  const fetchInitData = async () => {
    const [movieData, theaterData] = await Promise.all([
      getMovies(),
      getTheaters(),
    ]);

    setMovies(movieData);
    setTheaters(theaterData);
  };  

  useEffect(() => {
    fetchScreenings();
    fetchInitData();
  }, []);

  const filteredScreenings = screenings.filter((screening) =>
    screening.movie?.title
      ?.toLowerCase()
      .includes(keyword.toLowerCase())
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setForm({
      movieId: "",
      theaterId: "",
      startDate: "",
      startTime: "",      
    });

    setSelectedScreening(null);
    setOpen(false);
  };

  const handleDeleteOpen = (screening) => {
    setDeleteTarget(screening);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteTarget(null);
    setDeleteOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const endTime = calculateEndTime();

    const payload = {
      movieId: Number(form.movieId),
      theaterId: Number(form.theaterId),
      startTime: new Date(`${form.startDate}T${form.startTime}`).toISOString(),
      endTime: endTime.toISOString(),      
    }

    if (selectedScreening) {
      await updateScreening(selectedScreening.id, payload);
    } else {
      await createScreening(payload);
    }

    await fetchScreenings();
    handleClose();
  };

  const handleDelete = async () => {
    await deleteScreening(deleteTarget.id);

    await fetchScreenings();
    handleDeleteClose();
  };

  const formatInputDate = (value) => {
    const date = new Date(value);
    return date.toISOString().slice(0, 10);
  };

  const formatInputTime = (value) => {
    const date = new Date(value);
    return date.toISOString().slice(11, 16);
  };

  const handleEditOpen = (screening) => {
    setSelectedScreening(screening);

    setForm({
      movieId: screening.movieId,
      theaterId: screening.theaterId,
      startDate: formatInputDate(screening.startTime),
      startTime: formatInputTime(screening.startTime),
    });

    setOpen(true);
  };

  const getSelectedMovie = () => {
    return movies.find((movie) => movie.id === Number(form.movieId));
  };

  const calculateEndTime = () => {
    const movie = getSelectedMovie();

    if(!movie || !form.startDate || !form.startTime) {
      return "";
    }

    const start = new Date(`${form.startDate}T${form.startTime}`);
    start.setMinutes(start.getMinutes() + movie.runningTime);

    return start;
  };

  const formatEndTime = () => {
    const end = calculateEndTime();

    if (!end) {
      return "";
    }

    return end.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",      
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "movie",
      headerName: "Movie",
      flex: 1.5,
      renderCell: (params) => params.row.movie?.title ?? "-",
    },
    {
      field: "theater",
      headerName: "Theater",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.theater?.name ?? "-"}
          size="small"
          sx={{
            bgcolor: "#eef2ff",
            color: "#4f46e5",
            fontWeight: 800,
            borderRadius: 999,
          }}
        />
      ),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1.5,
      renderCell: (params) => formatDateTime(params.value),
    },
    {
      field: "endTime",
      headerName: "End Time",
      flex: 1.5,
      renderCell: (params) => formatDateTime(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            size="small"
            onClick={() => handleEditOpen(params.row)}
            sx={{
              bgcolor: "#f3f4f6",
              color: "#111827",
              fontWeight: 700,
              textTransform: "none",
              minWidth: 56,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#e5e7eb",
              },
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            onClick={() => handleDeleteOpen(params.row)}
            sx={{
              bgcolor: "#fef2f2",
              color: "#dc2626",
              fontWeight: 700,
              textTransform: "none",
              minWidth: 64,
              borderRadius: 2,
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
              fontWeight: 900,
              letterSpacing: "-0.5px",
            }}
          >
            Screening Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6b7280",
            }}
          >
            영화별 상영 일정을 등록하고 관리합니다.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.2,
            bgcolor: "#4f46e5",
            textTransform: "none",
            fontWeight: 800,
          }}
        >
          + Add Screening
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2.2,
          borderRadius: 5,
          boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
          border: "1px solid #eef0f4",
        }}
      >
        <Box
          sx={{
            mb: 2.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            placeholder="Search movie title..."
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              width: 360,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Typography
            sx={{
              color: "#6b7280",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            영화와 상영관을 선택해 상영 일정을 생성합니다.
          </Typography>
        </Box>

        <DataGrid
          rows={filteredScreenings}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            overflow: "hidden",

            "& .MuiDataGrid-columnHeader": {
              bgcolor: "#f9fafb",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 800,
              color: "#6b7280",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              borderBottom: "1px solid #f1f3f5",
            },

            "& .MuiDataGrid-row:hover": {
              bgcolor: "#f8fafc",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #f1f3f5",
            },
          }}
        />
      </Paper>

      <ScreeningDialog
        open={open}
        form={form}
        isEdit={!!selectedScreening}
        movies={movies}
        theaters={theaters}
        endTimeText={formatEndTime()}
        onClose={handleClose}
        onChange={handleChange}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Screening"
        description={
          <>
            이 상영 일정을 삭제하시겠습니까?
            <br />
            삭제된 상영 일정은 복구할 수 없습니다.
          </>
        }
        targetName={deleteTarget?.movie?.title}
        onClose={handleDeleteClose}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ScreeningPage;