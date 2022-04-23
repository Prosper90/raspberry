import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ChartComponent } from '../chart/ChartComponent';




const useStyles = makeStyles( theme => {
    return{
    background: {
        backgroundColor : "#32003d",
        height: "80%",
        borderRadius: "30px;",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]:{
            height: '71vh',
        }
    },

    chartie: {
      width: "100%",
      height: "100%"

    }

}

  });
  
  






  /*
  const initialData = [

    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];
*/

  




export default function Rightcontainer(props) {
  const classes = useStyles();



  return (
    <div   className={classes.background} >
      <ChartComponent data={ props.initialData }></ChartComponent>
    </div>
  )
}
