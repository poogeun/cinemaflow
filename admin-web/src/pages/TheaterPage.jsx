import { useEffect, useState } from "react";
import { createTheater, deleteTheater, getTheater, getTheaters } from "../api/theater.api.js";
import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDialog from "../components/common/ConfirmDialog";
import TheaterDialog from "../components/theater/TheaterDialog";
import TheaterDetailDialog from "../components/theater/TheaterDetailDialog";

const TheaterPage = () => {
  const [theaters, setTheaters] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    seatRow: "",
    seatColumn: "",
  });
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTheaters = async () => {
    const data = await getTheaters();
    setTheaters(data);
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const filteredTheaters = theaters.filter((theater) =>
    theater.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      seatRow: "",
      seatColumn: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await createTheater({
      name: form.name,
      seatRow: Number(form.seatRow),
      seatColumn: Number(form.seatColumn),
    });

    await fetchTheaters();
    handleClose();
  };

  const handleDetailOpen = async (theaterId) => {
    const data = await getTheater(theaterId);
    setSelectedTheater(data);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setSelectedTheater(null);
    setDetailOpen(false);
  };

  const handleDeleteOpen = (theater) => {
    setDeleteTarget(theater);
    setDeleteOpen(true);
  }

  const handleDeleteClose = () => {
    setDeleteTarget(null);
    setDeleteOpen(false);
  }

  const handleDelete = async () => {
    await deleteTheater(deleteTarget.id);

    await fetchTheaters();
    handleDeleteClose;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
    },
    {
      field: "seatRow",
      headerName: "Rows",
      flex: 1,
    },
    {
      field: "seatColumn",
      headerName: "Columns",
      flex: 1,
    },
    {
      field: "seats",
      headerName: "Seats",
      flex: 1,
      renderCell: (params) => {
        const total = params.row.seatRow * params.row.seatColumn;

        return (
          <Chip
            label={`${total} seats`}
            size="small"
            sx={{
              bgcolor: "#eef2ff",
              color: "#4f46e5",
              fontWeight: 800,
              borderRadius: 999,
            }}
          />
        );
      },
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
            onClick={() => handleDetailOpen(params.row.id)}
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
            View
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
            Theater Management
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6b7280",
            }}
          >
            상영관과 좌석 구성을 관리합니다.
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
          + Add Theater
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
            placeholder="Search theater name..."
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
            상영관 생성 시 좌석이 자동 생성됩니다.
          </Typography>
        </Box>

        <DataGrid
          rows={filteredTheaters}
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

      <TheaterDialog
        open={open}
        form={form}
        onClose={handleClose}
        onChange={handleChange}
        onSave={handleSave}
      />

      <TheaterDetailDialog
        open={detailOpen}
        theater={selectedTheater}
        onClose={handleDetailClose}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Theater"
        description={
          <>
            이 상영관을 삭제하시겠습니까?
            <br />
            삭제된 상영관 및 좌석 정보는 복구할 수 없습니다.
          </>
        }
        targetName={deleteTarget?.name}
        onClose={handleDeleteClose}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default TheaterPage;