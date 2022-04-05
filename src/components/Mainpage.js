import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Leftcontainer from './containers/Leftcontainer';
import Rightcontainer from './containers/Rightcontainer';
import { makeStyles } from '@material-ui/core/styles';
import Address from './rightcontainer/Address';
import Connectwallet from './rightcontainer/Connectwallet';
import { useMoralis } from "react-moralis";
import  { Moralis, chainId  } from 'moralis';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';









const useStyles = makeStyles( theme => {
    return {
        contain: {
            height: "93vh",
            background: "#720034",
            borderRadius: "20px",
            padding: '15px',
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
    const addrssChange = useMediaQuery('(max-width:650px)');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    let [theAddress, setTheAddress] = useState()
    //console.log(isAuthenticated);
    const [checkLoginStat, changeLoginStat] = useState(false)
    //console.log(checkLoginStat);


    //Login code
    const login = async () => {
      if (!isAuthenticated) {
  

        if(addrssChange){
            const user = await Moralis.authenticate({ 
              provider: "walletconnect", 
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ] 
          })

          setTheAddress(user.get("ethAddress"));
          
          
          Store.addNotification({
            title: "Wallet Connected",
            message: "",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            },
            width: 600

          });

          


        } else {

        await Moralis.authenticate({signingMessage: "Log in to raspberry" })
          .then(function (user) {
            //console.log("logged in user:", user);
            //console.log(user.get("ethAddress"));
            setTheAddress(user.get("ethAddress"));
          }).catch(function (error) {
            console.log(error);
          });

          changeLoginStat(true);

          
          Store.addNotification({
            title: "Wallet Connected",
            message: "",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            },
            width: 600

          });
          

          

        }
          
      }
    }


  
  


  //logout code
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  //console.log(user);



  return (
   <ThemeProvider theme={theme}>
   
        <Grid container spacing={2} className={classes.contain} >

        <Grid item  xs={12} md={4} lg={4} >
          <Leftcontainer chain={chainId} loginCheck={checkLoginStat} addr={theAddress}/>
        </Grid>

        <Grid item  xs={12} md={8} lg={8}  className={classes.rightcontainer}>

          <Address addr={theAddress} loginCheck={checkLoginStat}/>

          <Rightcontainer />

          <Connectwallet login={login}  
          logout={logOut} 
          loginCheck={checkLoginStat} 
          changeloginValue={changeLoginStat} 
          />

        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
