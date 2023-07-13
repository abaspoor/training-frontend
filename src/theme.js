import { createTheme } from "@mui/material/styles";
import amber from '@mui/material/colors/amber';
import lightBlue from '@mui/material/colors/lightBlue';

const theme = createTheme({
    palette:{
        primary: amber,
        secondary: lightBlue
    }
});

export default theme;