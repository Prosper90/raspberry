import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputBase from '@material-ui/core/InputBase';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles( theme =>{
  return{
    addresscontain: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },

    address: {
      width: '20%',
    },

    formButton: {
      backgroundColor: '#fff',
      border: 'none'
    },

    walleticon: {
      paddingLeft: '35px'
    },


    inputInput: {
      transition: theme.transitions.create('width'),
      width: '100%',
      height: '',
      border: '1px solid #fff',
      color: '#fff',
      border: 'none',
      outline:'none',
      borderRadius: '15px',
      color: '#000',
      [theme.breakpoints.up('xs')]: {
        width: '225px',
      },
    },


    holdsearchcontain: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      flexWrap: 'wrap'
    },

    formContain: {
      display: 'flex',
      width: '41%',
      height: '18px',
      backgroundColor: '#fff',
      padding: '8px',
      borderRadius: '4px',
      justifyContent: 'center',
      transition: 'all 0.5s',
      transitionTimingFunction: 'ease-in',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginBottom: '5px',
      },
      [theme.breakpoints.up('xs')]: {
        width: '20%',
        height: '18px',
      }
    },

    inputExpanded: {
      display: 'flex',
      width: '67%',
      height: '18px',
      backgroundColor: '#fff',
      padding: '8px',
      borderRadius: '4px',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.5s',
      transitionTimingFunction: 'ease-out',
      [theme.breakpoints.up('md')]: {
        marginBottom: '5px',
      },
      [theme.breakpoints.up('xs')]: {
        width: '47%',
        height: '18px',
      }
    },


    truncate: {
      width: '132px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#fff'
    },


}

});


export default function Address(props) {
  //console.log(props);
  const classes = useStyles();
  const addrssChange = useMediaQuery('(max-width:650px)');
  const history = useHistory();

  const[expandInput, setexpandInput] = useState(false);



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
        <form noValidate autoComplete='off'  className={ expandInput ? classes.inputExpanded : classes.formContain } onSubmit={search} >
        <InputBase
                placeholder="Search Token…"
                className={ classes.inputInput }
                onClick={() => setexpandInput(true)}
                onBlur={() => setexpandInput(false)}
                name="value"
              />
            <button className={classes.formButton}  type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
       </form>

       {props.tokenName ? <Typography variant="h6"> {props.tokenName} </Typography> : <Typography variant="h6"> BurningMoon </Typography> }

        
      </div>

    </div>
  )
}
