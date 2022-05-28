import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
//import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
//import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Store } from 'react-notifications-component';
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css';
import { ethers } from "ethers";
import BeatLoader from "react-spinners/BeatLoader";
const { ethereum } = window;









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



  const CustomisedButtonMax = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: '1px solid',
    color: '#fff3ff',
    width: '10%;',
    height: '100%',
    lineHeight: 1.5,
    backgroundColor: '#78006e',
    borderColor: '#78006e',
    borderBottomRightRadius: '19px',
    borderTopRightRadius: '19px',
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
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            display: "none"
        }
        
                },
    
        forminputtwo: {
            backgroundColor: '#eff0f2',
            border: 'none',
            textAlign: 'center',
            borderBottomLeftRadius: '18px',
            borderTopLeftRadius: '18px',
            alignSelf: 'center',
            width: '87%',
            height: '36px',
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                display: "none"
            }
            
                    },

        
 

        formtoken: {
            backgroundColor: '#eff0f2',
            border: 'none',
            textAlign: 'center',
            borderRadius: '20px',
            alignSelf: 'center',
            width: '57%',
            height: '24px',
            },

        
        containmaxsell: {
            display: 'flex',
            width: '87%',
            alignItems: 'center',
            justifyContent: 'center'
        },

        taxInfo: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
        },

        loader: {
          width: '100%',
          top: '26px',
          left: '38px',
          position: 'absolute',
        }
    }
  });







