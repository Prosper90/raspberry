import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Leftcontainer from './containers/Leftcontainer';
import Rightcontainer from './containers/Rightcontainer';
import { makeStyles } from '@material-ui/core/styles';
import Address from './rightcontainer/Address';
import Connectwallet from './rightcontainer/Connectwallet';
import SearchedToken from "./searchedtoken/SearchedToken.js";
import { useMoralis } from "react-moralis";
import { useTokenPrice } from "react-moralis";
import  { Moralis, chainId  } from 'moralis';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import { useRouteMatch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useMoralisWeb3Api } from "react-moralis";
import moment from 'moment';
import { ethers } from "ethers";
import { contractABI, tokenABI, contractAddress, chainID, pancakeRouter, pancakeABIuse } from "../utils/constants";
import axios from 'axios';











const useStyles = makeStyles( theme => {
    return {
        contain: {
            height: "100%",
            background: "#720034",
            borderRadius: "20px",
            padding: '15px',
            [theme.breakpoints.down('sm')]:{
                height: '100%',
                padding: '22px'
            }

        },

        rightcontainer: {
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            [theme.breakpoints.down('sm')]:{
                marginTop: '65px',
            }
        }

    }
  });






const theme = createTheme({
    palette: {
        primary: { main: '#32003d' }, // for the body
        secondary: { main: '#78006e' }, // for the buttons
      },
  });
  






