import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClipLoader from "react-spinners/ClipLoader";
import { Suspense } from 'react';



const useStyles = makeStyles( theme => {
    return{
      style: {
        width: "100%",
        height: "55vh",
        borderRadius: "30px;",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]:{
            height: '71vh',
        }
    },


    background: {
      background: "#000",
      width: "100%",
      height: "55vh",
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
  

  




export default function Rightcontainer(props) {
  const classes = useStyles();
  //const [updated] = useState(props.initialData);
  const [ready, setReady] = useState(true);
  const [pagesrc, setPageSrc] = useState("");


  //console.log(props.initialData);


useEffect(() => {

  setReady(true);


    setTimeout(() => {
      setReady(false);
    }, 3000);

    if(props.providerReady){
        //console.log("called here awaiting");
        //console.log(props.initialData);
        setPageSrc(`https://dexscreener.com/bsc/${props.initialData}?embed=1&theme=dark&trades=0&info=0`);

    } else {
      //console.log("using default")
      setPageSrc(`https://dexscreener.com/bsc/0x815bff37827499d800b0da4000a318c6488ad4ca?embed=1&theme=dark&trades=0&info=0`)
    }
  
}, [props.initialData, props.searchTest, props.searchChanged]);





  return (
    <div   className={classes.background} >
      { ready ?
                  <ClipLoader color={"#FFFFFF"} loading={ready}  size={30} />

                  :
                <Suspense fallback={<div>Loading...</div>}>
                  <iframe src={pagesrc} className={classes.style} ></iframe>
                </Suspense>
      }
    </div>
  )
}
