import { Box, Button, Chip, Dialog, Typography } from "@mui/material";

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

const getSeatTextList = (reservation) => {
  return (
    reservation?.reservationSeats?.map(
      (item) => `${item.seat.rowLabel}${item.seat.seatNumber}`
    ) ?? []
  );
};

const ReservationDetailDialog = ({
  open,
  reservation,
  onClose,
  onCancel,
}) => {
  const seats = getSeatTextList(reservation);
  const isReserved = reservation?.status === "RESERVED";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
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
      {reservation && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  letterSpacing: "-0.4px",
                }}
              >
                Reservation Detail
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#6b7280",
                  fontSize: 14,
                }}
              >
                예약 상세 정보를 확인합니다.
              </Typography>

              <Chip
                label={reservation.status}
                size="small"
                sx={{
                  mt: 1.8,
                  bgcolor: isReserved ? "#ecfdf5" : "#fef2f2",
                  color: isReserved ? "#059669" : "#dc2626",
                  fontWeight: 900,
                  borderRadius: 999,
                }}
              />
            </Box>

            <Button
              onClick={onClose}
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "#f3f4f6",
                color: "#6b7280",
                fontWeight: 900,
              }}
            >
              x
            </Button>
          </Box>

          <Box
            sx={{
              bgcolor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 4.5,
              p: 2.2,
              display: "flex",
              flexDirection: "column",
              gap: 1.8,
            }}
          >
            <InfoRow label="Reservation ID" value={`#${reservation.id}`} />

            <InfoRow
              label="User"
              value={`${reservation.user?.name ?? "-"} · ${reservation.user?.email ?? "-"}`}
            />

            <InfoRow
              label="Movie"
              value={reservation.screening?.movie?.title ?? "-"} 
            />

            <InfoRow
              label="Theater"
              value={reservation.screening?.theater?.name ?? "-"}
            />

            <InfoRow
              label="Screening Time"
              value={`${formatDateTime(reservation.screening?.startTime)} ~ 
                ${formatDateTime(reservation.screening?.endTime)}`}
             />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                Seats
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {seats.map((seat) => (
                  <Chip
                    key={seat}
                    label={seat}
                    size="small"
                    sx={{
                      bgcolor: "#eef2ff",
                      color: "#4f46e5",
                      fontWeight: 900,
                      borderRadius: 999,
                    }}
                  />
                ))}
              </Box>
            </Box>

            <InfoRow
              label="Reserved At"
              value={formatDateTime(reservation.createdAt)}
            />
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
              onClick={onClose}
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
              Close
            </Button>

            {isReserved && (
              <Button
                onClick={onCancel}
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
                Cancel Reservation
              </Button>
            )}
          </Box>
        </>
      )}
    </Dialog>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2.5,
      }}
    >
      <Typography
        sx={{
          color: "#6b7280",
          fontSize: 14,
          fontWeight: 800,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 900,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
export default ReservationDetailDialog;