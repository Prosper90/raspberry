import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { alpha, styled } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';






const CustomisedButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderRadius: '20px',
    color: '#fff3ff',
    width: '91%;',
    height: '52%',
    lineHeight: 1.5,
    marginTop: '12px',
    backgroundColor: '#78006e',
    borderColor: '#78006e',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#6c0063',
      borderColor: '#6c0063',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });









const useStyles = makeStyles({
    background: {
        backgroundColor : "#32003d",
        height: "100%",
        borderRadius: "30px;",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: '51px'
    },

    formone: {
        width: '87%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },

    formtwo: {
        width: '87%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },

    pricehold: {
      display: "flex",
      justifyContent: "space-between",
      width: '90%',
    },

    formcontain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    forminput: {
      backgroundColor: '#eff0f2',
      border: 'none',
      textAlign: 'center',
      borderRadius: '20px',
      alignSelf: 'center',
      width: '87%',
      height: '36px',
    }

  });




export default function Leftcontainer() {
    const classes = useStyles();

  return (
    <div className={classes.background}  >
        
        <div className={classes.formone}>

            <div className={classes.pricehold}>
                <Typography variant="p" >
                    Price/BNB
                </Typography> : 
                <Typography variant="p" >
                    40059.004504
                </Typography>
            </div>
            <div className={classes.pricehold}>
                <Typography variant="p" >
                    Token Recieved
                </Typography> 
                <Typography variant="p" >
                    4,045 BM
                </Typography>
            </div>

            <form noValidate autoComplete='off'  className={classes.formcontain}>
            <input className={classes.forminput} placeholder="Amount BNB" />

            <CustomisedButton variant="contained"
                background="#32003d"
                size="large"
                type="submit"
                >
                BUY
            </CustomisedButton>
            </form>
        </div>




        <div className={classes.formtwo}>


            <div className={classes.pricehold}>
            <Typography variant="p" >
                Price/BNB
            </Typography> : 
            <Typography variant="p" >
                40059.004504
            </Typography>
            </div>
            <div className={classes.pricehold}>
            <Typography variant="p" >
                Token Recieved
            </Typography> 
            <Typography variant="p" >
                4,045 BM
            </Typography>
            </div>


            <form noValidate autoComplete='off' className={classes.formcontain}>
            <input className={classes.forminput}  placeholder="Amount Tokens"/>

            <CustomisedButton variant="contained"
            background="#32003d"
            size="large"
            type="submit"
            >
            BUY
            </CustomisedButton>
            </form>
            </div>


        </div>
  )
}
