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
import ABI from '../ABI.json';
import { useHistory } from 'react-router-dom';
import { useMoralisWeb3Api } from "react-moralis";
import moment from 'moment';









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
    const {  isAuthenticated, logout } = useMoralis();
    let [theAddress, setTheAddress] = useState();
    const [checkLoginStat, changeLoginStat] = useState(false);
    const [dataresult, changedataresult] = useState({});
    const [searchToken, setsearchToken] = useState({});
    const [tokenData, settokenData] = useState([]);
    const [blockArray, setblockArray] = useState([]);
    const [priceArray, setpriceArray] = useState([]);
    const [initialData, setinitialData] = useState([]);
    const Web3Api = useMoralisWeb3Api();
    const history = useHistory();



    
    const match = useRouteMatch('/:token');
    const { token } = {
      token: match?.params.token,
    };

   const [searchTest, setsearchTest] = useState();
   Moralis.start({ serverUrl : process.env.REACT_APP_serverUrl, appId : process.env.REACT_APP_appId });

  



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
      console.log("price called");
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
            
      const web3 = await Moralis.enableWeb3();
       //const web3 = Moralis.web3
      

  
     //console.log(searchTest);

     
     
     if(  token &&  !searchTest ){

      const options = {
        contractAddress: "0x7b88c05BD672e0291f3674F4a0AACe2fe0dd2ed9",
        functionName: "AvailableTokens",
        abi: ABI,
        params: {"tokenAddress" : token},
        };


        // for token info
      //console.log("direct url");
      const transaction = await Moralis.executeFunction(options);
      settokenData(transaction);
      //console.log(transaction);

     } else if ( token  &&  searchTest ){

       // for token info
       //console.log("From Search");
      // console.log(searchToken);
       const transaction = await Moralis.executeFunction(searchToken);
       settokenData(transaction);
       //console.log(transaction);

     }

     
    

      if(Object.keys(dataresult).length === 0) {
        console.log("first render for dataresult buy and sell")
      } else {
        //console.log(dataresult);
      const transaction = await Moralis.executeFunction(dataresult);

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
          message: transaction.hash,
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
        


      }  
     }

    fetchdata();
    



    }, [dataresult, searchToken,  blockArray, priceArray]);




    history.listen((location) => {

      //console.log('Route changed', { location });
      // Apply route change logic, i.e. dispatch to store
      //console.log(location.state.address);

      const tokenSlashRemoved = window.location.pathname.replace(/\//g,'');
      //console.log(tokenSlashRemoved);

      const search =  (tokenaddr) => {
      const options = {
          contractAddress: "0x7b88c05BD672e0291f3674F4a0AACe2fe0dd2ed9",
          functionName: "AvailableTokens",
          abi: ABI,
          params: {"tokenAddress" : tokenaddr},
          };


       setsearchTest(location.state.address);
       setsearchToken(options);

       //console.log(tokenaddr);
       //console.log("Search called");
      }

      search(tokenSlashRemoved);

    });


    
    
    


            

      
    //Login code
    const login = async () => {

 

      if (!isAuthenticated) {

        if(addrssChange){
            const user = await Moralis.authenticate({ 
              provider: "walletconnect", 
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ] 
          })

          setTheAddress(user.get("ethAddress"));
          
          
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

        } else {

        await Moralis.authenticate({signingMessage: "Log in to raspberry" })
          .then(function (user) {
            console.log("logged in user:", user);
            //console.log(user.get("ethAddress"));
            setTheAddress(user.get("ethAddress"));
            //console.log(theAddress);
          }).catch(function (error) {
            console.log(error);
          });

          changeLoginStat(true);

          
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
          

          

        }
          
      }



    }


  
  


  //logout code
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

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
          {token 
          ? ( <SearchedToken tokenData={tokenData} /> ) 
          : ( 

          <Leftcontainer 
            changedataresult={changedataresult}  
            chain={chainId} 
            loginCheck={checkLoginStat}
            addr={theAddress}
            /> 

            )
          }    
        </Grid>

        <Grid item  xs={12} md={8} lg={8}  className={classes.rightcontainer}>

          <Address  
          addr={theAddress} 
          loginCheck={checkLoginStat}
          setsearchToken={setsearchToken}
          />

          <Rightcontainer   initialData={initialData} />

          <Connectwallet login={login}  
          logout={logOut} 
          loginCheck={checkLoginStat} 
          changeloginValue={changeLoginStat} 
          />

        </Grid>
            
        </Grid>

    </ThemeProvider>
  )
}
