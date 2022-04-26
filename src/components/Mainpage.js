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
import { contractABI, tokenABI, contractAddress, chainID } from "../utils/constants";
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(window.ethereum);










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
    const addrssChange = useMediaQuery('(max-width:650px)');
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

    
    const Web3Api = useMoralisWeb3Api();
    const history = useHistory();

    const match = useRouteMatch('/:token');
    const { token } = {
      token: match?.params.token,
    };

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
        if (!ethers.utils.isAddress(address)) {
            setListed(false);
            setTokenName("");
            setTokenDecimals("");
            setBuyFee("0");
            setSellFee("0");
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
        }
        else {
            setTokenName(await Token.name());
            setBuyFee("0");
            setSellFee("0");
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
    //console.log("useeffect called");
    //for chart
    if(blockArray.length === 0){
      //console.log("fetch array called");
      fetchDataCharts();
      //console.log(blockArray);
    };

    if(blockArray.length !== 0) {
      //console.log("price called");
      fetchDataChartsPrice();
      //console.log(priceArray);
    } 
      
      //console.log(priceArray);
      if(priceArray.length !== 0) {
        let iniValue = [];
        //console.log("running inside code")
      dates.map((data, a) => {
       priceArray.map((e, i) => {
         
         if(a === i){
          //console.log(data, e);
          iniValue.push({time: data, value: e});
        }  
       });
     });  
    
     //console.log(iniValue)
     setinitialData(iniValue);
     //console.log(initialData);

     }
    



    // for buying and selling
    const fetchdata = async () => {
     
     if(  token &&  !searchTest ){
      //console.log("direct call called");
      changeToken(token);

     } else if ( token  &&  searchTest ){
      // const transaction = await Moralis.executeFunction(searchToken);
       //settokenData(transaction);
       //console.log("in-direct call called");
       changeToken(searchTest);

     }

    
     }

    fetchdata();
    }, [searchToken,  blockArray, priceArray, searchTest]);


    //second useEffect to check if account is connected
    useEffect(() => {
      updateAccount();
    });
 

   //third useEffect to check if account is connected
  useEffect(() => {
    checkIfWalletIsConnect();
  })




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
      setsearchTest(location.state.address);
      //changeToken(tokenSlashRemoved);
    });


    



    const checkIfWalletIsConnect = async () => {
      if (!ethereum) return alert("Please install MetaMask.");
      const chainId = await provider.getNetwork();
      if (chainId.chainId != chainID) return alert("WrongChain");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setTheAddress(accounts[0]);
      changeLoginStat(true);
      //setCurrentAccount(accounts[0]);

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

          try {
            if (!ethereum) return alert("Please install MetaMask.");
            const chainId = await provider.getNetwork();
            if (chainId.chainId != chainID) return alert("WrongChain");
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
                duration: 2000,
                onScreen: true
              },
              width: 600
  
            });


            } catch (error) {
                //console.log(error);
                throw new Error("No ethereum object");
            }

          

        }


  
  


  //logout code
  /*
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }
  */

  //console.log(user);







  //chart side

  //console.log(moment().toDate());
  //console.log(moment());

 //get particular date
 const dates = new Array(7).fill().map((e, i) => {
  return moment().subtract(i, "d").format("YYYY-MM-DD");
}).reverse();



//console.log(dates);



   //get  date to block
  const fetchDataCharts = async () => {
     
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
        setblockArray(putArray)        
  };
  //console.log(blockArray);




  //for pricefunction
  const fetchDataChartsPrice = async () => {
     
    let addressToLookUp;

    if( token &&  !searchTest ){
      addressToLookUp = token;
    } else if(token  &&  searchTest){
      addressToLookUp = searchTest;
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

         //pricearr =  prices;
         //console.log(prices);
         prices = prices.map(e => e.usdPrice);
         setpriceArray(prices);

     

        //console.log(pricearr);
        //pricearr.push(prices);
        

      };

      //console.log(pricearr);
        
          
  };

  //console.log(priceArray);

  
  







  return (
   <ThemeProvider theme={theme}>
   
        <Grid container spacing={2} className={classes.contain} >

        <Grid item  xs={12} md={4} lg={4} >
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
            /> 
        </Grid>

        <Grid item  xs={12} md={8} lg={8}  className={classes.rightcontainer}>

          <Address  
          addr={theAddress} 
          loginCheck={checkLoginStat}
          />

          <Rightcontainer   initialData={initialData} />

          <Connectwallet login={login}  
          loginCheck={checkLoginStat} 
          changeloginValue={changeLoginStat} 
          />

        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
