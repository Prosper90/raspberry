import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';



const CustomisedButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  borderRadius: '20px',
  color: '#fff3ff',
  width: '38%;',
  height: '108%',
  lineHeight: 1.5,
  backgroundColor: '#32003d',
  borderColor: '#32003d',
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
    backgroundColor: '#290131',
    borderColor: '#290131',
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
  walletcontain: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
});



export default function Connectwallet() {
  const classes = useStyles();


  return (
    <div className={classes.walletcontain}>
        <CustomisedButton variant="contained"
        background="#32003d"
        size="large"
        >
          Connect Wallet
        </CustomisedButton>

        <CustomisedButton variant="contained"
        background="#32003d"
        size="large"
        >
          Add Token
        </CustomisedButton>
    </div>
  )
}
