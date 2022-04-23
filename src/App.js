import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mainpage from "./components/Mainpage.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./img/RaspberrySwap_logo.png";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import SearchedToken from "./components/searchedtoken/SearchedToken.js";
import { useParams } from 'react-router-dom';






const useStyles = makeStyles( theme => {
  return{
    containbody: {
      paddingTop : "50px",
      paddingBottom: "50px",
      paddingLeft: "48px",
      paddingRight: "48px",
      [theme.breakpoints.down('xs')]:{
        paddingTop: '50px',
        paddingLeft: '9px',
        paddingRight: '9px',
        paddingBottom: '50px'
    }

    },
    }
  });


  const imgresponsive = {
    width: "20%",
    height: "auto"

  };







function App() {
  const classes = useStyles();


  return (
   <Router>
     <Switch>
       <Route>
       <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
         <img src={logo} style={imgresponsive} alt="logo-img" />
       </div>
       <ReactNotifications />
       <Container  className={classes.containbody} >
          <Mainpage exact path="/" />
        </Container>
       </Route>
       <Route exact path="/:token" component={Mainpage}/>
     </Switch>
   </Router>
  );
}

export default App;
