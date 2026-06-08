import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const TheaterDialog = ({
  open,
  form,
  onClose,
  onChange,
  onSave,
}) => {
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
            p: 1,
            boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
          },
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: "-0.4px" }}>
          Add Theater
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "#6b7280" }}>
          상영관 정보를 입력하면 좌석이 자동 생성됩니다.
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2.2,
        }}
      >
        <Box>
          <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374151" }}>
            Name
          </Typography>

          <TextField
            fullWidth
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter theater name"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                height: 46,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.8 }}>
          <Box>
            <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374151" }}>
              Rows
            </Typography>

            <TextField
              fullWidth
              name="seatRow"
              value={form.seatRow}
              onChange={onChange}
              placeholder="5"
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
            <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374151" }}>
              Columns
            </Typography>

            <TextField
              fullWidth
              name="seatColumn"
              value={form.seatColumn}
              onChange={onChange}
              placeholder="8"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  height: 46,
                },
              }}
              />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 0.5,
            px: 2,
            py: 1.6,
            borderRadius: 3,
            bgcolor: "#f9fafb",
            border: "1px solid #e5e7eb",
            color: "#6b7280",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          예: Row 5, Columns 8 입력 시 A1 ~ E8까지 총 40석이 생성됩니다.
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
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
          Cancel
        </Button>

        <Button
          onClick={onSave}
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
          Save Theater
        </Button>
      </DialogActions>
    </Dialog>    
  );
};

export default TheaterDialog;