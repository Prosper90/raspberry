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
    
    },

    walleticon: {
      paddingLeft: '35px'
    }  
}

});


export default function Address(props) {
  //console.log(props);
  const classes = useStyles();
  const addrssChange = useMediaQuery('(max-width:650px)');
  //console.log(props)
  


  return (
    <div className={classes.addresscontain}>

      <div className={classes.address} >
        {addrssChange 
        ?
         (<p>0xba9d4199....</p>) 
         : 
         (

          props.loginCheck ? <p>{props.addr}</p> : <p className={classes.walleticon} ><i className="fa-solid fa-wallet"></i></p>
          
         ) 
         }
      </div>
        
      <Typography variant="h5" >
        BurningMoon
      </Typography>

    </div>
  )
}
