import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mainpage from "./components/Mainpage.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./img/RaspberrySwap_logo.png"





const useStyles = makeStyles({
    containbody: {
      paddingTop : "50px",
      paddingBottom: "50px",
      paddingLeft: "48px",
      paddingRight: "48px"
    },

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
         <img src={logo} style={imgresponsive} />
       </div>
       <Container  className={classes.containbody} >
          <Mainpage exact path="/" />
        </Container>
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
