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
import  axios  from 'axios';
import { contractABI, tokenABI, contractAddress, chainID, pancakeRouter, pancakeABIuse, pancakeFactoryContract, pancakeFactoryuse } from "../utils/constants";











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
    const [initialData, setinitialData] = useState("");
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
    let [loading, setLoading] = useState(false);
    const [pairAddress, setPairAddress] = useState("");
    const [providerReady, setproviderReady] = useState(false);
    const [togglestate, setTogglestate] = useState(false);
    const [searchTest, setsearchTest] = useState();
    const [correctChain, setCorrectChain] = useState(false);
    const [accountChanged, setAccountChanged] = useState(false);
    const [getInstance, setgetInstance] = useState();
    const [checkingcorrectchain, setcheckingcorrectchain] = useState(false);

    
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
                  56: "https://bsc-dataseed1.binance.org/",
                }, // required

                network: 'binance',
                chainId: 56,

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
          setgetInstance(instance);
          const gettingprovider = await new ethers.providers.Web3Provider( instance )
          setProvider( gettingprovider );
    }


   
    const getextensionProvider = async () => {
        const exprovider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(exprovider);
        //console.log("using this one");
    }
    




    
    //useeffect
    useEffect(() => {

      // set provider
        if(!window.ethereum){
          //console.log("outside ran")
          if(!provider){
             connectmetamask();
          }
        } else {
          if(!provider){
            getextensionProvider();
          } 
        }
       
        if(providerReady){
          getPairContract();
        }

  
  
      //Get provider ready
        if(provider) {
          //console.log("ready");
          setproviderReady(true);
          getCorrectChain();
          console.log(correctChain);
        }
  
      
  
  
  
      // for searching listed tokens
      const fetchdata = async () => {
       
       if(  token &&  !searchTest ){

        console.log(correctChain);
         console.log(token);
         setTimeout(() => {
          console.log(correctChain);    
            if(providerReady){


                if(correctChain){
                  changeToken(token);
                  fetchDataChartsPrice();
                } else if(!correctChain) {
                  setWrongChainnotification();
                }


            } else {
              if(!theAddress){
                Loginfirst();
              }
            }

        }, 4000);

  
       } else if ( token  &&  searchTest ){
         if(providerReady) {
          if(correctChain){
            changeToken(searchTest);
            fetchDataChartsPrice();
          } else {
            setWrongChainnotification();
          }
         }
       }
  
      
       }
  
      fetchdata();
  
  
      }, [searchTest, searchChanged, theAddress, providerReady, togglestate, checkLoginStat, accountChanged]);
  
  
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
  
  
  
  



    const getCorrectChain = async () => {
      //const chainId = await provider.getNetwork();

      //const chainId = await provider.getSigner().getChainId();
      console.log(typeof(chainID));
      if(chainID === 56){
        await setCorrectChain(true);
      } else {
       await setCorrectChain(false);
      }

    }



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



      const Loginfirst = () => {
 
        Store.addNotification({
          title: "Wallet Not Connected",
          message: "Connect Wallet",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 6000,
            onScreen: true
          },
          width: 400
        });

        return ;
  }


      
      const setWrongChainnotification = () => {
 
            Store.addNotification({
              title: "Wrong Chain",
              message: "Switch to BSC mainnet",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              },
              width: 400
            });

            return ;
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
            //console.log(data);
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

  



    history.listen((location) => {
      setsearchTest(location.state.address);
    });




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
                        chainId: `0x${Number(56).toString(16)}`,
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
                  onScreen: true,
                  showIcon: true
                },
                width: 400
    
              });
         
           } 


        } else {
          checkIfWalletIsConnect();
        }

        }




     const mobileLogin = async () => {


      const chainId = await provider.getSigner().getChainId();

  
      if (chainId === chainID){

             
               //console.log("executed two");
              //const chainId = await provider.getChainId();

              const signer = provider.getSigner();
              const account = await signer.getAddress();
              console.log(account);
             

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
 
          changeLoginStat(false);
        }



     }


  






  const getPairContract = async () => {

     let addressToLookUp;

    if( token &&  !searchTest ){
      //console.log(token);
      addressToLookUp = token;
    } else if(token  &&  searchTest){
      //console.log(searchTest);
      addressToLookUp = searchTest;
    } else {
      addressToLookUp = "0x97c6825e6911578A515B11e25B552Ecd5fE58dbA";
    }

    const signer = provider.getSigner();
    const pairContract = new ethers.Contract(pancakeFactoryContract, pancakeFactoryuse, signer);
    const value = await pairContract.getPair("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", addressToLookUp);
    //console.log(value);
    setPairAddress(value)
  }




  //for pricefunction
  const fetchDataChartsPrice = async () => {
    let addressToLookUp;

    if( token &&  !searchTest ){
      addressToLookUp = token;
      setsearchChanged(token);      
    } else if(token  &&  searchTest){
      addressToLookUp = searchTest;
      setsearchChanged(searchTest);
    } else {
      addressToLookUp = "0x97c6825e6911578A515B11e25B552Ecd5fE58dbA";
    }



          if(pairAddress) {
               //console.log("Finally called");
               setinitialData(pairAddress);
               setPairAddress("");
         } else {
           //console.log("toggling");
          setTogglestate(!togglestate);
         }

  };



  //on account changed
  if(window.ethereum){

  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    setAccountChanged(!accountChanged);
  });

}


  if(!window.ethereum && provider){

    // Subscribe to accounts change
    getInstance.on("accountsChanged", async (accounts) => {
        //setAccountChanged(!accountChanged);
        //mobileLogin()
        setTheAddress(accounts[0]);
        changeLoginStat(true);
      });

  }

  






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

          <Rightcontainer providerReady={providerReady} searchTest={searchTest}  searchChanged={searchChanged}  initialData={initialData}  />

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
