import React from 'react';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Leftcontainer from './containers/Leftcontainer';
import Rightcontainer from './containers/Rightcontainer';
import { makeStyles } from '@material-ui/core/styles';
import Address from './rightcontainer/Address';
import Connectwallet from './rightcontainer/Connectwallet';






const useStyles = makeStyles( theme => {
    return {
        contain: {
            padding: "10px",
            height: "93vh",
            background: "#720034",
            borderRadius: "20px",
            padding: "32px",
            [theme.breakpoints.down('sm')]:{
                height: '100%',
                padding: '22px'
            }

        },

        rightcontainer: {
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            [theme.breakpoints.down('sm')]:{
                marginTop: '65px',
            }
        }

    }
  });






const theme = createTheme({
    palette: {
        primary: { main: '#32003d' }, // for the body
        secondary: { main: '#78006e' }, // for the buttons
      },
  });
  






export default function Mainpage() {
    const classes = useStyles();

  return (
   <ThemeProvider theme={theme}>
   
        <Grid container spacing={2} className={classes.contain} >

        <Grid item  xs={12} md={4} lg={4} >
          <Leftcontainer />
        </Grid>

        <Grid item  xs={12} md={8} lg={8}  className={classes.rightcontainer}>
          <Address />
          <Rightcontainer />
          <Connectwallet />
        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