export default function Mainpage(props) {
    const classes = useStyles();
    const WidthChange = useMediaQuery('(max-width:959px)');
    //console.log(WidthChange);
    let [theAddress, setTheAddress] = useState();
    const [checkLoginStat, changeLoginStat] = useState(false);
    const [searchToken, setsearchToken] = useState({});
    const [tokenData, settokenData] = useState([]);
    const [blockArray, setblockArray] = useState([]);
    const [priceArray, setpriceArray] = useState([]);
    const [initialData, setinitialData] = useState([]);
    const [accountToken, setAccountToken] = useState("0");
    const [accountBNB, setAccountBNB] = useState("0");
    const [tokenContract, setTokenContract] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [buyFee, setBuyFee] = useState("");
    const [sellFee, setSellFee] = useState("");
    const [tokenDecimals, setTokenDecimals] = useState("");
    const [allowance, setAllowance] = useState("12345");
    const [tokenOut, setTokenOut] = useState("0");
    const [isListed, setListed] = useState(false);
    const [tokenIn, setTokenIn] = useState("0");
    const [BNBOut, setBNBOut] = useState("0");
    const [BNBIn, setBNBIn] = useState("0");
    const [searchChanged, setsearchChanged] = useState();
    const [executed, setExecuted] = useState(false);
    let [loading, setLoading] = useState(false);

    
    const Web3Api = useMoralisWeb3Api();
    const history = useHistory();

    const match = useRouteMatch('/:token');
    const { token } = {
      token: match?.params.token,
    };

    const { ethereum } = window;
    let provider; 
    
    if(!window.ethereum){
     //console.log('Install metamask');
      // metamask is not connected
      //checkIfWalletIsConnect();
           
    } else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

   const [searchTest, setsearchTest] = useState();
   Moralis.start({ serverUrl : process.env.REACT_APP_serverUrl, appId : process.env.REACT_APP_appId });


     //gets the inputed Token Contract
    const getTokenContract = (address) => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(address, tokenABI, signer);
      }
      
     //gets our own contract
    const getContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
      }


      //searches for token and gets appropraite info about it for buying and selling to happen
      const changeToken = async (address) => {
        setTokenContract(address);
        setLoading(true);
        if (!ethers.utils.isAddress(address)) {
            setListed(false);
            setTokenName("");
            setTokenDecimals("");
            setBuyFee("0");
            setSellFee("0");
            setLoading(false)
            return;
        }
        const Token = getTokenContract(address);
        //console.log(Token +" Token contract");
        const Contract = getContract();
        //console.log(Contract +" Our won contract");
        const data = await Contract.AvailableTokens(address);
        //console.log(data);
        const listed = data[1] != "0x0000000000000000000000000000000000000000";
        setListed(listed);
        if (listed) {
            setTokenName(await Token.name());
            setTokenDecimals(await Token.decimals());
            setBuyFee(data[3]);
            setSellFee(data[2]);
            if (theAddress) {
                checkAllowance(theAddress, address);
            }
            setLoading(false);
        }
        else {
            setTokenName(await Token.name());
            setBuyFee("0");
            setSellFee("0");
            setLoading(false);
        }

     }


     const checkAllowance = async (account, token) => {
      if (allowance > 10 ** 255) return;
      const Allowance = String(await getTokenContract(token).allowance(account, contractAddress));
      //console.log(Allowance);
      setAllowance(Allowance);
     }

  



    //useeffect
    useEffect(() => {
      
    //for chart
      if(blockArray.length === 0){
        fetchDataCharts();
      };

      if(blockArray.length !== 0) {
        fetchDataChartsPrice(); 
      };


      if(priceArray.length !== 0) {
        let iniValue = [];
      dates.map((data, a) => {
       priceArray.map((e, i) => {
         
         if(a === i){
          const dateString = `${data}`;
          iniValue.push({time: dateString, value: e  });
        }  
       });
     });  
    
     //setinitialData(iniValue);

     }

     //console.log(initialData);
    



    // for searching listed tokens
    const fetchdata = async () => {
     
     if(  token &&  !searchTest ){
      //console.log("direct call called");
      changeToken(token);
      //console.log(token);

     } else if ( token  &&  searchTest ){
      // const transaction = await Moralis.executeFunction(searchToken);
       //settokenData(transaction);
       //console.log("in-direct call called");
       changeToken(searchTest);
       //console.log(searchTest);

     }

    
     }

    fetchdata();
    }, [searchToken,  blockArray, priceArray, searchTest, searchChanged]);


    //second useEffect to check if account is connected
    useEffect(() => {
      updateAccount();
    });
 

   //third useEffect to check if account is connected
  useEffect(() => {
    checkIfWalletIsConnect();
    login();
  }, [executed]);




    history.listen((location) => {
      const tokenSlashRemoved = window.location.pathname.replace(/\//g,'');
      /*
      const search =  (tokenaddr) => {
      const options = {
          contractAddress: "0x7b88c05BD672e0291f3674F4a0AACe2fe0dd2ed9",
          functionName: "AvailableTokens",
          abi: ABI,
          params: {"tokenAddress" : tokenaddr},
          };
       setsearchToken(options);
      } */
      //console.log("Location called");
      //console.log(location.state.address);
      //console.log(tokenSlashRemoved)
      setsearchTest(location.state.address);
      //changeToken(tokenSlashRemoved);
    });


    



    const checkIfWalletIsConnect = async () => {


       const isMetaMaskConnected = async () => {
            const accounts = await provider.listAccounts();
            return accounts.length > 0;
        }
        
          await isMetaMaskConnected().then( async (connected) => {
            if (connected) {
                // metamask is connected
                const chainId = await provider.getNetwork();
                //console.log(chainId.chainId);
               //console.log(chainID)
                //handle chain issues
                if (chainId.chainId !== chainID){
                  //alert("WrongChain");
          
                  try {
                     
                    //console.log("entered one");
                    await window.ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [{
                          chainId: `0x${Number(97).toString(16)}`,
                      }]
                    });

                    setExecuted(true);
                    
                  } catch (error) {
                    
                    if(error === 4902 ){
                      //console.log("entered two");
                    await window.ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [{
                          chainId: `0x${Number(97).toString(16)}`,
                          rpcUrls: [" https://data-seed-prebsc-1-s1.binance.org:8545"],
                          chainName: "BSC testnet",
                          nativeCurrency: {
                              name: "BSC",
                              symbol: "BNB",
                              decimals: 18                          
                            },
                          blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"]
                      }]
                    });
                  
                  }
                    
                  }
          
          
          
                } else {
                  
                }
          

            }
        });

    }


    const updateAccount = async () => {
      let account = theAddress;
      if (!account) {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          //console.log(accounts)
          account = accounts[0];
          //const signer = provider.getSigner();
          //console.log("Account:", await signer.getAddress());
      }
      
      if (tokenContract) {
          setAccountToken(String(await getTokenContract(tokenContract).balanceOf(account)));
          checkAllowance(account, tokenContract);
      }
      setAccountBNB(String(await provider.getBalance(account)));


     }

     
    
    


            

      
    //Login code
    
    const login = async () => {


          if(executed === false){  
              //console.log("Please install MetaMask. error 1") 
              //console.log("executed");

              //console.log("ran here");
              Store.addNotification({
                title: "Install metamask",
                message: "",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                },
                width: 400
    
              });


           } else if(executed === true) { 
               //console.log("executed two");
              const chainId = await provider.getNetwork();
                    //handle chain issues


              const accounts = await ethereum.request({ method: "eth_requestAccounts", });
              //console.log(accounts);
             

              setTheAddress(accounts[0]);
              changeLoginStat(true);
              //setCurrentAccount(accounts[0]);
              // window.location.reload();
            
              Store.addNotification({
                title: "Wallet Connected",
                message: "",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                },
                width: 400
    
              });
         
           }

        }


  





  //chart side

  //console.log(moment().toDate());
  //console.log(moment());

 //get particular date
 const dates = new Array(8).fill().map((e, i) => {
  return moment().subtract(i, "d").format("YYYY-MM-DD");
}).reverse();



