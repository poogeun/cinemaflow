import {
  Box,
  Button,
  Chip,
  Dialog,
  Typography,
} from "@mui/material";

const TheaterDetailDialog = ({
  open,
  theater,
  onClose,
}) => {
  
  const groupedSeats = {};

  theater?.seats?.forEach((seat) => {
    const row = seat.rowLabel;

    if (!groupedSeats[row]) {
      groupedSeats[row] = [];
    }

    groupedSeats[row].push(seat);
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
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
      {theater && (
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
              {theater.name} Seat Layout
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              상영관 좌석 배치를 확인합니다.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1.8,
              }}
            >
              <Chip
                label={`${theater.seatRow} Rows`}
                size="small"
                sx={{
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                  fontWeight: 800,
                }} 
              />

              <Chip
                label={`${theater.seatColumn} Columns`}
                size="small"
                sx={{
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                  fontWeight: 800,
                }} 
              />

              <Chip
                label={`${theater.seatRow * theater.seatColumn} Seats`}
                size="small"
                sx={{
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                  fontWeight: 800,
                }} 
              />                
            </Box>
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
            height: 42,
            borderRadius: 4,
            bgcolor: "#111827",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 2,
            mb: 3.5,
          }}
        >
          SCREEN
        </Box>

        <Box
          sx={{
            bgcolor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 5,
            p: 3.2,
          }}
        >
          {Object.entries(groupedSeats || {}).map(([rowLabel, seats]) => (
            <Box
              key={rowLabel}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  width: 22,
                  textAlign: "center",
                  fontWeight: 900,
                  color: "#6b7280",
                }}
              >
                {rowLabel}
              </Typography>

              {seats
                .sort((a, b) => a.seatNumber - b.seatNumber)
                .map((seat) => (
                  <Box
                    key={seat.id}
                    sx={{
                      width: 48,
                      height: 40,
                      borderRadius: 3,
                      bgcolor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#374151",
                    }}
                  >
                    {seat.rowLabel}
                    {seat.seatNumber}
                  </Box>
                ))}
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2.5,
              color: "#6b7280",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Available Seat
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            onClick={onClose}
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
            Close
          </Button>
        </Box>
        </>
      )}
    </Dialog>    
  );
};

export default TheaterDetailDialog;