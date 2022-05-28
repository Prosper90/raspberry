import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
//import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import  { Moralis } from 'moralis';
//import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Store } from 'react-notifications-component';
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css';









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
      border: 'none',
      backgroundColor: '#6c0063',
      borderColor: '#6c0063',
    },
    
  });






  


const useStyles = makeStyles( theme => {
    return{
        background: {
            backgroundColor : "#32003d",
            height: "100%",
            borderRadius: "30px;",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: '51px',
            paddingBottom: '5px',
            [theme.breakpoints.down('sm')]:{
                gap: '42px',
                padding: '27px',
                height: '90%',
            }
        },


        taxInfo: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'start',
          width: '80%'
        },

        each: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          fontSize: '12px',
          alignItems: 'center'
        },

        p: {
          fontSize: '10px',
        },

        green: {
          color: '#fff'
        }



        

   

    }
  });







export default  function Leftcontainer(props) {
    const classes = useStyles();
    //console.log(props);

    

  return (
    <div className={classes.background}  >
      This Token is not Listed
    </div>
    
  )
}
