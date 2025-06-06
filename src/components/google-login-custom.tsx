import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleUser } from '../types';
import { Button } from '@mui/material';
import GoogleIconColorful from './common/icons/google';

type Props = {
  onLoginSuccess: (token: string, userInfo: GoogleUser) => void;
};

const GoogleLoginCustom = ({ onLoginSuccess }: Props) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      console.log('Encoded JWT ID token: ' + JSON.stringify(response));
      const token = response.credential;
      const userInfo: GoogleUser = jwtDecode<GoogleUser>(token);
      console.log('Decoded Google user info:', userInfo);
      onLoginSuccess(token, userInfo);
    };

    if ((window as any).google && (window as any).google.accounts) {
      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        // ux_mode: "popup",
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("google-button")!,
        { theme: "outline", size: "large", text: "continue_with", width: "100%" }
      );
    }
  }, [onLoginSuccess]);

  //   const handleCustomGoogleLogin = () => {
  //     (window as any).google.accounts.id.prompt(); // Shows popup or one-tap
  //   };

  return (
    <Button
      id="google-button"
      // fullWidth
      // variant="outlined"
      // startIcon={<GoogleIconColorful />}
      // sx={{
      //   textTransform: "none",
      //   fontWeight: "bold",
      //   mb: 2,
      // }}
      // onClick={handleCustomGoogleLogin}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginCustom;
