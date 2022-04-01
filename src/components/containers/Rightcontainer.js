import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( theme => {
    return{
    background: {
        backgroundColor : "#32003d",
        height: "70%",
        borderRadius: "30px;",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]:{
            height: '71vh',
        }
    },

}

  });




export default function Rightcontainer() {
    const classes = useStyles();

  return (
    <div   className={classes.background} >
        Rightcontainer
    </div>
  )
}
