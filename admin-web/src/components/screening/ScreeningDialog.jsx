import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";

const ScreeningDialog = ({
  open,
  form,
  isEdit,
  movies,
  theaters,
  endTimeText,
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
          {isEdit ? "Edit Screening" : "Add Screening"}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "#6b7280" }}>
          {isEdit
            ? "상영 일정을 수정합니다."
            : "영화와 상영관을 선택해 상영 일정을 생성합니다." }
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, display: "flex", flexDirection: "column", gap: 2.2 }}>
        <Box>
          <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374141" }}>
            Movie
          </Typography>

          <TextField
            select
            fullWidth
            name="movieId"
            value={form.movieId}
            onChange={onChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 46 } }}
          >
            {movies.map((movie) => (
              <MenuItem key={movie.id} value={movie.id}>
                {movie.title} · {movie.runningTime} min
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374141" }}>
            Theater
          </Typography>

          <TextField
            select
            fullWidth
            name="theaterId"
            value={form.theaterId}
            onChange={onChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 46 } }}
          >
            {theaters.map((theater) => (
              <MenuItem key={theater.id} value={theater.id}>
                {theater.name} · {theater.seatRow * theater.seatColumn} seats
              </MenuItem>
            ))}
          </TextField>        
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.8 }}>
          <Box>
            <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374141" }}>
              Start Date
            </Typography>

            <TextField
              fullWidth
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 46 } }}
            />      
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 800, color: "#374141" }}>
              Start Time
            </Typography>

            <TextField
              fullWidth
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={onChange}
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, height: 46 } }}
            />      
          </Box>          
        </Box>

        <Box
          sx={{
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
          선택한 영화의 상영시간을 기준으로 종료 시간이 자동 계산됩니다.
        </Box>

        <Box
          sx={{
            px: 2,
            py: 1.6,
            borderRadius: 3,
            bgcolor: "#eef2ff",
            color: "#4f46e5",
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          End Time · {endTimeText || "-"}
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
          variant="contained"
          onClick={onSave}
          sx={{
            borderRadius: 3,
            px: 2.5,
            py: 1.2,
            bgcolor: "#4f46e5",
            textTransform: "none",
            fontWeight: 800,
          }}
        >
          {isEdit ? "Update Screening" : "Save Screening"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScreeningDialog;