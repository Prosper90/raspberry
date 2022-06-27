import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles( theme =>{
  return{
    addresscontain: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down('sm')]:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }
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
      justifyContent: 'end',
      width: '100%',
      flexWrap: 'wrap',
    },
    
    holdsearchcontaintwo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },

    holdsearchcontainthree: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column-reverse',
      alignItems: 'flex-end',
      marginBottom: '8px'
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
      marginRight: '6px',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginBottom: '5px',
        marginRight: '10px'
      }
    },

    formContaintwo: {
      width: '20%',
      height: '18px',
      marginRight: '5px'
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
      marginRight: '7px',
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
  const addrssChangetwo = useMediaQuery('(max-width:959px)');
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
        
      <div  className={ addrssChange ? classes.holdsearchcontainthree : addrssChangetwo ? classes.holdsearchcontaintwo :  classes.holdsearchcontain}>
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