//console.log(dates);



   //get  date to block
  const fetchDataCharts = async () => {

    //let url = "https://cryptocurrency-ohlcv-and-vwap.p.rapidapi.com/metrics/ohlcv";

    //const putArray = [];
    
    let putArray = await Promise.all(dates.map( async (e, i) => {
          //console.log("happy");
          const options = { chain: "bsc", date: e};
        return await Web3Api.native.getDateToBlock(options);
          //console.log("Pushing data");
          //putArray.push(date);
        })
        )

        //console.log(putArray);
        setblockArray(putArray);
    
      
  };
  //console.log(blockArray);




  //for pricefunction
  const fetchDataChartsPrice = async () => {
     
    let addressToLookUp;

    if( token &&  !searchTest ){
      //console.log(token);
      addressToLookUp = token;
      setsearchChanged(token);
    } else if(token  &&  searchTest){
      //console.log(searchTest);
      addressToLookUp = searchTest;
      setsearchChanged(searchTest);
    } else {
      addressToLookUp = "0x97c6825e6911578A515B11e25B552Ecd5fE58dbA";
    }


      if(blockArray.length !== 0){
        
        let prices = await Promise.all(blockArray.map( async (data) => {
           //console.log("Token price called first");
           //console.log(data.block);
           const options = {
            address: addressToLookUp,
            chain: "bsc",
            exchange: "PancakeSwapv2",
            to_block: data.block
           };
          //console.log(data.block);
          return await Web3Api.token.getTokenPrice(options);

          }))

         prices = prices.map(e => e.usdPrice);
         //console.log("priceArray called");
         setpriceArray(prices);
         //console.log(priceArray);

      
      };

        
          
  };

  //console.log(priceArray);

  
  







  return (
   <ThemeProvider theme={theme}>
   
        <Grid container spacing={2} className={classes.contain} >

        <Grid item  xs={12} md={4} lg={4} >
        { WidthChange ? 
                    <Address  
                    addr={theAddress} 
                    loginCheck={checkLoginStat}
                    tokenName={tokenName}
                    /> :
                    <div></div>
        }

          <Leftcontainer 
            buyFee={buyFee}
            sellFee={sellFee}
            tokenName={tokenName}
            tokenOut={tokenOut}
            accountBNB={accountBNB}
            chain={chainId} 
            loginCheck={checkLoginStat}
            addr={theAddress}
            tokenDecimals={tokenDecimals}
            getContract={getContract}
            tokenContract={tokenContract}
            setTokenIn={setTokenIn}
            setTokenOut={setTokenOut}
            theAddress={theAddress}
            BNBOut={BNBOut}
            BNBIn={BNBIn}
            setBNBOut={setBNBOut}
            setBNBIn={setBNBIn}
            allowance={allowance}
            setAllowance={setAllowance}
            updateAccount={updateAccount}
            accountToken={accountToken}
            getTokenContract={getTokenContract}
            tokenIn={tokenIn}
            checkAllowance={checkAllowance}
            loading={loading}
            /> 
        </Grid>

        <Grid item  xs={12} md={8} lg={8}  className={classes.rightcontainer}>
          
          {!WidthChange ? 

            <Address  
            addr={theAddress} 
            loginCheck={checkLoginStat}
            tokenName={tokenName}
            /> 

            :

             <div></div>

          }

          {WidthChange ? 

            <Connectwallet login={login}  
            loginCheck={checkLoginStat} 
            changeloginValue={changeLoginStat} 
            />

          :

          <div></div>

          }


          <Rightcontainer   initialData={initialData} />

            {!WidthChange ? 

            
              <Connectwallet login={login}  
              loginCheck={checkLoginStat} 
              changeloginValue={changeLoginStat} 
              />

            :
            <div></div>


            
            }

        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
