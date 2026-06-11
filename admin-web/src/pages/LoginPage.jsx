import { useNavigate } from "react-router-dom";
import { getMe, login } from "../api/auth.api.js";
import { useState } from "react";
import { Alert, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { EmailOutlined, LockOutlined, MovieCreationOutlined, ShieldOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage(
        "이메일과 비밀번호를 입력해 주세요."
      );
      return;
    }

    try {
      setIsLoading(true);

      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      const user = await getMe();

      if (user.role !== "ADMIN") {
        localStorage.removeItem("accessToken");

        setErrorMessage(
          "관리자 계정만 로그인할 수 있습니다."
        );

        return;
      }

      navigate("/");
    } catch (error) {
      localStorage.removeItem("accessToken");
      
      setErrorMessage(
        error.response?.data?.message ??
          "로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        bgcolor: "#f7f8fc",
        px: 2.5,
        py: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -260,
          left: -170,
          width: 400,
          height: 480,
          borderRadius: "50%",
          bgcolor: "rgba(79,70,229,0.11)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: -220,
          left: -280,
          width: 560,
          height: 560,
          borderRadius: "50%",
          bgcolor: "rgba(99,102,241,0.08)",
        }}
      />

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          p: {
            xs: 3,
            sm: 5,
          },
          border: "1px solid #e8eaf3",
          borderRadius: 6,
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 3.75,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: 46,
              height: 46,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3.5,
              color: "#fff",
              bgcolor: "#4f46e5",
              boxShadow: "0 10px 24px rgba(79,70,229,0.28)",
            }}
          >
            <MovieCreationOutlined />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: -0.5,
              }}
            >
              CinemaFlow
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              ADMIN CONSOLE
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: -0.8,
          }}
        >
          관리자 로그인
        </Typography>

        <Typography
          sx={{
            mt: 1.25,
            mb: 3.75,
            color: "text.secondary",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          CinemaFlow 관리자 계정으로 로그인해 주세요.
        </Typography>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: 3,
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <Typography
          component="label"
          htmlFor="email"
          sx={{
            display: "block",
            mb: 1,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          이메일
        </Typography>

        <TextField
          id="email"
          type="email"
          fullWidth
          value={email}
          placeholder="admin@cinemaflow.com"
          onChange={(event) => setEmail(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2.25,
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 3,
            },
          }}
        />

        <Typography
          component="label"
          htmlFor="password"
          sx={{
            display: "block",
            mb: 1,
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          비밀번호
        </Typography>

        <TextField
          id="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChange={(event) => setPassword(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: 3,
            },
          }}
        />        

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            height: 52,
            mt: 3.25,
            borderRadius: 3,
            bgcolor: "#4f46e5",
            boxShadow: "0 10px 24px rgba(79,70,229,0.22)",
            fontWeight: 900,
            "&:hover": {
              bgcolor: "#4338ca",
            },
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            mt: 3,
            color: "#9ca3af",
          }}>
          <ShieldOutlined sx={{ fontSize: 16 }} />

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            관리자 전용 보안 페이지입니다.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;