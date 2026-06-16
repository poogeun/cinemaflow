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

const MovieDialog = ({
  open,
  form,
  isEdit,
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
          {isEdit ? "Edit Movie" : "Add Movie"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "#6b7280",
          }}
        >
          {isEdit
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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

        <Box>
          <Typography
            sx={{
              mb: 1,
              fontSize: 14,
              fontWeight: 800,
              color: "#374151",
            }}
          >
            포스터 이미지 URL
          </Typography>

          <TextField
            name="posterUrl"
            value={form.posterUrl}
            onChange={onChange}
            fullWidth
            placeholder="https://example.com/poster.jpg"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                height: 46,
              },
            }}
          />
        </Box>

        {form.posterUrl && (
          <Box
            component="img"
            src={form.posterUrl}
            alt="포스터 미리보기"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
            sx={{
              width: 120,
              aspectRatio: "2 / 3",
              alignSelf: "center",
              objectFit: "cover",
              borderRadius: 3,
              bgcolor: "#eef2ff",
              boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
            }}
          />
        )}                            
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
          {isEdit ? "Update Movie" : "Save Movie"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDialog;