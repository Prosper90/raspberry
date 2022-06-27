import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Leftcontainer from './containers/Leftcontainer';
import Rightcontainer from './containers/Rightcontainer';
import { makeStyles } from '@material-ui/core/styles';
import Address from './rightcontainer/Address';
import Connectwallet from './rightcontainer/Connectwallet';
import SearchedToken from "./searchedtoken/SearchedToken.js";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import { useRouteMatch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Fortmatic from "fortmatic";
import { contractABI, tokenABI, contractAddress, chainID, pancakeRouter, pancakeABIuse } from "../utils/constants";











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
            gap: "12px",
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
    const [isListed, setListed] = useState(true);
    const [tokenIn, setTokenIn] = useState("0");
    const [BNBOut, setBNBOut] = useState("0");
    const [BNBIn, setBNBIn] = useState("0");
    const [searchChanged, setsearchChanged] = useState();
    const [executed, setExecuted] = useState(false);
    const [createdsigner, setSigner] = useState();
    const [provider, setProvider] = useState();
    const [mobileprovider, setMobileProvider] = useState({});
    const [modalconnected, setModalConnected] = useState(false);
    let [loading, setLoading] = useState(false);

    
    const history = useHistory();

    const match = useRouteMatch('/:token');
    const { token } = {
      token: match?.params.token,
    };




    const { ethereum } = window;


    //function to call wallet connect
    const connectmetamask = async () => {
       //console.log("connect modal called");
      const customNetworkOptions = {
        rpcUrl: 'https://bsc-dataseed1.binance.org/',
        chainId: 56
        } 


         // Example for Polygon/Matic:
          const providerOptions = {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                rpc: {
                  1: "https://bsc-dataseed1.binance.org/",
                  2: "https://bsc-dataseed2.binance.org/",
                  3: "https://bsc-dataseed1.defibit.io/",
                  4: "https://bsc-dataseed3.defibit.io/",
                  5: "https://bsc-dataseed1.ninicoin.io/",
                  6: "https://bsc-dataseed4.ninicoin.io/"
                } // required
              }
            },
            fortmatic: {
              package: Fortmatic, // required
              options: {
                key: "FORTMATIC_KEY", // required
                network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
              }
            }
          };
          
          const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
          });

          const instance = await web3Modal.connect();
          const gettingprovider = new ethers.providers.Web3Provider( instance )
          setMobileProvider( gettingprovider );
          setModalConnected(true);
    }


   
    const getextensionProvider = async () => {
      
        setProvider( new ethers.providers.Web3Provider(window.ethereum) );
        //console.log("using this one");
    }
    





    


   const [searchTest, setsearchTest] = useState();


     //gets the inputed Token Contract
    const getTokenContract = (address) => {
      const signer = provider.getSigner();
      return new ethers.Contract(address, tokenABI, signer);
      }
      
     //gets our own contract
    const getContract = () => {
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
        const listed = data[1] !== "0x0000000000000000000000000000000000000000";
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

      
      if(!window.ethereum){
        //console.log("outside ran")
          connectmetamask();
      } else {
        getextensionProvider();
      }



      fetchDataChartsPrice(); 
  

    // for searching listed tokens
    const fetchdata = async () => {
     
     if(  token &&  !searchTest ){
      //console.log("direct call called");
      changeToken(token);
      //console.log(token);

     } else if ( token  &&  searchTest ){
       //settokenData(transaction);
       //console.log("in-direct call called");
       changeToken(searchTest);

     }

    
     }

    fetchdata();
    }, [searchTest, searchChanged]);


    //second useEffect to check if account is connected
    useEffect(() => {
      if(window.ethereum){
        if(provider){
          updateAccount();
        }
      }
    });
    

   //third useEffect to check if account is connected
  useEffect(() => {
      if(window.ethereum){
        if(provider){
          checkIfWalletIsConnect();
        }
      }
  }, [executed, theAddress]);




    history.listen((location) => {
      setsearchTest(location.state.address);
    });



    /*
    const detectMetamask = () => {
      if(!window.ethereum){
        connectmetamask();
        return false;
      } else {
        return true;
      }
    }
*/


    const checkIfWalletIsConnect = async () => {

      if(window.ethereum){

              //console.log(provider);
              const chainId = await provider.getNetwork();
              //console.log(chainId.chainId);
             //console.log(chainID)
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

                  updateAccount();
                  
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
                updateAccount();
        
              } else if( chainId.chainId === chainID) {
                //console.log("running");
                updateAccount();
                
              }
        


      }

    }


    const updateAccount = async () => {
      if(executed === false ){
          //run for extension
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
          //console.log("I Ran");
          setExecuted(true);
          login();


      

     } else if(executed === true ) {


          //for extension
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

          
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
          setTheAddress(accounts[0]);
          changeLoginStat(true);

      
     }

     }


     //update mobile
     /*
     const updatemobileAccount = async () => {
      if(executed === false ){
          let account = theAddress;
          if (!account) {
              console.log(mobileprovider);
              const signer = mobileprovider.getSigner()
              account =  await signer.getAddress();
          }
          
          if (tokenContract) {
              setAccountToken(String(await getTokenContract(tokenContract).balanceOf(account)));
              checkAllowance(account, tokenContract);
          }
          setAccountBNB(String(await mobileprovider.getBalance(account)));
          //console.log("I Ran");
          setExecuted(true);
          login();

     } else if(executed === true ) {

          let account = theAddress;
          if (!account) {
            const signer = mobileprovider.getSigner();
            account =  await signer.getAddress();
          }
          
          if (tokenContract) {
              setAccountToken(String(await getTokenContract(tokenContract).balanceOf(account)));
              checkAllowance(account, tokenContract);
          }
          setAccountBNB(String(await mobileprovider.getBalance(account)));

          
          const signer = mobileprovider.getSigner();
          const accounts =  await signer.getAddress();
        
          setTheAddress(accounts);
          changeLoginStat(true);
      
     }

     }
     */

     
    
    


            

      
    //Login code
    const login = async () => {
      const chainId = await provider.getNetwork();
  
      if (chainId.chainId === chainID){
        await ethereum.request({ method: "eth_requestAccounts" });

           if(executed === true) {
             
               //console.log("executed two");
              //const chainId = await provider.getNetwork();
                    //handle chain issues
              const accounts = await ethereum.request({ method: "eth_requestAccounts", });
              //console.log(accounts);
              //console.log("I ran here ooooo");
             

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


        } else {
          checkIfWalletIsConnect();
        }

        }




     const mobileLogin = async () => {

      console.log(mobileprovider);
    
      const chainId = await mobileprovider.getSigner().getChainId();
      console.log(chainId);
  
      if (chainId.chainId === chainID){

           if(executed === true) {
             
             
               //console.log("executed two");
              //const chainId = await provider.getChainId();

              const signer = mobileprovider.getSigner();
              const account = await signer.getAddress() 
             

              setTheAddress(account);
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



        } else {
          Store.addNotification({
            title: "Wrong Chain Switch",
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
        }

        changeLoginStat(false);

     }


  





  //chart side

 //get particular date
 /*
 const dates = new Array(8).fill().map((e, i) => {
  return moment().subtract(i, "d").format("YYYY-MM-DD");
}).reverse();
*/


 



//format date
/*
const formatdate = (incoming) => {
  var date = new Date(incoming); // Date 2011-05-09T06:08:45.178Z
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var formatted = `${year}-${month}-${day}`;
  console.log(formatted);
      
  return  formatted; // 2011-05-09
}
*/








  //for pricefunction
  const fetchDataChartsPrice = async () => {
    
    let addressToLookUp;
    const today = moment().format("YYYY-MM-DD");
    //console.log(today);

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



      
      const response = await fetch(`https://api.coinbrain.com/cointoaster/coins/history-new/usd/?since=${today}T06%3A56%3A34.000Z&minuteInterval=5&baseToken=${addressToLookUp}&liquidityPoolAddress=0x815bff37827499d800B0Da4000A318c6488aD4cA`);
      const data = await response.json();
      //console.log(data);
      
       let chartarr = [];
       let index ;
       data.map((each) => {


         if(each.date !== index ){
 
           //console.log(index);
           
           const d = moment(each.date).utc().valueOf();



           chartarr.push({
             time: d,
             open: each.openPrice, 
             high: each.maximumPrice, 
             low: each.minimumPrice, 
             close: each.closePrice,
             });

             index = each.date;
         }

       });
       
       //console.log(chartarr);
       setinitialData(chartarr);

  };

  







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
           
          {isListed ? 

              <Leftcontainer 
              buyFee={buyFee}
              sellFee={sellFee}
              tokenName={tokenName}
              tokenOut={tokenOut}
              accountBNB={accountBNB}
              chain={chainID} 
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
              setLoading={setLoading}
              contractAddress={contractAddress}
              /> 

              :

               <SearchedToken />
         }
         
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

            <Connectwallet 
            login={ login }  
            loginCheck={checkLoginStat} 
            changeloginValue={changeLoginStat}
            addr={theAddress}
            WidthChange={WidthChange}
            mobileLogin={mobileLogin}
            />

          :

          <div></div>

          }


          <Rightcontainer   initialData={initialData} />

            {!WidthChange ? 

            
              <Connectwallet 
              login={ login}
              mobileLogin={mobileLogin}  
              loginCheck={checkLoginStat} 
              changeloginValue={changeLoginStat}
              WidthChange={WidthChange}
              />

            :
            <div></div>


            
            }

        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
