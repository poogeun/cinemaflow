import { useEffect, useState } from "react";
import { adminCancelReservation, getReservations } from "../api/reservation.api.js";
import { Box, Button, Chip, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ReservationDetailDialog from "../components/reservation/ReservationDetailDialog.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const getSeatText = (reservation) => {
  return reservation.reservationSeats
    ?.map((item) => `${item.seat.rowLabel}${item.seat.seatNumber}`)
    .join(", ");
};

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("ALL");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const fetchReservations = async () => {
    const data = await getReservations();
    setReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDetailOpen = (reservation) => {
    setSelectedReservation(reservation);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setSelectedReservation(null);
    setDetailOpen(false);
  };

  const handleCancelOpen = () => {
    setCancelOpen(true);
  };

  const handleCancelClose = () => {
    setCancelOpen(false);
  };

  const handleCancel = async () => {
    await adminCancelReservation(
      selectedReservation.id
    );

    await fetchReservations();

    handleCancelClose();
    handleDetailClose();
  };

  const filteredReservations = reservations.filter((reservation) => {
    const movieTitle = reservation.screening?.movie?.title ?? "";
    const userName = reservation.user?.name ?? "";

    const matchesKeyword =
      movieTitle.toLowerCase().includes(keyword.toLowerCase()) ||
      userName.toLowerCase.includes(keyword.toLowerCase());

    const matchesStatus =
      status === "ALL" || reservation.status === status;

    return matchesKeyword && matchesStatus;
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => `#${params.value}`,
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      renderCell: (params) => params.row.user?.name ?? "-",
    },
    {
      field: "movie",
      headerName: "Movie",
      flex: 1.4,
      renderCell: (params) => params.row.screening?.movie?.title ?? "-",
    },
    {
      field: "theater",
      headerName: "Theater",
      flex: 1,
      renderCell: (params) => params.row.screening?.theater?.name ?? "-",
    },
    {
      field: "seats",
      headerName: "Seats",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={getSeatText(params.row)}
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
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor:
              params.value === "RESERVED"
                ? "#ecfdf5"
                : "#fef2f2",
            color:
              params.value === "RESERVED"
                ? "#059669"
                : "#dc2626",
            fontWeight: 800,
            borderRadius: 999,
          }}
        />
      ),
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
            onClick={() => handleDetailOpen(params.row)}
            sx={{
              bgcolor: "#f3f4f6",
              color: "#111827",
              fontWeight: 700,
              textTransform: "none",
              minWidth: 64,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#e5e7eb",
              }
            }}
          >
            Detail
          </Button>
        </Box>
      ),
    },                 
  ]

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.5px",
          }}
        >
          Reservation Management
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6b7280",
          }}
        >
          전체 예매 내역을 조회하고 예약 상태를 관리합니다.
        </Typography>
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
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              placeholder="Search movie or user..."
              size="small"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{
                width: 340,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            <TextField
              select
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                width: 160,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },                
              }}
            >
              <MenuItem value="ALL">Status: All</MenuItem>
              <MenuItem value="RESERVED">RESERVED</MenuItem>
              <MenuItem value="CANCELED">CANCELED</MenuItem>
            </TextField>
          </Box>

          <Typography
            sx={{
              color: "#6b7280",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            예약 상세 확인 및 취소 처리를 할 수 있습니다.
          </Typography>
        </Box>

        <DataGrid
          rows={filteredReservations}
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

      <ReservationDetailDialog
        open={detailOpen}
        reservation={selectedReservation}
        onClose={handleDetailClose}
        onCancel={handleCancelOpen}
      />

      <ConfirmDialog
        open={cancelOpen}
        title="Cancel Reservation"
        description={
          <>
            이 예약을 취소하시겠습니까?
            <br />
            취소된 예약은 되돌릴 수 없습니다.
          </>
        }
        targetName={selectedReservation?.screening?.movie?.title}
        onClose={handleCancelClose}
        onConfirm={handleCancel}
      />
    </Box>
  );
};

export default ReservationPage;