import { Box, Card, CardContent, Chip, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const summaryCards = [
  {
    label: "오늘 상영",
    value: "12건",
  },
  {
    label: "오늘 예매",
    value: "143건",
  },
  {
    label: "오늘 취소",
    value: "7건",
  },
];

const screenings = [
  {
    movie: "인터스텔라",
    time: "14:00",
    theater: "1관",
    seats: "32 / 40",
    status: "상영중",
  },
  {
    movie: "듄",
    time: "15:00",
    theater: "2관",
    seats: "18 / 40",
    status: "상영중",
  },
  {
    movie: "인셉션",
    time: "16:30",
    theater: "3관",
    seats: "21 / 50",
    status: "준비중",
  },
];

const soldOutList = [
  {
    movie: "인터스텔라",
    rate: 80,
    description: "14:00 · 1관 · 32 / 40",
  },
  {
    movie: "듄",
    rate: 72,
    description: "19:00 · 2관 · 36 / 50",
  },
  {
    movie: "오펜하이머",
    rate: 68,
    description: "21:00 · 1관 · 27 / 40",
  },
];

const DashboardPage = () => {
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
                  <TableCell>상태</TableCell>                  
                </TableRow>
              </TableHead>

              <TableBody>
                {screenings.map((screening) => (
                  <TableRow
                    key={`${screening.movie}-${screening.time}`}
                  >
                    <TableCell>
                      {screening.movie}
                    </TableCell>

                    <TableCell>
                      {screening.time}
                    </TableCell>

                    <TableCell>
                      {screening.theater}
                    </TableCell>

                    <TableCell>
                      {screening.seats}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={screening.status}
                        color={
                          screening.status === "상영중"
                            ? "success"
                            : "default"
                        }
                      />
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
                key={item.movie}
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
                    {item.movie}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    {item.rate}%
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {item.description}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={item.rate}
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