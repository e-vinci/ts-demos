import { Box, Container, Typography, useTheme } from "@mui/material";
import logo from "../../assets/images/js-logo.png";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.secondary.light
            : theme.palette.secondary.dark,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "inline-block",
            paddingRight: 2,
            color: theme.palette.secondary.contrastText,
          }}
        >
          <Typography variant="body1">But we also love JS</Typography>
          <Typography>
            <Copyright />
            myAmazingPizzeria
          </Typography>
        </Box>
        <Box sx={{ display: "inline-block" }}>
          <img src={logo} alt="" width={50} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
