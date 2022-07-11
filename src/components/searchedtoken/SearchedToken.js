import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import 'animate.css/animate.min.css';








/*
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
*/





  


const useStyles = makeStyles( theme => {
    return{



      background: {
        backgroundColor : "#32003d",
        height: "440px",
        borderRadius: "30px;",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: '51px',
        paddingBottom: '15px',
        [theme.breakpoints.down('sm')]:{
            gap: '42px',
            padding: '27px',
        }
    },

        
    }
  });







export default  function Leftcontainer(props) {
    const classes = useStyles();
    //console.log(props);

    

  return (
    <div className={classes.background}  >
      <Typography variant="body1" >
          This Token is not Listed
      </Typography>
    </div>
    
  )
}
