import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles( theme =>{
  return{
    addresscontain: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },

    address: {
    
    }
}

});


export default function Address() {
  const classes = useStyles();
  const addrssChange = useMediaQuery('(max-width:650px)');
  


  return (
    <div className={classes.addresscontain}>

      <div className={classes.address} >
        {addrssChange ? <p>0xba9d4199....</p> : <p> 0xba9d4199fab4f26efe3551d490e3821486f135ba</p> }
      </div>
        
      <Typography variant="h5" >
        BurningMoon
      </Typography>

    </div>
  )
}
