import { Avatar, Box, Button, Drawer, InputBase, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SearchIcon from "@mui/icons-material/Search";
import { LogoutOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

const drawerWidth = 260;

const menus = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Movies", path: "/movies", icon: <MovieIcon /> },
  { label: "Theaters", path: "/theaters", icon: <MeetingRoomIcon /> },
  { label: "Screenings", path: "/screenings", icon: <ScheduleIcon /> },
  { label: "Reservations", path: "/reservations", icon: <ConfirmationNumberIcon /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  const fetchAdmin = async () => {
    try {
      const data = await getMe();
      setAdmin(data);
    } catch {
      localStorage.removeItem("accessToken");
      navigate("/login", {
        replace: true,
      });
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f8fc" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            position: "relative",
            boxSizing: "border-box",
            borderRight: "1px solid #e5e7eb",
            p: 3,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontWeight: 900,
            letterSpacing: "-0.5px",
          }}          
        >
          CinemaFlow
        </Typography>

        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {menus.map((menu) => (
            <ListItemButton
              key={menu.path}
              component={NavLink}
              to={menu.path}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1.7,
                color: "#6b7280",

                "&.active": {
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                },

                "& .MuiListItemText-primary": {
                  fontWeight: 800,
                },                
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.label}
              />
            </ListItemButton>
          ))}
        </List>

        <Button
          fullWidth
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
          sx={{
            justifyContent: "flex-start",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            color: "text.secondary",
            fontWeight: 800,
            "&:hover": {
              bgcolor: "#fef2f2",
            },
          }}
        >
          로그아웃
        </Button>
      </Drawer>

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component="header"
          sx={{
            height: 80,
            px: 4,
            bgcolor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: 420,
              px: 2,
              py: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              bgcolor: "#ffffff",
              color: "#9ca3af",
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase
              placeholder="Search movie, theater, reservation..."
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography>
                {admin?.name ?? " 관리자"}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                }}
              >
                {admin?.email ?? ""}
              </Typography>
            </Box>

            <Avatar
              sx={{
                bgcolor: "#4f46e5",
                width: 40,
                height: 40,
                fontWeight: 800,
              }}
            >
              {admin?.name?.charAt(0) ?? "A"}
            </Avatar>
          </Box>
        </Box>

        <Box
          component="main"
          sx={{
            p: 4,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
};

export default AdminLayout;