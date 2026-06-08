import { Box, Button, Dialog, Typography } from "@mui/material";

const ConfirmDialog = ({
  open,
  title,
  description,
  targetName,
  confirmText = "Delete",
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
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
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          bgcolor: "#fef2f2",
          color: "#dc2626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: 900,
          mb: 2.2,
        }}
      >
        !
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          letterSpacing: "-0.4px",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#6b7280",
          lineHeight: 1.6,
          fontSize: 14,
        }}
      >
        {description}
      </Typography>

      {targetName && (
        <Box
          sx={{
            mt: 2,
            px: 2,
            py: 1.6,
            borderRadius: 3,
            bgcolor: "#f9fafb",
            border: "1px solid #e5e7eb",
            fontWeight: 800,
          }}
        >
          {targetName}
        </Box>
      )}

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
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
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
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;