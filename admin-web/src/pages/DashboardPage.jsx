import { Box, Card, CardContent, Chip, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getDashboard } from "../api/dashboard.api.js";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    const data = await getDashboard();
    setDashboard(data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatTime = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const summaryCards = [
    {
      label: "오늘 상영",
      value: `${dashboard?.summary?.todayScreenings ?? 0}건`,
    },
    {
      label: "오늘 예매",
      value: `${dashboard?.summary?.todayReservations ?? 0}건`,
    },
    {
      label: "오늘 취소",
      value: `${dashboard?.summary?.todayCanceled ?? 0}건`,
    },        
  ];

  const screenings = dashboard?.nowScreenings ?? [];
  const soldOutList = dashboard?.nearSoldOut ?? [];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 1,
          }}
        >
          오늘 운영 현황
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          오늘 상영, 예매, 취소 현황을 한눈에 확인합니다.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card) => (
          <Grid size={{ xs: 12, md: 4 }} key={card.label}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                  }}
                >
                  {card.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    fontWeight: 900
                  }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 900,
              }}
            >
              현재 상영중
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>영화</TableCell>
                  <TableCell>시간</TableCell>
                  <TableCell>상영관</TableCell>
                  <TableCell>예매 좌석</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {screenings.map((screening) => (
                  <TableRow
                    key={`${screening.movieTitle}-${formatTime(screening.startTime)}`}
                  >
                    <TableCell>
                      {screening.movieTitle}
                    </TableCell>

                    <TableCell>
                      {formatTime(screening.startTime)}
                    </TableCell>

                    <TableCell>
                      {screening.theaterName}
                    </TableCell>

                    <TableCell>
                      {`${screening.reservedSeats} / ${screening.totalSeats}`}
                    </TableCell>
                 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 900,
              }}
            >
              오늘 매진 임박
            </Typography>
            {soldOutList.map((item) => (
              <Box
                key={item.movieTitle}
                sx={{
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    {item.movieTitle}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    {item.reservationRate}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={item.reservationRate}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                  }} 
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;