import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputBase from '@material-ui/core/InputBase';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import truncateAddress from 'truncate-eth-address'



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
    },


    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '50%',
      height: '10px',
      border: '1px solid #fff',
      color: '#fff',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },


    holdsearchcontain: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '70%',
      flexWrap: 'wrap'
    },

    truncate: {
      width: '180px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#fff'
    }
}

});


export default function Address(props) {
  //console.log(props);
  const classes = useStyles();
  const addrssChange = useMediaQuery('(max-width:650px)');
  const history = useHistory();



  const search = (e) => {
    e.preventDefault();
    const tokenSearched = (e.target.value.value);
    //console.log(e.target.value.value);
    
      history.push({ pathname:`/${tokenSearched}`, state: { address: tokenSearched }});
      
        e.target.value.value = "";  

    }

    //console.log(props.addr);


  
  
  


  return (
    <div className={classes.addresscontain}>

      <div className={classes.address} >  
       { props.loginCheck ? <p className={classes.truncate} >{ props.addr }</p> : <p className={classes.walleticon} ><i className="fa-solid fa-wallet"></i></p> }            
      </div>
        
      <div  className={classes.holdsearchcontain}>
        <form noValidate autoComplete='off'  onSubmit={search}>
        <InputBase
                placeholder="Search Token…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="value"
              />
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
       </form>

        <Typography variant="h5">BurningMoon</Typography>
      </div>

    </div>
  )
}
