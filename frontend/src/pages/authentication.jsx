import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      setError('');
      if (formState === 0) {
        await handleLogin(username, password, rememberMe);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        setUsername('');
        setPassword('');
        setName('');
      }
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.message || 'Something went wrong!';
      setError(msg);
    }
  };

  const toggleFormState = () => {
    setFormState((prev) => (prev === 0 ? 1 : 0));
    setError('');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Left Panel */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              top: '20%',
              left: '10%',
            }}
          />
          <motion.div
            animate={{ scale: [1, 0.8, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              bottom: '15%',
              right: '10%',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              zIndex: 10,
              textAlign: 'center',
              px: 4,
            }}
          >
            Welcome to Apna Video Call
          </Typography>
        </Grid>

        {/* Right Panel */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '40px 30px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {formState === 0 ? 'Sign In' : 'Sign Up'}
              </Typography>
            </Box>

            <Box component="form" noValidate>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {formState === 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                  <Typography
                    variant="body2"
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                    onClick={() => alert('Forgot Password feature coming soon!')}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
              )}

              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>

              <Typography
                variant="body2"
                sx={{ textAlign: 'center', cursor: 'pointer', color: 'primary.main' }}
                onClick={toggleFormState}
              >
                {formState === 0
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          message={message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Grid>
    </ThemeProvider>
  );
}
