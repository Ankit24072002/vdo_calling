import React, { useContext, useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AuthContext } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory, user, getUserHistory } = useContext(AuthContext);
  const [recentMeetings, setRecentMeetings] = useState([]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Fetch recent history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getUserHistory();
        setRecentMeetings(res.slice(-3));
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, []);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return alert("Please enter a meeting code!");
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  const handleCreateMeeting = async () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    await addToUserHistory(newCode);
    navigate(`/${newCode}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  // Styling helpers
  const mainGradient = darkMode
    ? "linear-gradient(135deg, #141E30 0%, #243B55 100%)"
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  const glowColor = darkMode ? "#00c6ff" : "#ffafbd";

  return (
    <div
      className="homePageContainer"
      style={{
        minHeight: "100vh",
        background: mainGradient,
        color: darkMode ? "#e0e0e0" : "white",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.5s ease",
      }}
    >
      {/* Navbar */}
      <div
        className="navBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "18px 40px",
          alignItems: "center",
          backdropFilter: "blur(12px)",
          background: darkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.5px",
            textShadow: `0 0 8px ${glowColor}`,
          }}
        >
          Apna Video Call 🎥
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Tooltip title="View Meeting History">
            <IconButton onClick={() => navigate("/history")}>
              <RestoreIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Brightness7Icon sx={{ color: "#fdd835" }} />
              ) : (
                <Brightness4Icon sx={{ color: "white" }} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        className="meetContainer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
          padding: "50px 30px",
        }}
      >
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 500 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome, {user?.name || "Guest"} 👋
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.85, lineHeight: 1.6 }}
          >
            Create or join high-quality video meetings instantly. Stay connected,
            collaborate, and communicate — anytime, anywhere.
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <TextField
              label="Enter Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                fieldset: { borderColor: "white" },
              }}
            />
            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              sx={{
                background: darkMode ? "#00c6ff" : "#43cea2",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  background: darkMode ? "#0093E9" : "#38b493",
                },
              }}
            >
              Join
            </Button>
          </div>

          <Button
            variant="outlined"
            startIcon={<VideoCallIcon />}
            onClick={handleCreateMeeting}
            sx={{
              color: "white",
              borderColor: "white",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#43cea2",
                background: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Create New Meeting
          </Button>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/logo3.png"
            alt="video call"
            style={{
              width: 400,
              borderRadius: "20px",
              boxShadow: `0 0 25px ${glowColor}`,
              transition: "0.4s ease",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Recent Meetings Section */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.15)",
            padding: "30px 40px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Recent Meetings
          </Typography>

          <Divider
            sx={{
              mb: 3,
              borderColor: darkMode
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.4)",
            }}
          />

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {recentMeetings.length === 0 ? (
              <Typography sx={{ opacity: 0.7 }}>
                You haven’t joined any meetings yet.
              </Typography>
            ) : (
              recentMeetings.map((code, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 200,
                    background: darkMode
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.25)",
                    color: "white",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: `0 0 12px ${glowColor}`,
                    },
                  }}
                  onClick={() => navigate(`/${code}`)}
                >
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                      {code}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Tap to rejoin
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default withAuth(HomeComponent);
