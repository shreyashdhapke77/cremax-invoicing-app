import { Box } from "@mui/material";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "../../styles/footer.css";

const CmxSocialMedia = () => {
  return (
    <Box className="social-media-icons" sx={{py: 1}}>
      <Box className="icon-facebook" sx={{mx: 0.3}}>
        <FaFacebookF onClick={() => window.open('', '_blank')}/>
      </Box>
      <Box className="icon-twitter" sx={{mx: 0.3}}>
        <FaTwitter />
      </Box>
      <Box className="icon-link" sx={{mx: 0.3}}>
        <FaLinkedinIn onClick={() => window.open('', '_blank')}/>
      </Box>
      <Box className="icon-instagram" sx={{mx: 0.3}}>
        <FaInstagram onClick={() => window.open('', '_blank')}/>
      </Box>
    </Box>
  );
};

export default CmxSocialMedia;
