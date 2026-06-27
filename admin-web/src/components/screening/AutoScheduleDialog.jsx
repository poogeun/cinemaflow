import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { formatDateTime } from "../../utils/date.js";

const AutoScheduleDialog = ({
  open,
  movies,
  theaters,
  loading,
  preview,
  form,
  onClose,
  onChange,
  onGeneratePreview,
  onConfirm,
}) => {
  const getSelectedMovieText = (selectedIds) => {
    if (!selectedIds.length) {
      return "영화를 선택하세요";
    }

    return selectedIds
      .map((id) => {
        const movie = movies.find((movie) => movie.id === Number(id));
        return movie?.title;
      })
      .filter(Boolean)
      .join(", ");
  };

  const getSelectedTheaterText = (selectedIds) => {
    if (!selectedIds.length) {
      return "상영관을 선택하세요";
    }

    return selectedIds
      .map((id) => {
        const theater = theaters.find((theater) => theater.id === Number(id));
        return theater?.name;
      })
      .filter(Boolean)
      .join(", ");
  };

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
            p: 1,
            boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
          },
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          자동 상영 편성
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "#6b7280" }}>
          영화, 상영관, 운영 시간을 기준으로 상영 일정을 자동 생성합니다.
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          select
          fullWidth
          label="영화 선택"
          value={form.movieIds}
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },            
            select: {
              multiple: true,
              displayEmpty: true,
              renderValue: (selected) => getSelectedMovieText(selected),
              onChange: (e) => onChange("movieIds", e.target.value),
            }
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 }, mt: 2 }}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.title} · {movie.runningTime} min
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="상영관 선택"
          value={form.theaterIds}
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },            
            select: {
              multiple: true,
              displayEmpty: true,
              renderValue: (selected) => getSelectedTheaterText(selected),
              onChange: (e) => onChange("theaterIds", e.target.value),
            }
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        >
          {theaters.map((theater) => (
            <MenuItem key={theater.id} value={theater.id}>
              {theater.name} · {theater.seatRow * theater.seatColumn} seats
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          <TextField
            label="시작일"
            type="date"
            value={form.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />

          <TextField
            label="종료일"
            type="date"
            value={form.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />

          <TextField
            label="운영 시작 시간"
            type="time"
            value={form.openTime}
            onChange={(e) => onChange("openTime", e.target.value)}
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />

          <TextField
            label="운영 종료 시간"
            type="time"
            value={form.closeTime}
            onChange={(e) => onChange("closeTime", e.target.value)}
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />                    
        </Box>

        <TextField
          label="정리 시간(분)"
          type="number"
          value={form.cleaningMinutes}
          onChange={(e) => onChange("cleaningMinutes", Number(e.target.value))}
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        <Button
          variant="outlined"
          onClick={onGeneratePreview}
          disabled={loading}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 3,
            px: 2.5,
            py: 1,
            textTransform: "none",
            fontWeight: 800,
            borderColor: "#4f46e5",
            color: "#4f46e5",
          }}
        >
          {loading ? "Generating..." : "미리보기 생성"}
        </Button>

        {preview && (
          <Paper
            sx={{
              p: 2,
              borderRadius: 4,
              bgcolor: "#f8fafc",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography sx={{ fontWeight: 900 }}>
              미리보기 결과
            </Typography>

            <Typography sx={{ mt: 0.5, color: "#6b7280", fontSize: 14 }}>
              생성 {preview.summary.generated}개 · 충돌{" "}
              {preview.summary.conflicts}개 · 건너뜀{" "}
              {preview.summary.skipped}개
            </Typography>

            <Box sx={{ mt: 2, maxHeight: 260, overflow: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>영화</TableCell>
                    <TableCell>상영관</TableCell>
                    <TableCell>시작</TableCell>
                    <TableCell>종료</TableCell>
                    <TableCell>러닝타임</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {preview.items.slice(0, 30).map((item, index) => (
                    <TableRow key={`${item.theaterId}-${item.startTime}-${index}`}>
                      <TableCell>{item.movieTitle}</TableCell>
                      <TableCell>{item.theaterName}</TableCell>
                      <TableCell>{formatDateTime(item.startTime)}</TableCell>
                      <TableCell>{formatDateTime(item.endTime)}</TableCell>
                      <TableCell>{item.runningTime} min</TableCell>                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            {preview.items.length > 30 && (
              <Typography sx={{ mt: 1, color: "#6b7280", fontSize: 13 }}>
                처음 30개만 표시합니다.
              </Typography>
            )}
          </Paper>
        )}
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
          onClick={onConfirm}
          disabled={loading || !preview?.items?.length}
          sx={{
            borderRadius: 3,
            px: 2.5,
            py: 1.2,
            bgcolor: "#4f46e5",
            textTransform: "none",
            fontWeight: 800,
          }}
        >
          확정 저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutoScheduleDialog;