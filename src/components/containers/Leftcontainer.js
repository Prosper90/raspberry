import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
//import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import ABI from '../../ABI.json';
import  { Moralis } from 'moralis';
//import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Store } from 'react-notifications-component';
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css';









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






  


const useStyles = makeStyles( theme => {
    return{
        background: {
            backgroundColor : "#32003d",
            height: "100%",
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
                height: '90%',
            }
        },

        formone: {
            width: '87%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            [theme.breakpoints.down('sm')]:{
                gap: '15px',
                width: '83%',
                padding: '27px',
            }
        },

        formtwo: {
            width: '87%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            [theme.breakpoints.down('sm')]:{
                gap: '15px',
                width: '83%',
                padding: '27px',
            }
        },

        pricehold: {
        display: "flex",
        justifyContent: "space-between",
        width: '90%',
        },

        formcontain: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px'
        },

        forminput: {
        backgroundColor: '#eff0f2',
        border: 'none',
        textAlign: 'center',
        borderRadius: '20px',
        alignSelf: 'center',
        width: '87%',
        height: '36px',
        },

        formtoken: {
            backgroundColor: '#eff0f2',
            border: 'none',
            textAlign: 'center',
            borderRadius: '20px',
            alignSelf: 'center',
            width: '57%',
            height: '24px',
            }
    }
  });







export default  function Leftcontainer(props) {
    
    const classes = useStyles();
    //const web3Provider = await Moralis.enableWeb3();
    //console.log(ABI);
    //const { native } = useMoralisWeb3Api();
    //const contractProcessor = useWeb3ExecuteFunction();
    const [dataresult, changedataresult] = useState({});



    //const { fetch, data, error, isLoading } =  useMoralisWeb3ApiCall( native.runContractFunction,{ ...dataresult });

  
    
        //useEffect
       useEffect(() => {
        // Update the document title using the browser API
        console.log(dataresult);



        const fetchdata = async () => {
            
            const web3 = await Moralis.enableWeb3();
            //fetch({ params: dataresult});
            //await contractProcessor.fetch({ params: dataresult });
            if(Object.keys(dataresult).length === 0) {
                console.log("first render inside useeffect");
            } else {
            const transaction = await Moralis.executeFunction(dataresult);
            console.log(transaction.hash)
            //console.log(transaction.hash);
            }

            
            Store.addNotification({
                title: "Successful",
                message: "Transaction Successful",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                },
                width: 600

              });
              

            
        }
        
        

        fetchdata();
       
      }, [dataresult]);







    const buy = (e) => {
        e.preventDefault();

        //console.log(e.target.value.value);
        const amount = e.target.value.value;
        
        if(props.loginCheck){
            
            const options = {
                contractAddress: "0xf8be69da3ef92fb896b9bb71218f401ae8c8922b",
                functionName: "SwapETH",
                abi: ABI,
                params: { _token: props.addr, outMin: amount},
                };

            
                //console.log(options);
                changedataresult(options);
                console.log(dataresult);
        
                e.target.value.value = "";        
        } else {


            Store.addNotification({
                title: "Connect Wallet",
                message: "",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                },
                width: 600

              });

           

        }
        
    
    }


    const sell = (e) => {
        e.preventDefault();
        console.log(e.target.value.value);
        const amount = e.target.value.value;

        if(props.loginCheck){
            const options = {
                contractAddress: "0x7b88c05BD672e0291f3674F4a0AACe2fe0dd2ed9",
                functionName: "SwapTokens",
                abi: ABI,
                params: { _token: props.addr, amount: amount },
                };

             changedataresult(options);
             e.target.value.value = "";
                 
        } else {
            
            Store.addNotification({
                title: "Connect Wallet",
                message: "",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                },
                width: 600

              });

        }
         
        }
    
   

  return (
    <div className={classes.background}  >
        <div className={classes.taxInfo}>
          Tax:Buy 10% Sell 20%  <i className="fa-brands fa-android"></i>
        </div>
        
        <div className={classes.formone}>

            <div className={classes.pricehold}>
                <Typography variant="body1" >
                    Price/BNB
                </Typography> : 
                <Typography variant="body1" >
                    40059.004504
                </Typography>
            </div>
            <div className={classes.pricehold}>
                <Typography variant="body1" >
                    Token Recieved
                </Typography> 
                <Typography variant="body1" >
                    4,045 BM
                </Typography>
            </div>

            <form noValidate autoComplete='off'  className={classes.formcontain} onSubmit={buy} >
            <input name="value" type="number" className={classes.forminput} placeholder="Amount BNB" />

            <CustomisedButton variant="contained"
                background="#32003d"
                size="large"
                type="submit"
                >
                BUY
            </CustomisedButton>
            </form>
        </div>




        <div className={classes.formtwo}  >


            <div className={classes.pricehold}>
            <Typography variant="body1" >
                Price/BNB
            </Typography> : 
            <Typography variant="body1" >
                40059.004504
            </Typography>
            </div>
            <div className={classes.pricehold}>
            <Typography variant="body1" >
                Token Recieved
            </Typography> 
            <Typography variant="body1" >
                4,045 BM
            </Typography>
            </div>


            <form noValidate autoComplete='off' className={classes.formcontain} onSubmit={sell}>
            <input name="value" type="number" className={classes.forminput}  placeholder="Amount Tokens"/>

            <CustomisedButton variant="contained"
            background="#32003d"
            size="large"
            type="submit"
            >
            SELL
            </CustomisedButton>
            </form>
            </div>


        </div>
  )
}
