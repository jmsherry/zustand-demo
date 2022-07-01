import { createTheme } from "@mui/material/styles";
// import blue from "@mui/material/colors/blue";
import grey from '@mui/material/colors/grey';

let theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[50],
      contrastText: grey[900]
    },
  },
});

export default theme;