export default  function Leftcontainer(props) {
    
    const classes = useStyles();
    //console.log(props.allowance);
    //console.log(props.tokenIn);
    const [putvalue, setPutValue] = useState();



    useEffect(()=> {

    }, [putvalue]);





    const tokenRecieved = async (e) => {
        e.preventDefault();
        const amount = e.target.value;
        //console.log(amount);

        if ( amount === "0" || !amount) {
            props.setTokenOut("0");
            return;
        }

        const contract = props.getContract();

        const weiAmount = String(ethers.utils.parseUnits( amount, "18" ));
        props.setBNBIn(weiAmount);
        props.setTokenOut(String(await contract.getTokenAmountOut(String(props.tokenContract), weiAmount)));

    }



    const BNBRecieved = async (e) => {
        e.preventDefault();
        const amount = e.target.value;
        //console.log(amount);

        if (amount === "0" || !amount) {
            props.setBNBOut("0");
            return;
        }
        const contract = props.getContract();
        const decimalAmount = String(Number(String(amount) * 10 ** props.tokenDecimals));
        props.setTokenIn(decimalAmount);
        const ETHOut = await contract.getETHAmountOut(String(props.tokenContract), decimalAmount);
        props.setBNBOut(String(ETHOut));

        if (!props.allowance || props.allowance < decimalAmount) await props.checkAllowance(props.theAddress, props.tokenContract);


    }






    const buy = async (e) => {
        e.preventDefault();

        //console.log(e.target.value.value);
        const amount = e.target.value.value;

        
        if(props.loginCheck){
           props.setLoading(true);
            if (props.tokenDecimals.length === 0) {
                alert("No token defined");
                props.setLoading(false);
                return;
            }
            const contract = props.getContract()
            const tokenOutSlippage = String(Number(props.tokenOut) * Number(99) / Number(100));
            const transactionHash = await contract.SwapETH(props.tokenContract, tokenOutSlippage, { value: props.BNBIn });

            //console.log("transacting");
            await transactionHash.wait();
            //console.log("finished");

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
      
              Store.addNotification({
                title: "TXN HASH",
                message: "transaction.hash",
                type: "info",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 15000,
                    showIcon: true
                  },
                width: 350
      
              });
            //console.log(`Success - ${transactionHash.hash}`);
            //setLoading(false);
            e.target.value.value = "";
            props.setLoading(false);
        
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


    const sell = async (e) => {
        e.preventDefault();
        //console.log(e.target.value.value);
        const amount = e.target.value.value;


        if(props.loginCheck){
         
            if (props.tokenDecimals.length === 0) {
                alert("No token defined");
                return;
            }
            const contract = props.getContract()
            const TokenContract = props.getTokenContract(props.tokenContract);
            const BNBOutSlippage = String(Number(props.BNBOut) * Number(99) / Number(100));
            const transactionHash = await contract.SwapTokens(props.tokenContract, props.tokenIn, BNBOutSlippage);
            //setLoading(true);
            await transactionHash.wait();
            //setLoading(false);

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
      
              Store.addNotification({
                title: "TXN HASH",
                message: "transaction.hash",
                type: "info",
                container: "bottom-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 15000,
                    showIcon: true
                  },
                width: 350
      
              });

            //console.log(`Success - ${transactionHash.hash}`);
            //setIsLoading(false);
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



    
        

      
        const approve = async() => {
            const contract = props.getTokenContract(props.tokenContract)
            const allowanceAmount = String(Number(2) ** Number(256) - Number(1));
            const transactionHash = await contract.approve(props.contractAddress, allowanceAmount);
            //setIsLoading(true);
            //console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            props.setAllowance(allowanceAmount);
            //console.log(`Success - ${transactionHash.hash}`);
            //setIsLoading(false);
        }




        const updateToken = async (value) => {
            if (value === "0" || !value) {
                props.setBNBOut("0");
                return;
            }
            const contract = props.getContract();
            const decimalAmount = String(Number(String(value) * 10 ** props.tokenDecimals));
            props.setTokenIn(decimalAmount);
            const ETHOut = await contract.getETHAmountOut(String(props.tokenContract), decimalAmount);
            props.setBNBOut(String(ETHOut));
    
            if (!props.allowance || props.allowance < decimalAmount) await props.checkAllowance(props.theAddress, props.tokenContract);
        }




        const setMaxTokens = async () => {
            //console.log("run");
            await props.updateAccount();
            const value = String(props.accountToken / 10 ** props.tokenDecimals);
            //console.log(value);
            await updateToken(value);
            props.setTokenIn(props.accountToken);
            //setPutValue(value);
            const element = document.getElementsByName("sellvalue")[0];
            //console.log(element.value);   
            element.value = value;
            setPutValue(value);
            //console.log(document);
            //.setAttribute("value", accountToken);
        }





    
   

  return (
    <div className={classes.background}  >
        <div className={classes.taxInfo}>
          <div>Tax : Buy {props.buyFee / 100}% Sell {props.sellFee / 100}%  <i className="fa-brands fa-android"></i></div>
          <div className={classes.loader}> 
            {props.loading ?
            <BeatLoader color={"#FFFFFF"} loading={props.loading}  size={15} />
            :
            <div></div>
          } </div>
        </div>
        
        <div className={classes.formone}>

            <div className={classes.pricehold}>
                <Typography variant="body1" >
                    BNB
                </Typography> : 
                <Typography variant="body1" >
                    {props.accountBNB / 10 ** 18 }
                </Typography>
            </div>
            <div className={classes.pricehold}>
                <Typography variant="body1" >
                    Token Recieved
                </Typography> 
                <Typography variant="body1" >
                { Math.round(props.tokenOut / 10 ** props.tokenDecimals)} {props.tokenName} 
                </Typography>
            </div>

            <form noValidate autoComplete='off'  className={classes.formcontain} onSubmit={buy} >
            <input name="value" type="number" className={classes.forminput} placeholder="Amount BNB" onChange={tokenRecieved}/>

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
                Token
            </Typography> : 
            <Typography variant="body1" >
               {Math.round(props.accountToken / 10 ** 18, 4) }
            </Typography>
            </div>
            <div className={classes.pricehold}>
            <Typography variant="body1" >
                Token Received 
            </Typography> 
            <Typography variant="body1" >
               {Math.round(props.BNBOut / 10 ** props.tokenDecimals, 4)} BNB
            </Typography>
            </div>


            <form noValidate autoComplete='off' className={classes.formcontain} onSubmit={sell}>
                <div  className={classes.containmaxsell}>
                    <input name="sellvalue" type="number" className={classes.forminputtwo}  placeholder="Amount Tokens"  onChange={BNBRecieved} />
                        <CustomisedButtonMax variant="contained"
                            background="#32003d"
                            size="small"
                            onClick={setMaxTokens}
                            >
                            MAX
                        </CustomisedButtonMax>
                </div>

             
             {  Number(props.allowance.length) >= Number(props.tokenIn.length) ? (

                <CustomisedButton variant="contained"
                background="#32003d"
                size="large"
                type="submit"
                >
                SELL
                </CustomisedButton>

             ) : (


                <CustomisedButton variant="contained"
                background="#32003d"
                size="large"
                onClick={approve}
                >
                Approve
                </CustomisedButton>
 

             )}
            

            </form>
            </div>


        </div>
  )
}
