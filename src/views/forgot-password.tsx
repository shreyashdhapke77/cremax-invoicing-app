import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Paper
  } from '@mui/material';
  import { GREY_BACKGROUND, GREY_BACKGROUND_HOVER } from '../utils/colors';
  import LOGIN_AVATAR from '../assets/avatar-login.png'
  import { COMPANY_NAME } from '../constants/labels';
import { useNavigate } from 'react-router-dom';
  
  
  const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: "column", sm: "column", lg: "row", xl: "row" },
          height: '94.2vh',
        }}
      >
        {/* Left Panel */}
        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              Forgot your password?
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {COMPANY_NAME}
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: GREY_BACKGROUND,
                '&:hover': { backgroundColor: GREY_BACKGROUND_HOVER },
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Send recovery email
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1
              }}
            >
              <Typography>
                Back to{' '}
                <Link href="" color="primary" onClick={() => navigate('/login')}>
                  Login.
                </Link>
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Forgot your email?
                <Link href="#" color="primary">
                  Contact us.
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
  
        {/* Right Panel */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: GREY_BACKGROUND,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            pt: { xs: 2, sm: 2, lg: 0, xl: 0 }
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Did you know?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 300 }}>
            Our support team is just a message away—always ready to help you succeed.
          </Typography>
          <Box
            component="img"
            src={LOGIN_AVATAR}
            alt="Support Illustration"
            sx={{  width: '100%', maxWidth: 300 }}
          />
          <Link
            href="#"
            color="primary"
            underline="hover"
            sx={{ position: 'absolute', bottom: 16 }}
          >
            This website uses cookies
          </Link>
        </Box>
      </Box>
    );
  };
  
  export default ForgotPasswordPage;
  