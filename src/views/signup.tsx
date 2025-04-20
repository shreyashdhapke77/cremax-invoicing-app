import {
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    Link,
    Paper
  } from '@mui/material';
  import GoogleIconColorful from '../components/common/icons/google';
  import { GREY_BACKGROUND, GREY_BACKGROUND_HOVER } from '../utils/colors';
  import LOGIN_AVATAR from '../assets/avatar-login.png'
  import { COMPANY_NAME } from '../constants/labels';
import { useNavigate } from 'react-router-dom';
  
  
  const SignupPage = () => {
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
              Sign up
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {COMPANY_NAME}
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIconColorful />}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Continue with Google
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Typography
                variant="body1"
                sx={{
                    maxWidth: 400,
                    display: 'flex',
                    flex: 1, position:
                    'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                By signing up, you confirm that you have read and accepted the End User Agreement.
            </Typography>
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
              Sign up
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1
              }}
            >
              <Typography>
                Already have an account?{' '}
                <Link href="" color="primary" onClick={() => navigate('/login')}>
                  Login.
                </Link>
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <Link href="" color="primary" onClick={() => navigate('/forgot-password')}>
                  Forgot your password?
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
  
  export default SignupPage;
  