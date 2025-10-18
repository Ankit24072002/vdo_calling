import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
        setFilteredMeetings(history);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to load history.', severity: 'error' });
      }
    };
    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = meetings.filter((m) =>
      m.meetingCode.toLowerCase().includes(value)
    );
    setFilteredMeetings(filtered);
  };

  const clearHistory = () => {
    setMeetings([]);
    setFilteredMeetings([]);
    setSnackbar({ open: true, message: 'History cleared!', severity: 'success' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: 4,
        background: 'linear-gradient(to bottom right, #f0f4ff, #e3e9ff)',
      }}
    >
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={() => routeTo('/home')}
            sx={{
              backgroundColor: '#fff',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#e3e9ff' },
            }}
          >
            <HomeIcon color="primary" />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Meeting History
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={clearHistory}
          sx={{ borderRadius: 3 }}
        >
          Clear All
        </Button>
      </Box>

      {/* Search + Summary */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <TextField
          label="Search by Code"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '40%' }}
        />
        <Typography variant="subtitle1" color="text.secondary">
          Total Meetings: <strong>{filteredMeetings.length}</strong>
        </Typography>
      </Box>

      {/* Meeting Cards */}
      <Grid container spacing={3}>
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((e, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: '0.3s',
                  background: '#fff',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                    background: 'linear-gradient(to right, #e3f2fd, #f8faff)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Code: {e.meetingCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {formatDate(e.date)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" width="100%" mt={8}>
            <Typography variant="h6" color="text.secondary">
              No meeting history available.
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
