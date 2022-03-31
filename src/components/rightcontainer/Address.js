import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  addresscontain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
});


export default function Address() {
  const classes = useStyles();


  return (
    <div className={classes.addresscontain}>

      <div>
        0xba9d4199fab4f26efe3551d490e3821486f135ba
      </div>
        
      <Typography variant="h5" >
        BurningMoon
      </Typography>

    </div>
  )
}
